import { useEffect, useMemo, useRef, useState } from 'react'
import { QUESTIONS_BY_SUBJECT, SUBJECTS } from './data/questions'

const IS_DEV = import.meta.env.DEV
const ROUND_SIZE = 10
const THEMES = ['glass', 'kawaii', 'anime']
const REVIEW_LIST_THEME_CONFIG = {
  glass: { cardMinHeight: 156, gap: 14, maxVisibleCards: 3 },
  kawaii: { cardMinHeight: 164, gap: 14, maxVisibleCards: 3 },
  anime: { cardMinHeight: 172, gap: 14, maxVisibleCards: 2 },
}
const ANIME_RESULT_LEFT_IMAGE = '/anime-result-left.png'
const ANIME_RESULT_RIGHT_IMAGE = '/anime-result-right.png'
const BACKGROUND_MUSIC_SRC = '/quiz-bgm.flac'
const SHAME_LIST_STORAGE_KEY = 'dxwm-shame-list'
const ANSWERED_QUESTION_STORAGE_KEY = 'dxwm-answered-questions'
const DIFFICULTIES = [
  { key: 'primary', label: '小学', matchText: '小学' },
  { key: 'middle', label: '初中', matchText: '初中' },
  { key: 'high', label: '高中', matchText: '高中' },
  { key: 'college', label: '大学', matchText: '大学' },
]

const THEME_COPY = {
  glass: {
    switchLabel: '玻璃拟态',
    homeTitle: '大学文凭能有多文盲',
    homeSubtitle: '别划走，试试这些“基础题”...',
    homeFootnote: '',
    resultAction: '再洗白一次',
  },
  kawaii: {
    switchLabel: 'Kawaii',
    homeTitle: '文盲大挑战!',
    homeSubtitle: '~ (っ °Д °;)っ 你还能毕业吗 ~',
    homeFootnote: '由 超可爱研究所 荣誉出品',
    resultAction: '重新挑战 (・ω・)',
  },
  anime: {
    switchLabel: '二次元',
    homeTitle: '文盲程度检测.exe',
    homeSubtitle: '赌上大学生的尊严！',
    homeFootnote: 'ACG 学园特别版',
    resultAction: '再来一次',
  },
}

const SUBJECT_THEME_META = {
  glass: {
    chinese: { icon: '🏮', accent: '#6366f1', short: '语文' },
    math: { icon: '📐', accent: '#f59e0b', short: '数学' },
    english: { icon: '🌍', accent: '#10b981', short: '英语' },
    physics: { icon: '⚙️', accent: '#ec4899', short: '物理' },
    chemistry: { icon: '🧪', accent: '#8b5cf6', short: '化学' },
  },
  kawaii: {
    chinese: { icon: '📖', accent: '#ffb7c5', short: '国语文字' },
    math: { icon: '📐', accent: '#a0e7ff', short: '奇妙算术' },
    english: { icon: '🔤', accent: '#bbf7d0', short: 'ABC挑战' },
    physics: { icon: '🪐', accent: '#ffe599', short: '物理魔法' },
    chemistry: { icon: '🧪', accent: '#e2c0ff', short: '神奇化学' },
  },
  anime: {
    chinese: { icon: '🖋️', accent: '#7dd3fc', short: '国文' },
    math: { icon: '🔢', accent: '#fbbf24', short: '数理' },
    english: { icon: '🗣️', accent: '#4ade80', short: '外语' },
    physics: { icon: '⚡', accent: '#f472b6', short: '物理' },
    chemistry: { icon: '🧪', accent: '#a78bfa', short: '科学' },
  },
}

function shuffle(items) {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex], result[index]]
  }

  return result
}

function matchesDifficulty(question, difficultyKey) {
  const target = DIFFICULTIES.find((item) => item.key === difficultyKey)

  if (!target) return true

  return String(question.level || '').includes(target.matchText)
}

function getDifficultyCountSummary(items) {
  return DIFFICULTIES.map((difficulty) => {
    const count = items.filter((item) => matchesDifficulty(item, difficulty.key)).length
    return `${difficulty.label}${count}`
  }).join(' / ')
}

function inferQuestionType(question) {
  if (question.type) return question.type

  const prompt = String(question.prompt || '')
  const subject = String(question.subject || '')

  if (prompt.includes('下一句') || prompt.includes('上一句') || prompt.includes('出自哪首诗')) {
    return 'poem'
  }

  if (prompt.includes('作者是') || prompt.includes('哪个朝代') || prompt.includes('哪部') || prompt.includes('与谁有关')) {
    return 'literature'
  }

  if (prompt.includes('意思') || prompt.includes('成语') || prompt.includes('词语') || prompt.includes('修辞')) {
    return 'language'
  }

  if (prompt.includes('等于多少') || prompt.includes('等于？') || prompt.includes('面积') || prompt.includes('周长')) {
    return 'calculation'
  }

  if (prompt.includes('公式') || prompt.includes('单位') || prompt.includes('化学式') || prompt.includes('符号')) {
    return 'formula'
  }

  if (prompt.includes('反义词') || prompt.includes('中文意思') || prompt.includes('英文') || prompt.includes('应填')) {
    return 'vocabulary'
  }

  if (prompt.includes('现象') || prompt.includes('变化') || prompt.includes('作用') || prompt.includes('因为')) {
    return 'phenomenon'
  }

  if (subject.includes('数学')) return 'math-concept'
  if (subject.includes('英语')) return 'english-basic'
  if (subject.includes('物理') || subject.includes('化学')) return 'science-basic'
  if (subject.includes('语文')) return 'chinese-basic'

  return 'general'
}

function pickDiversifiedRound(items) {
  const grouped = items.reduce((result, item) => {
    const type = inferQuestionType(item)

    if (!result[type]) {
      result[type] = []
    }

    result[type].push(item)
    return result
  }, {})
  const orderedTypes = shuffle(Object.keys(grouped))
  const round = []

  while (round.length < ROUND_SIZE && orderedTypes.some((type) => grouped[type].length > 0)) {
    orderedTypes.forEach((type) => {
      if (round.length >= ROUND_SIZE || grouped[type].length === 0) return

      round.push(grouped[type].shift())
    })
  }

  return round
}

function getAvailableQuestions(subjectKey, difficultyKey, answeredQuestionIds, isDev) {
  return QUESTIONS_BY_SUBJECT[subjectKey].filter((item) => {
    if (!matchesDifficulty(item, difficultyKey)) return false
    if (isDev) return true

    return !answeredQuestionIds.includes(item.id)
  })
}

function buildRound(subjectKey, difficultyKey, answeredQuestionIds, isDev) {
  const availableQuestions = shuffle(getAvailableQuestions(subjectKey, difficultyKey, answeredQuestionIds, isDev))

  return pickDiversifiedRound(availableQuestions)
}

function loadShameList() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(SHAME_LIST_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveShameList(items) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(SHAME_LIST_STORAGE_KEY, JSON.stringify(items))
}

function loadAnsweredQuestionIds() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(ANSWERED_QUESTION_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAnsweredQuestionIds(items) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(ANSWERED_QUESTION_STORAGE_KEY, JSON.stringify(items))
}

function getJudgement(score, total, theme) {
  const ratio = score / total

  if (theme === 'anime') {
    if (ratio === 1) return '斯国一！'
    if (ratio >= 0.6) return '及格哒哟！'
    return '雅蠛蝶！'
  }

  if (theme === 'kawaii') {
    if (ratio === 1) return '完美天才！'
    if (ratio >= 0.6) return '勉强及格 ~'
    return '真·小文盲'
  }

  if (ratio === 1) return '文凭保住了'
  if (ratio >= 0.6) return '勉强算识字'
  return '纯纯真文盲'
}

function getResultCopy(score, total, theme) {
  const ratio = score / total

  if (theme === 'anime') {
    if (ratio === 1) return '你居然真的拥有大学生的智慧？不可思议！'
    if (ratio >= 0.6) return '虽然有点摇晃，但还是勉强守住了尊严。'
    return '这种水平...你的毕业证是火车站买的吗？'
  }

  if (theme === 'kawaii') {
    if (ratio === 1) return '呜哇！你一定是吃聪明豆长大的吧！(★ ω ★)'
    if (ratio >= 0.6) return `答对 ${score} 题，虽然笨笨的，但还是通过了呢。`
    return `只答对 ${score} 题，没关系，可爱暂时替你顶一下。`
  }

  if (ratio === 1) return '满分！你确实读过书。'
  if (ratio >= 0.6) return `答对 ${score} 道题。大学没白读，但不多。`
  return `只对了 ${score} 道题。建议回小学深造。`
}

function getResultEmoji(score, total, theme) {
  const ratio = score / total

  if (theme === 'anime') {
    if (ratio === 1) return '👑'
    if (ratio >= 0.6) return '✨'
    return '😱'
  }

  if (theme === 'kawaii') {
    if (ratio === 1) return '✨'
    if (ratio >= 0.6) return '🍮'
    return '🍼'
  }

  if (ratio === 1) return '🎓'
  if (ratio >= 0.6) return '🤔'
  return '🤡'
}

function getAnimeResultScene(score, total) {
  const ratio = score / total

  if (ratio === 1) {
    return {
      badge: '满分通关',
      bubbles: ['这次是真的学霸！', '全都会诶？', '居然一题没丢！', '再来一次也不怕吧！'],
    }
  }

  if (ratio >= 0.6) {
    return {
      badge: '勉强过线',
      bubbles: ['还算撑住了！', '差一点就翻车…', '至少不像完全不会', '要不要再刷一次？'],
    }
  }

  return {
    badge: '急需补课',
    bubbles: ['这都能错这么多？', '分数有点危险了…', '只有这点分…', '再试一次吧！'],
  }
}

function getReviewListStyle(theme, count) {
  const config = REVIEW_LIST_THEME_CONFIG[theme] || REVIEW_LIST_THEME_CONFIG.glass
  const visibleCount = Math.min(Math.max(count, 1), config.maxVisibleCards)
  const maxHeight = visibleCount * config.cardMinHeight + Math.max(visibleCount - 1, 0) * config.gap

  return {
    '--review-card-min-height': `${config.cardMinHeight}px`,
    '--review-list-gap': `${config.gap}px`,
    '--review-list-max-height': `${maxHeight}px`,
  }
}

function ThemeBackdrop({ theme }) {
  if (theme === 'anime') {
    return (
      <div className="theme-backdrop anime-backdrop" aria-hidden="true">
        <span className="decor-star star-a">✦</span>
        <span className="decor-star star-b">✧</span>
        <span className="decor-star star-c">✦</span>
        <div className="char-box">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#fbcfe8" stroke="#1e293b" strokeWidth="3" />
            <circle cx="35" cy="40" r="5" fill="#1e293b" />
            <circle cx="65" cy="40" r="5" fill="#1e293b" />
            <path d="M 30 70 Q 50 85 70 70" stroke="#1e293b" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </div>
    )
  }

  if (theme === 'kawaii') {
    return (
      <div className="theme-backdrop kawaii-backdrop" aria-hidden="true">
        <span className="floating-item item-a">☁️</span>
        <span className="floating-item item-b">⭐️</span>
        <span className="floating-item item-c">💖</span>
        <span className="floating-item item-d">🍬</span>
      </div>
    )
  }

  return (
    <div className="theme-backdrop glass-backdrop" aria-hidden="true">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('home')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [shameList, setShameList] = useState(() => loadShameList())
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(() => loadAnsweredQuestionIds())
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dxwm-theme') || 'glass'
    }

    return 'glass'
  })
  const audioRef = useRef(null)

  const copy = THEME_COPY[theme]
  const currentQuestion = questions[currentIndex]
  const currentSubject = SUBJECTS.find((item) => item.key === selectedSubject)
  const currentDifficulty = DIFFICULTIES.find((item) => item.key === selectedDifficulty)
  const currentSubjectThemeMeta = selectedSubject ? SUBJECT_THEME_META[theme][selectedSubject] : null
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0
  const availableQuestionCountBySubject = useMemo(
    () =>
      SUBJECTS.reduce((result, subject) => {
        result[subject.key] = getAvailableQuestions(subject.key, null, answeredQuestionIds, IS_DEV).length
        return result
      }, {}),
    [answeredQuestionIds],
  )
  const availableQuestionCountByDifficulty = useMemo(() => {
    if (!selectedSubject) return {}

    return DIFFICULTIES.reduce((result, difficulty) => {
      result[difficulty.key] = getAvailableQuestions(selectedSubject, difficulty.key, answeredQuestionIds, IS_DEV).length
      return result
    }, {})
  }, [answeredQuestionIds, selectedSubject])
  const totalQuestionCountBySubject = useMemo(
    () =>
      SUBJECTS.reduce((result, subject) => {
        result[subject.key] = QUESTIONS_BY_SUBJECT[subject.key]?.length ?? 0
        return result
      }, {}),
    [],
  )
  const difficultySummaryBySubject = useMemo(
    () =>
      SUBJECTS.reduce((result, subject) => {
        result[subject.key] = getDifficultyCountSummary(QUESTIONS_BY_SUBJECT[subject.key] || [])
        return result
      }, {}),
    [],
  )
  const selectedSubjectQuestionTotal = selectedSubject ? totalQuestionCountBySubject[selectedSubject] ?? 0 : 0
  const selectedSubjectDifficultySummary = selectedSubject ? difficultySummaryBySubject[selectedSubject] ?? '' : ''
  const globalQuestionCount = useMemo(
    () => Object.values(totalQuestionCountBySubject).reduce((sum, count) => sum + count, 0),
    [totalQuestionCountBySubject],
  )

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('dxwm-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!locked) return

    const timer = window.setTimeout(() => {
      if (currentIndex >= questions.length - 1) {
        setPhase('result')
        return
      }

      setCurrentIndex((index) => index + 1)
      setSelectedOption(null)
      setLocked(false)
    }, 100)

    return () => window.clearTimeout(timer)
  }, [currentIndex, locked, questions.length])

  const summary = useMemo(() => {
    if (phase !== 'result' || !questions.length) return null

    return {
      total: questions.length,
      accuracy: Math.round((score / questions.length) * 100),
      judgement: getJudgement(score, questions.length, theme),
      description: getResultCopy(score, questions.length, theme),
      emoji: getResultEmoji(score, questions.length, theme),
    }
  }, [phase, questions.length, score, theme])
  const currentSubjectShameList = useMemo(() => {
    if (!selectedSubject) return []

    return shameList.filter(
      (item) => item.subjectKey === selectedSubject || item.subject === currentSubject?.name,
    )
  }, [currentSubject?.name, selectedSubject, shameList])
  const currentDifficultyRemainingCount = selectedDifficulty
    ? availableQuestionCountByDifficulty[selectedDifficulty] ?? 0
    : 0
  const shameListCount = currentSubjectShameList.length
  const homeStats = useMemo(() => {
    const wrongCount = shameList.length
    const totalAnswered = answeredQuestionIds.length
    const correctCount = Math.max(totalAnswered - wrongCount, 0)
    const accuracy = totalAnswered ? Math.round((correctCount / totalAnswered) * 100) : 0

    return {
      correctCount,
      wrongCount,
      accuracy,
    }
  }, [answeredQuestionIds.length, shameList.length])
  const animeScene = phase === 'result' && summary ? getAnimeResultScene(score, summary.total) : null
  const reviewListStyle = useMemo(() => getReviewListStyle(theme, shameListCount), [theme, shameListCount])

  const stopBackgroundMusic = async () => {
    if (!audioRef.current) return

    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  const startBackgroundMusic = async () => {
    if (typeof window === 'undefined') return

    if (!audioRef.current) {
      audioRef.current = new Audio(BACKGROUND_MUSIC_SRC)
      audioRef.current.loop = true
      audioRef.current.volume = 0.35
    }

    audioRef.current.currentTime = 0
    await audioRef.current.play()
  }

  useEffect(() => {
    if (!musicEnabled) {
      stopBackgroundMusic()
      return undefined
    }

    let cancelled = false
    let detachRetryListener = null

    const tryPlay = async () => {
      try {
        await startBackgroundMusic()
      } catch {
        if (cancelled || typeof window === 'undefined') return

        const retry = async () => {
          window.removeEventListener('pointerdown', retry)
          window.removeEventListener('keydown', retry)

          try {
            await startBackgroundMusic()
          } catch {
            setMusicEnabled(false)
          }
        }

        detachRetryListener = () => {
          window.removeEventListener('pointerdown', retry)
          window.removeEventListener('keydown', retry)
        }

        window.addEventListener('pointerdown', retry, { once: true })
        window.addEventListener('keydown', retry, { once: true })
      }
    }

    tryPlay()

    return () => {
      cancelled = true
      detachRetryListener?.()
    }
  }, [musicEnabled])

  useEffect(() => () => {
    stopBackgroundMusic()
  }, [])

  const chooseSubject = (subjectKey) => {
    setSelectedSubject(subjectKey)
    setSelectedDifficulty(null)
    setPhase('difficulty')
  }

  const startRound = (subjectKey, difficultyKey) => {
    const roundQuestions = buildRound(subjectKey, difficultyKey, answeredQuestionIds, IS_DEV)

    if (!roundQuestions.length) {
      return
    }

    setSelectedSubject(subjectKey)
    setSelectedDifficulty(difficultyKey)
    setQuestions(roundQuestions)
    setCurrentIndex(0)
    setSelectedOption(null)
    setLocked(false)
    setScore(0)
    setPhase('playing')
  }

  const handleSelect = (option) => {
    if (locked || !currentQuestion) return

    const isCorrect = option === currentQuestion.answer

    setSelectedOption(option)
    setLocked(true)
    setAnsweredQuestionIds((current) => {
      if (current.includes(currentQuestion.id)) {
        return current
      }

      const next = [...current, currentQuestion.id]
      saveAnsweredQuestionIds(next)
      return next
    })

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1)
    } else {
      setShameList((current) => {
        if (current.some((item) => item.id === currentQuestion.id)) {
          return current
        }

        const next = [
          ...current,
          {
            id: currentQuestion.id,
            prompt: currentQuestion.prompt,
            selected: option,
            answer: currentQuestion.answer,
            explanation: currentQuestion.explanation,
            subject: currentQuestion.subject,
            subjectKey: selectedSubject,
          },
        ]

        saveShameList(next)
        return next
      })
    }
  }

  const backToHome = () => {
    setPhase('home')
    setSelectedSubject(null)
    setSelectedDifficulty(null)
    setQuestions([])
    setCurrentIndex(0)
    setSelectedOption(null)
    setLocked(false)
    setScore(0)
  }

  const toggleMusic = async () => {
    if (musicEnabled) {
      setMusicEnabled(false)
      return
    }

    setMusicEnabled(true)
  }

  return (
    <div className="app-shell">
      <ThemeBackdrop theme={theme} />

      <div className="floating-music-dock">
        <button
          type="button"
          className={`music-toggle ${musicEnabled ? 'is-active' : ''}`}
          onClick={toggleMusic}
          aria-pressed={musicEnabled}
        >
          {musicEnabled ? '背景音乐 开' : '背景音乐 关'}
        </button>
      </div>

      <div className="floating-theme-dock">
        <div
          className={`floating-theme-capsule theme-pill-${theme}`}
          role="tablist"
          aria-label="主题选择"
        >
          <div className="theme-pill-slider" aria-hidden="true" />
          {THEMES.map((item) => (
            <button
              key={item}
              type="button"
              className={`theme-chip ${item === theme ? 'is-active' : ''}`}
              onClick={() => setTheme(item)}
              aria-pressed={item === theme}
            >
              {THEME_COPY[item].switchLabel}
            </button>
          ))}
        </div>
      </div>

      <main className="app">
        <section className="screen">
          <div
            className={`panel ${phase === 'home' ? 'home-panel' : ''} ${phase === 'playing' ? 'quiz-panel' : ''} ${
              phase === 'result' ? 'result-panel' : ''
            }`}
            style={
              currentSubjectThemeMeta
                ? {
                    '--subject-accent': currentSubjectThemeMeta.accent,
                  }
                : null
            }
          >
            {phase === 'home' ? (
              <>
                {theme === 'anime' ? <div className="title-bubble">大学文凭挑战赛!</div> : null}

                {theme === 'kawaii' ? <div className="home-emoji">🍭</div> : null}

                <div className="home-stats" aria-label="总答题统计">
                  <span>对：{homeStats.correctCount}</span>
                  <span>错：{homeStats.wrongCount}</span>
                  <strong className={homeStats.accuracy >= 60 ? 'accuracy-good' : 'accuracy-bad'}>
                    正确率：{homeStats.accuracy}%
                  </strong>
                </div>

                {theme === 'glass' ? (
                  <div className="glass-home-marquee" aria-hidden="true">
                    <span className="glass-hero-chip">10Q Round</span>
                    <span className="glass-hero-chip">{SUBJECTS.length} Subjects</span>
                    <span className="glass-hero-chip">{globalQuestionCount} Total</span>
                  </div>
                ) : null}

                <h1>{copy.homeTitle}</h1>
                <p className="lead">{copy.homeSubtitle}</p>

                {IS_DEV ? <p className="theme-note">当前为调试环境：允许重复拿题</p> : null}
                {IS_DEV ? (
                  <div className="dev-dataset-panel" aria-label="开发环境题库信息">
                    <strong>开发题库已载入：共 {globalQuestionCount} 题</strong>
                    <small>当前代码侧每科目标为 200 题，四个难度各 50 题；若页面不一致，重启 dev 并强刷浏览器。</small>
                  </div>
                ) : null}
                {copy.homeFootnote ? <p className="theme-note">{copy.homeFootnote}</p> : null}

                <div className="subject-grid">
                  {SUBJECTS.map((subject) => {
                    const subjectMeta = SUBJECT_THEME_META[theme][subject.key]
                    const remainingCount = availableQuestionCountBySubject[subject.key] ?? 0
                    const totalCount = totalQuestionCountBySubject[subject.key] ?? 0
                    const difficultySummary = difficultySummaryBySubject[subject.key] ?? ''

                    return (
                      <button
                        key={subject.key}
                        type="button"
                        className="subject-card"
                        onClick={() => chooseSubject(subject.key)}
                        disabled={remainingCount === 0}
                        style={{ '--subject-accent': subjectMeta.accent }}
                      >
                        <span className="subject-icon">{subjectMeta.icon}</span>
                        <span className="subject-copy">
                          <strong>{subjectMeta.short}</strong>
                          <small>{subject.name}</small>
                          <small>
                            {remainingCount
                              ? `${IS_DEV ? '当前可抽' : '剩余'} ${remainingCount} 题`
                              : IS_DEV
                                ? '当前难度暂无题目'
                                : '本学科已答完'}
                          </small>
                          {IS_DEV ? <small>题库总量 {totalCount} 题</small> : null}
                          {IS_DEV ? <small>{difficultySummary}</small> : null}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </>
            ) : null}

            {phase === 'difficulty' && currentSubject ? (
              <>
                <div className="difficulty-head">
                  <span className="subject-tag">{currentSubjectThemeMeta?.short || currentSubject.name}</span>
                  <button type="button" className="ghost-button back-button" onClick={backToHome}>
                    返回选科
                  </button>
                </div>

                <h2 className="question-title">选择难度</h2>
                <p className="lead">先选一个阶段，再进入本轮 10 题。</p>
                {IS_DEV ? (
                  <div className="dev-dataset-panel compact" aria-label="当前学科题库信息">
                    <strong>
                      {currentSubject.name} 当前题库 {selectedSubjectQuestionTotal} 题
                    </strong>
                    <small>{selectedSubjectDifficultySummary}</small>
                  </div>
                ) : null}

                <div className="difficulty-grid">
                  {DIFFICULTIES.map((difficulty) => {
                    const remainingCount = availableQuestionCountByDifficulty[difficulty.key] ?? 0

                    return (
                      <button
                        key={difficulty.key}
                        type="button"
                        className="difficulty-card"
                        onClick={() => startRound(selectedSubject, difficulty.key)}
                        disabled={remainingCount === 0}
                      >
                        <strong>{difficulty.label}</strong>
                        <small>{remainingCount ? `${IS_DEV ? '当前可抽' : '剩余'} ${remainingCount} 题` : '暂无可答题目'}</small>
                      </button>
                    )
                  })}
                </div>
              </>
            ) : null}

            {phase === 'playing' && currentQuestion ? (
              <>
                <div className="quiz-head">
                  <div className="quiz-tags">
                    <span className="subject-tag">{currentSubjectThemeMeta?.short || currentSubject?.name}</span>
                    {currentDifficulty ? <span className="subject-tag secondary-tag">{currentDifficulty.label}</span> : null}
                  </div>
                  <span className="progress-text">
                    {theme === 'anime'
                      ? `${String(currentIndex + 1).padStart(2, '0')}/${String(questions.length).padStart(2, '0')}`
                      : `${currentIndex + 1} / ${questions.length}`}
                  </span>
                </div>

                <div className="progress-bar" aria-hidden="true">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>

                {theme === 'glass' ? (
                  <div className="score-row">
                    <span>当前得分</span>
                    <strong>
                      {score} / {questions.length}
                    </strong>
                  </div>
                ) : null}

                {theme === 'glass' ? (
                  <div className="glass-quiz-meta" aria-hidden="true">
                    <span className="glass-hero-chip">Left {questions.length - currentIndex - 1}</span>
                    <span className="glass-hero-chip">Keep Going</span>
                  </div>
                ) : null}

                <h2 className="question-title">{currentQuestion.prompt}</h2>

                <div className="option-list">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = option === selectedOption
                    const stateClass = locked && isSelected ? 'is-selected' : ''

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`option-button ${stateClass}`}
                        onClick={() => handleSelect(option)}
                        disabled={locked}
                      >
                        <span className="option-key">{String.fromCharCode(65 + index)}</span>
                        <span className="option-text">{option}</span>
                      </button>
                    )
                  })}
                </div>

                {theme === 'glass' ? (
                  <p className="helper-text">点击选项即刻作答 · 保持专注</p>
                ) : null}
              </>
            ) : null}

            {phase === 'result' && summary ? (
              <>
                {theme === 'anime' ? <div className="title-bubble">鉴定结果</div> : null}

                {theme === 'anime' && animeScene ? (
                  <div className="anime-result-scene">
                    <div className="anime-result-stage">
                      <img className="anime-scene-side side-left" src={ANIME_RESULT_LEFT_IMAGE} alt="" aria-hidden="true" />
                      <img className="anime-scene-side side-right" src={ANIME_RESULT_RIGHT_IMAGE} alt="" aria-hidden="true" />

                    <div className="speech-bubble bubble-left-bottom">{animeScene.bubbles[2]}</div>
                    <div className="speech-bubble bubble-right-bottom">{animeScene.bubbles[3]}</div>

                    <div className="anime-result-card">
                      <div className="anime-result-badge">{animeScene.badge}</div>
                      <div className="anime-scene-emoji">{summary.emoji}</div>
                      <h2>{summary.judgement}</h2>
                      <p className="lead">{summary.description}</p>

                      <div className="result-stats">
                        <article className="stat-card">
                          <span>得分</span>
                          <strong>
                            {score} / {summary.total}
                          </strong>
                        </article>
                        <article className="stat-card">
                          <span>正确率</span>
                          <strong>{summary.accuracy}%</strong>
                        </article>
                      </div>

                      <div className="result-actions">
                        <button
                          type="button"
                          className="primary-button"
                          onClick={() => startRound(selectedSubject, selectedDifficulty)}
                          disabled={currentDifficultyRemainingCount === 0}
                        >
                          {currentDifficultyRemainingCount === 0 ? '当前难度已答完' : copy.resultAction}
                        </button>
                        <button type="button" className="ghost-button" onClick={backToHome}>
                          重新选科目
                        </button>
                      </div>

                      <section className="review-section">
                        <div className="review-section-head">
                          <h3>耻辱柱</h3>
                          <span>累计 {shameListCount} 题</span>
                        </div>

                        {shameListCount ? (
                          <div className="review-list" style={reviewListStyle} role="list" aria-label="错题列表">
                            {currentSubjectShameList.map((item, index) => (
                              <article key={item.id} className="review-card">
                                <div className="review-head">
                                  <span>第 {index + 1} 题</span>
                                  <strong className="bad">答错</strong>
                                </div>
                                <h3>{item.prompt}</h3>
                                <p>你的答案：{item.selected}</p>
                                <p>正确答案：{item.answer}</p>
                                <p>{item.explanation}</p>
                              </article>
                            ))}
                          </div>
                        ) : (
                          <div className="review-empty">
                            <strong>当前学科还没有耻辱柱记录。</strong>
                            <p>只显示当前学科的累计错题，同一道题只记录一次。</p>
                          </div>
                        )}
                      </section>
                    </div>
                    </div>
                  </div>
                ) : null}

                <div className="result-emoji">{summary.emoji}</div>
                <h2>{summary.judgement}</h2>
                <p className="lead">{summary.description}</p>
                {theme === 'glass' ? (
                  <div className="glass-result-pills" aria-hidden="true">
                    <span className="glass-hero-chip">{currentSubjectThemeMeta?.short || currentSubject?.name}</span>
                    {currentDifficulty ? <span className="glass-hero-chip">{currentDifficulty.label}</span> : null}
                    <span className="glass-hero-chip">ACC {summary.accuracy}%</span>
                  </div>
                ) : null}

                <div className="result-stats">
                  <article className="stat-card">
                    <span>得分</span>
                    <strong>
                      {score} / {summary.total}
                    </strong>
                  </article>
                  <article className="stat-card">
                    <span>正确率</span>
                    <strong>{summary.accuracy}%</strong>
                  </article>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => startRound(selectedSubject, selectedDifficulty)}
                    disabled={currentDifficultyRemainingCount === 0}
                  >
                    {currentDifficultyRemainingCount === 0 ? '当前难度已答完' : copy.resultAction}
                  </button>
                  <button type="button" className="ghost-button" onClick={backToHome}>
                    重新选科目
                  </button>
                </div>

                <section className="review-section">
                  <div className="review-section-head">
                    <h3>耻辱柱</h3>
                    <span>累计 {shameListCount} 题</span>
                  </div>

                  {shameListCount ? (
                    <div className="review-list" style={reviewListStyle} role="list" aria-label="错题列表">
                      {currentSubjectShameList.map((item, index) => (
                        <article key={item.id} className="review-card">
                          <div className="review-head">
                            <span>第 {index + 1} 题</span>
                            <strong className="bad">答错</strong>
                          </div>
                          <h3>{item.prompt}</h3>
                          <p>你的答案：{item.selected}</p>
                          <p>正确答案：{item.answer}</p>
                          <p>{item.explanation}</p>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="review-empty">
                      <strong>当前学科还没有耻辱柱记录。</strong>
                      <p>只显示当前学科的累计错题，同一道题只记录一次。</p>
                    </div>
                  )}
                </section>
              </>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
