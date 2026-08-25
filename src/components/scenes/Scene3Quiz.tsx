import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quizQuestions } from '../../data/quiz'
import NextButton from '../NextButton'
import ProgressDots from '../ProgressDots'

interface Scene3QuizProps {
  onComplete: () => void
}

// Scene 3. 커플 퀴즈 — 문제를 하나씩 풀고, 전부 맞히면 다음 버튼 등장
export default function Scene3Quiz({ onComplete }: Scene3QuizProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [finished, setFinished] = useState(false)

  const question = quizQuestions[questionIndex]
  const isLast = questionIndex === quizQuestions.length - 1

  const handleSelect = (optionIndex: number) => {
    if (status === 'correct') return // 정답 처리 중에는 재선택 막기

    setSelected(optionIndex)

    if (optionIndex === question.answerIndex) {
      setStatus('correct')
      window.setTimeout(() => {
        if (isLast) {
          setFinished(true)
        } else {
          setQuestionIndex((i) => i + 1)
          setSelected(null)
          setStatus('idle')
        }
      }, 700)
    } else {
      setStatus('wrong')
    }
  }

  return (
    <div className="flex min-h-[100svh] flex-col px-5 pb-8">
      <ProgressDots total={5} current={3} />

      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-ink-900">우리 사이 퀴즈</h2>
        <p className="mt-1 text-xs text-ink-700/70">
          {questionIndex + 1} / {quizQuestions.length}
        </p>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <p className="mb-6 text-center text-base font-medium leading-relaxed text-ink-900">
              {question.question}
            </p>

            <div className="flex flex-col gap-3">
              {question.options.map((option, i) => {
                const isSelected = selected === i
                const showCorrect = status === 'correct' && isSelected
                const showWrong = status === 'wrong' && isSelected

                return (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(i)}
                    animate={showWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      showCorrect
                        ? 'border-blush-500 bg-blush-100 text-blush-600'
                        : showWrong
                          ? 'border-red-200 bg-red-50 text-red-400'
                          : 'border-blush-200 bg-white text-ink-900 active:bg-blush-50'
                    }`}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {status === 'wrong' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-sm text-blush-500"
                >
                  땡~
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <NextButton visible={finished} onClick={onComplete} />
    </div>
  )
}
