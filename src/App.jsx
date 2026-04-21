import { useEffect, useMemo, useState } from 'react'
import { QUESTIONS_BY_SUBJECT, SUBJECTS } from './data/questions'

const ROUND_SIZE = 5

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

function getJudgement(score, total) {
  const ratio = score / total

  if (ratio === 1) return '基础还在'
  if (ratio >= 0.8) return '差点翻车'
  if (ratio >= 0.6) return '已经危险'
  if (ratio >= 0.4) return '基础松了'
  return '建议补课'
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

  const currentQuestion = questions[currentIndex]
  const currentSubject = SUBJECTS.find((item) => item.key === selectedSubject)
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0

  const summary = useMemo(() => {
    if (phase !== 'result' || !questions.length) return null

    return {
      total: questions.length,
      accuracy: Math.round((score / questions.length) * 100),
      judgement: getJudgement(score, questions.length),
    }
  }, [phase, questions.length, score])

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
    <main className="app">
      <div className="screen">
        {phase === 'home' ? (
          <section className="panel home-panel">
            <p className="mini-label">DXWM</p>
            <h1>大学文凭能有多文盲</h1>
            <p className="lead">
              只考送分题。选一科，看看大学生的基础到底还剩多少。
            </p>

            <div className="meta-row">
              <span className="meta-pill">5 道题一局</span>
              <span className="meta-pill">全是选择题</span>
              <span className="meta-pill">即时判定</span>
            </div>

            <div className="subject-list">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.key}
                  type="button"
                  className="subject-button"
                  onClick={() => startRound(subject.key)}
                >
                  <span className="subject-mark">{subject.short}</span>
                  <span className="subject-name">{subject.name}</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {phase === 'playing' && currentQuestion ? (
          <section className="panel game-panel">
            <div className="top-row">
              <span className="subject-chip">{currentSubject?.name}</span>
            </div>

            <div className="score-row">
              <span>
                第 {currentIndex + 1} / {questions.length} 题
              </span>
              <span>
                {score} / {questions.length}
              </span>
            </div>

            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

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

            {!locked ? (
              <div className="bottom-box">
                <p className="hint-text">点一个选项直接作答。</p>
              </div>
            ) : null}
          </section>
        ) : null}

        {phase === 'result' && summary ? (
          <section className="panel result-panel">
            <p className="mini-label">{currentSubject?.name}</p>
            <h2>{summary.judgement}</h2>
            <p className="lead">
              答对 {score} / {summary.total} 题，正确率 {summary.accuracy}%。
            </p>

            <div className="result-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => startRound(selectedSubject)}
              >
                再来一局
              </button>
              <button type="button" className="ghost-button" onClick={backToHome}>
                重新选科
              </button>
            </div>

            <div className="review-list">
              {history.map((item, index) => (
                <article key={item.id} className="review-item">
                  <div className="review-head">
                    <span>第 {index + 1} 题</span>
                    <strong className={item.isCorrect ? 'ok' : 'bad'}>
                      {item.isCorrect ? '正确' : '错误'}
                    </strong>
                  </div>
                  <h3>{item.prompt}</h3>
                  <p>你的答案：{item.selected}</p>
                  {!item.isCorrect ? <p>正确答案：{item.answer}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
