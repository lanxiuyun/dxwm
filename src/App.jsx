import { useEffect, useMemo, useState } from 'react'
import { QUESTIONS_BY_SUBJECT, SUBJECTS } from './data/questions'

const ROUND_SIZE = 5
const THEMES = ['glass', 'kawaii', 'anime']
const ANIME_RESULT_LEFT_IMAGE = '/ChatGPT%20Image%20%E7%AD%94%E9%A2%98%E7%BB%93%E6%9E%9C%E5%B7%A6%E4%BE%A7.png'
const ANIME_RESULT_RIGHT_IMAGE = '/ChatGPT%20Image%20%E7%AD%94%E9%A2%98%E7%BB%93%E6%9E%9C%E5%8F%B3%E4%BE%A7.png'

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
    resultAction: '返回大厅',
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

function buildRound(subjectKey) {
  return shuffle(QUESTIONS_BY_SUBJECT[subjectKey]).slice(0, ROUND_SIZE)
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
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dxwm-theme') || 'glass'
    }

    return 'glass'
  })

  const copy = THEME_COPY[theme]
  const currentQuestion = questions[currentIndex]
  const currentSubject = SUBJECTS.find((item) => item.key === selectedSubject)
  const currentSubjectThemeMeta = selectedSubject ? SUBJECT_THEME_META[theme][selectedSubject] : null
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0

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
  const animeScene = phase === 'result' && summary ? getAnimeResultScene(score, summary.total) : null

  const startRound = (subjectKey) => {
    setSelectedSubject(subjectKey)
    setQuestions(buildRound(subjectKey))
    setCurrentIndex(0)
    setSelectedOption(null)
    setLocked(false)
    setScore(0)
    setHistory([])
    setPhase('playing')
  }

  const handleSelect = (option) => {
    if (locked || !currentQuestion) return

    const isCorrect = option === currentQuestion.answer

    setSelectedOption(option)
    setLocked(true)

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1)
    }

    setHistory((items) => [
      ...items,
      {
        id: currentQuestion.id,
        prompt: currentQuestion.prompt,
        selected: option,
        answer: currentQuestion.answer,
        explanation: currentQuestion.explanation,
        isCorrect,
      },
    ])
  }

  const backToHome = () => {
    setPhase('home')
    setSelectedSubject(null)
    setQuestions([])
    setCurrentIndex(0)
    setSelectedOption(null)
    setLocked(false)
    setScore(0)
    setHistory([])
  }

  return (
    <div className="app-shell">
      <ThemeBackdrop theme={theme} />

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

                <h1>{copy.homeTitle}</h1>
                <p className="lead">{copy.homeSubtitle}</p>

                {copy.homeFootnote ? <p className="theme-note">{copy.homeFootnote}</p> : null}

                <div className="subject-grid">
                  {SUBJECTS.map((subject) => {
                    const subjectMeta = SUBJECT_THEME_META[theme][subject.key]

                    return (
                      <button
                        key={subject.key}
                        type="button"
                        className="subject-card"
                        onClick={() => startRound(subject.key)}
                        style={{ '--subject-accent': subjectMeta.accent }}
                      >
                        <span className="subject-icon">{subjectMeta.icon}</span>
                        <span className="subject-copy">
                          <strong>{subjectMeta.short}</strong>
                          <small>{subject.name}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </>
            ) : null}

            {phase === 'playing' && currentQuestion ? (
              <>
                <div className="quiz-head">
                  <span className="subject-tag">{currentSubjectThemeMeta?.short || currentSubject?.name}</span>
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

                <h2 className="question-title">{currentQuestion.prompt}</h2>

                <div className="option-list">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = option === selectedOption
                    const isCorrect = option === currentQuestion.answer
                    const stateClass = locked
                      ? isCorrect
                        ? 'is-correct'
                        : isSelected
                          ? 'is-wrong'
                          : ''
                      : ''

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
                        <button type="button" className="primary-button" onClick={() => startRound(selectedSubject)}>
                          {copy.resultAction}
                        </button>
                        <button type="button" className="ghost-button" onClick={backToHome}>
                          重新选科目
                        </button>
                      </div>

                      <div className="review-list">
                        {history.map((item, index) => (
                          <article key={item.id} className="review-card">
                            <div className="review-head">
                              <span>第 {index + 1} 题</span>
                              <strong className={item.isCorrect ? 'ok' : 'bad'}>{item.isCorrect ? '答对' : '答错'}</strong>
                            </div>
                            <h3>{item.prompt}</h3>
                            <p>你的答案：{item.selected}</p>
                            {!item.isCorrect ? <p>正确答案：{item.answer}</p> : null}
                            <p>{item.explanation}</p>
                          </article>
                        ))}
                      </div>
                    </div>
                    </div>
                  </div>
                ) : null}

                <div className="result-emoji">{summary.emoji}</div>
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
                  <button type="button" className="primary-button" onClick={() => startRound(selectedSubject)}>
                    {copy.resultAction}
                  </button>
                  <button type="button" className="ghost-button" onClick={backToHome}>
                    重新选科目
                  </button>
                </div>

                <div className="review-list">
                  {history.map((item, index) => (
                    <article key={item.id} className="review-card">
                      <div className="review-head">
                        <span>第 {index + 1} 题</span>
                        <strong className={item.isCorrect ? 'ok' : 'bad'}>
                          {item.isCorrect ? '答对' : '答错'}
                        </strong>
                      </div>
                      <h3>{item.prompt}</h3>
                      <p>你的答案：{item.selected}</p>
                      {!item.isCorrect ? <p>正确答案：{item.answer}</p> : null}
                      <p>{item.explanation}</p>
                    </article>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
