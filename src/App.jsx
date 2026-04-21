import { useMemo, useState } from 'react'

const QUESTION_BANK = [
  {
    id: 1,
    category: '历史',
    prompt: '文艺复兴最早兴起于哪一个欧洲地区？',
    options: ['英格兰', '伊比利亚半岛', '意大利城邦', '斯堪的纳维亚'],
    answer: '意大利城邦',
    insight: '佛罗伦萨、威尼斯等意大利城邦拥有商业资本与人文氛围，成为文艺复兴的核心起点。',
  },
  {
    id: 2,
    category: '科学',
    prompt: '光在真空中的传播速度大约是多少？',
    options: ['30 万千米/秒', '3 万千米/秒', '3000 千米/秒', '300 千米/秒'],
    answer: '30 万千米/秒',
    insight: '更精确的值约为 299792 千米/秒，日常通常取 30 万千米/秒。',
  },
  {
    id: 3,
    category: '文学',
    prompt: '《百年孤独》的作者是？',
    options: ['略萨', '博尔赫斯', '加西亚·马尔克斯', '聂鲁达'],
    answer: '加西亚·马尔克斯',
    insight: '这部作品是魔幻现实主义代表作，作者是哥伦比亚作家加西亚·马尔克斯。',
  },
  {
    id: 4,
    category: '地理',
    prompt: '世界面积最大的海洋是？',
    options: ['大西洋', '印度洋', '北冰洋', '太平洋'],
    answer: '太平洋',
    insight: '太平洋覆盖地球表面面积最大，也拥有最深的海沟系统。',
  },
  {
    id: 5,
    category: '艺术',
    prompt: '“印象派”这一名称最初与哪位画家的作品密切相关？',
    options: ['莫奈', '毕加索', '梵高', '达利'],
    answer: '莫奈',
    insight: '莫奈的《印象·日出》直接促成了“印象派”这一称呼的传播。',
  },
  {
    id: 6,
    category: '常识',
    prompt: '联合国总部位于哪座城市？',
    options: ['日内瓦', '纽约', '巴黎', '华盛顿'],
    answer: '纽约',
    insight: '联合国总部位于美国纽约曼哈顿东河沿岸。',
  },
  {
    id: 7,
    category: '科技',
    prompt: '计算机中，CPU 的主要职责最准确的描述是？',
    options: ['长期存储数据', '执行指令并协调运算', '显示图像', '连接互联网'],
    answer: '执行指令并协调运算',
    insight: 'CPU 是中央处理器，负责解释并执行程序指令，协调系统核心运算。',
  },
  {
    id: 8,
    category: '经济',
    prompt: '“供给与需求”理论主要用来解释什么？',
    options: ['语言演变', '价格形成', '地壳运动', '人口迁移'],
    answer: '价格形成',
    insight: '供需关系是微观经济学中解释市场价格与交易量变化的基础。',
  },
]

const GAME_SIZE = 6

function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function getRank(score, total) {
  const ratio = score / total

  if (ratio === 1) return '通识宗师'
  if (ratio >= 0.8) return '知识猎手'
  if (ratio >= 0.6) return '稳定输出'
  if (ratio >= 0.4) return '还在热身'
  return '等待反击'
}

export default function App() {
  const [questions, setQuestions] = useState(() =>
    shuffle(QUESTION_BANK).slice(0, GAME_SIZE),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const finished = currentIndex >= questions.length

  const summary = useMemo(() => {
    if (!finished) {
      return null
    }

    return {
      rank: getRank(score, questions.length),
      accuracy: Math.round((score / questions.length) * 100),
    }
  }, [finished, questions.length, score])

  const handleSelect = (option) => {
    if (locked) return

    setSelectedOption(option)
    setLocked(true)

    const isCorrect = option === currentQuestion.answer
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setHistory((prev) => [
      ...prev,
      {
        id: currentQuestion.id,
        prompt: currentQuestion.prompt,
        category: currentQuestion.category,
        selected: option,
        answer: currentQuestion.answer,
        isCorrect,
      },
    ])
  }

  const handleNext = () => {
    setSelectedOption(null)
    setLocked(false)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleRestart = () => {
    setQuestions(shuffle(QUESTION_BANK).slice(0, GAME_SIZE))
    setCurrentIndex(0)
    setSelectedOption(null)
    setLocked(false)
    setScore(0)
    setHistory([])
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Brain Arcade</p>
          <h1>把通识题，做成一场有节奏的前端游戏。</h1>
          <p className="hero-text">
            覆盖历史、科学、文学、地理与现代常识。每一局随机抽题，答完直接看到知识短评和结果分级。
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>题量</span>
            <strong>{questions.length}</strong>
          </div>
          <div className="stat-card">
            <span>得分</span>
            <strong>
              {score}/{questions.length}
            </strong>
          </div>
          <div className="stat-card">
            <span>状态</span>
            <strong>{finished ? '已结算' : '进行中'}</strong>
          </div>
        </div>
      </section>

      {!finished ? (
        <section className="game-grid">
          <article className="question-card">
            <div className="question-topline">
              <span className="pill">{currentQuestion.category}</span>
              <span className="counter">
                第 {currentIndex + 1} 题 / 共 {questions.length} 题
              </span>
            </div>

            <div className="progress-track" aria-hidden="true">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <h2>{currentQuestion.prompt}</h2>

            <div className="options">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === option
                const isCorrect = option === currentQuestion.answer
                const stateClass = locked
                  ? isCorrect
                    ? 'is-correct'
                    : isSelected
                      ? 'is-wrong'
                      : ''
                  : isSelected
                    ? 'is-selected'
                    : ''

                return (
                  <button
                    key={option}
                    type="button"
                    className={`option-card ${stateClass}`}
                    onClick={() => handleSelect(option)}
                    disabled={locked}
                  >
                    <span className="option-index">0{index + 1}</span>
                    <span>{option}</span>
                  </button>
                )
              })}
            </div>

            <div className="action-row">
              <div className="feedback">
                {locked ? (
                  <>
                    <strong>
                      {selectedOption === currentQuestion.answer ? '回答正确' : '这题答错了'}
                    </strong>
                    <span>{currentQuestion.insight}</span>
                  </>
                ) : (
                  <span>选择一个答案后会立即判定，并展示这题的知识点。</span>
                )}
              </div>

              <button
                type="button"
                className="next-button"
                onClick={handleNext}
                disabled={!locked}
              >
                {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
              </button>
            </div>
          </article>

          <aside className="side-panel">
            <div className="side-card">
              <p className="side-label">当前节奏</p>
              <h3>{locked ? '判题完成' : '等待作答'}</h3>
              <p>
                答题后立即反馈，减少空白状态。这样更像游戏，而不是静态问卷。
              </p>
            </div>

            <div className="side-card">
              <p className="side-label">答题记录</p>
              <div className="history-list">
                {history.length === 0 ? (
                  <p className="history-empty">还没有记录，从第一题开始。</p>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="history-item">
                      <span>{item.category}</span>
                      <strong>{item.isCorrect ? '正确' : '错误'}</strong>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </section>
      ) : (
        <section className="result-panel">
          <div className="result-head">
            <p className="eyebrow">Round Complete</p>
            <h2>{summary.rank}</h2>
            <p>
              你答对了 {score} / {questions.length} 题，正确率 {summary.accuracy}%。
            </p>
          </div>

          <div className="result-grid">
            {history.map((item) => (
              <article key={item.id} className="result-item">
                <div className="result-meta">
                  <span className="pill">{item.category}</span>
                  <strong className={item.isCorrect ? 'good' : 'bad'}>
                    {item.isCorrect ? '答对' : '答错'}
                  </strong>
                </div>
                <h3>{item.prompt}</h3>
                <p>你的答案：{item.selected}</p>
                {!item.isCorrect ? <p>正确答案：{item.answer}</p> : null}
              </article>
            ))}
          </div>

          <button type="button" className="restart-button" onClick={handleRestart}>
            再来一局
          </button>
        </section>
      )}
    </main>
  )
}
