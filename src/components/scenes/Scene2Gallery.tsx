import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galleryPhotos } from '../../data/photos'
import NextButton from '../NextButton'
import ProgressDots from '../ProgressDots'

interface Scene2GalleryProps {
  onComplete: () => void
}

// 빨래줄에 걸린 사진들을 살짝씩 기울여 보여주기 위한 각도 값 (사진 개수만큼 순환)
const PEG_TILTS = [-4, 3, -2, 2, -3, 4]

// Scene 2. 사진 갤러리
// 처음에는 빨래줄 두 줄에 사진이 3장씩 걸려있는 모습을 보여주고,
// 사진을 누르면 그 사진부터 옆으로 스와이프하며 볼 수 있는 화면으로 전환됩니다.
// 스와이프 화면 왼쪽 위의 뒤로가기 버튼을 누르면 다시 빨래줄 화면으로 돌아갑니다.
export default function Scene2Gallery({ onComplete }: Scene2GalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<'line' | 'swipe'>('line')
  const [startIndex, setStartIndex] = useState(0)
  const [viewed, setViewed] = useState<Set<number>>(new Set())

  const total = galleryPhotos.length
  const allViewed = viewed.size >= total

  const markViewed = (index: number) => {
    setViewed((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const openPhoto = (index: number) => {
    setStartIndex(index)
    setView('swipe')
  }

  // 스와이프 화면으로 전환될 때, 눌렀던 사진 위치로 스크롤 이동 + 열람 처리
  useEffect(() => {
    if (view !== 'swipe') return
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: startIndex * el.clientWidth })
    markViewed(startIndex)
  }, [view, startIndex])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    markViewed(index)
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col px-5 pb-8">
      <ProgressDots total={5} current={2} />

      <AnimatePresence>
        {view === 'swipe' && (
          <motion.button
            type="button"
            onClick={() => setView('line')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            aria-label="뒤로가기"
            className="absolute left-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-sm shadow-ink-900/10 backdrop-blur-sm active:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold text-ink-900">우리가 함께한 순간들</h2>
        <p className="mt-1 text-xs text-ink-700/70">
          {view === 'line' ? '사진을 살짝 눌러보세요' : '옆으로 넘겨서 사진을 확인해봐'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {view === 'line' ? (
          <motion.div
            key="line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col justify-center gap-10"
          >
            {[0, 1].map((row) => (
              <div key={row} className="relative">
                <div className="h-px w-full bg-ink-900/15" />
                <div className="grid grid-cols-3 gap-3 px-1 pt-2">
                  {galleryPhotos.slice(row * 3, row * 3 + 3).map((photo, i) => {
                    const index = row * 3 + i
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => openPhoto(index)}
                        style={{ transform: `rotate(${PEG_TILTS[index]}deg)` }}
                        className="relative flex flex-col items-center transition-transform active:scale-95"
                      >
                        <span className="h-3 w-4 rounded-[2px] bg-blush-400 shadow-sm shadow-ink-900/20" />
                        <span className="-mt-0.5 block w-full overflow-hidden rounded-sm border-[3px] border-white bg-white shadow-md shadow-ink-900/15">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="aspect-[4/5] w-full object-cover"
                          />
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="swipe"
            ref={scrollRef}
            onScroll={handleScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="no-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto rounded-2xl"
          >
            {galleryPhotos.map((photo, i) => (
              <div
                key={i}
                className="flex w-full flex-none snap-center flex-col items-center justify-center px-1"
              >
                <motion.img
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={photo.src}
                  alt={photo.caption}
                  className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_15px_35px_-15px_rgba(74,63,69,0.3)]"
                />
                <p className="mt-3 text-sm text-ink-700">{photo.caption}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {galleryPhotos.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              viewed.has(i) ? 'bg-blush-500' : 'bg-blush-200'
            }`}
          />
        ))}
      </div>

      <NextButton visible={allViewed} onClick={onComplete} />
    </div>
  )
}
