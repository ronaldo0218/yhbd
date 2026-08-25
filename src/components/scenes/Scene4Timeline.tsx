import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { timelinePhotos } from '../../data/timeline'
import { shuffle } from '../../utils/shuffle'
import NextButton from '../NextButton'
import ProgressDots from '../ProgressDots'

interface Scene4TimelineProps {
  onComplete: () => void
}

// Scene 4. 사진 시간순 정렬 게임
// 무작위로 섞인 9장의 사진을 실제 시간 순서대로 클릭해야 합니다.
export default function Scene4Timeline({ onComplete }: Scene4TimelineProps) {
  // 화면에 보여줄 순서는 최초 1회만 섞고 이후 리렌더링에도 유지
  const shuffled = useMemo(() => shuffle(timelinePhotos), [])
  const sortedByAnswer = useMemo(
    () => [...timelinePhotos].sort((a, b) => a.order - b.order),
    [],
  )

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [shake, setShake] = useState(false)

  const total = timelinePhotos.length
  const done = selectedIds.length === total

  const handleTap = (id: string) => {
    if (done || shake) return
    if (selectedIds.includes(id)) return

    const expected = sortedByAnswer[selectedIds.length]

    if (id === expected.id) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setShake(true)
      window.setTimeout(() => {
        setSelectedIds([])
        setShake(false)
      }, 500)
    }
  }

  return (
    <div className="flex min-h-[100svh] flex-col px-5 pb-8">
      <ProgressDots total={5} current={4} />

      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold text-ink-900">추억 순서 맞추기</h2>
        <p className="mt-1 text-xs text-ink-700/70">
          {shake ? '순서가 틀렸어요! 다시 처음부터' : '시간 순서대로 사진을 눌러보세요'}
        </p>
      </div>

      <motion.div
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-3 gap-2.5"
      >
        {shuffled.map((photo) => {
          const orderIndex = selectedIds.indexOf(photo.id)
          const isSelected = orderIndex !== -1

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => handleTap(photo.id)}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={photo.src}
                alt=""
                className={`h-full w-full object-cover transition-opacity ${
                  isSelected ? 'opacity-50' : 'opacity-100'
                }`}
              />
              {isSelected && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center bg-blush-500/40 text-2xl font-bold text-white"
                >
                  {orderIndex + 1}
                </motion.span>
              )}
            </button>
          )
        })}
      </motion.div>

      <p className="mt-4 text-center text-xs text-ink-700/70">
        {selectedIds.length} / {total} 맞음
      </p>

      <div className="flex-1" />

      <NextButton visible={done} onClick={onComplete} />
    </div>
  )
}
