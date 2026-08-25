import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { albumTitle, coupleTitle, openHint } from '../../data/config'

interface Scene1CoverProps {
  onComplete: () => void
}

// Scene 1. 닫혀있는 앨범 표지 — 탭하면 펼쳐지는 애니메이션 후 다음 Scene으로 이동
export default function Scene1Cover({ onComplete }: Scene1CoverProps) {
  const [opening, setOpening] = useState(false)
  // opacity/rotateY 두 값이 각각 애니메이션 완료를 보고하면서 onAnimationComplete가
  // 두 번 불려 다음 Scene으로 두 칸(갤러리를 건너뛰고 퀴즈로) 넘어가는 문제를 막는 가드
  const completedRef = useRef(false)

  const handleTap = () => {
    if (opening) return
    setOpening(true)
  }

  return (
    <div className="flex h-full min-h-[100svh] items-center justify-center bg-gradient-to-br from-blush-100 via-blush-50 to-white px-6">
      {/* 책이 펼쳐지는 느낌을 주기 위한 원근감(perspective) 컨테이너 */}
      <div className="aspect-[3/4] w-full max-w-xs" style={{ perspective: 1200 }}>
        <motion.button
          type="button"
          onClick={handleTap}
          aria-label={openHint}
          initial={{ opacity: 0, y: 16, rotateY: 0 }}
          animate={
            opening
              ? { opacity: [1, 1, 0], rotateY: [0, -12, -110] }
              : { opacity: 1, y: 0, rotateY: 0 }
          }
          transition={
            opening
              ? { duration: 0.85, times: [0, 0.15, 1], ease: [0.65, 0, 0.35, 1] }
              : { duration: 0.7, ease: 'easeOut' }
          }
          onAnimationComplete={() => {
            if (opening && !completedRef.current) {
              completedRef.current = true
              onComplete()
            }
          }}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          className="relative flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl border border-blush-200 bg-white/70 px-8 py-10 text-center shadow-[0_20px_50px_-15px_rgba(236,111,142,0.35)] backdrop-blur-sm"
        >
          {/* 책등(spine) — 표지 왼쪽에 살짝 두께감을 표현 */}
          <span className="absolute inset-y-0 left-0 w-1.5 rounded-l-2xl bg-blush-300/70" />

          {/* 열릴 때 안쪽으로 지는 그림자로 입체감 강조 */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={opening ? { opacity: [0, 0.4, 0] } : { opacity: 0 }}
            transition={
              opening ? { duration: 0.85, times: [0, 0.3, 1] } : { duration: 0 }
            }
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-ink-900/40 via-ink-900/10 to-transparent"
          />

          <span className="text-xs tracking-[0.35em] text-blush-500">
            HAPPY BIRTHDAY
          </span>

          <h1 className="font-serif-kr text-3xl font-bold text-ink-900">
            {coupleTitle}
          </h1>

          <p className="text-sm leading-relaxed text-ink-700">{albumTitle}</p>

          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-4 text-xs text-blush-500"
          >
            {openHint}
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}
