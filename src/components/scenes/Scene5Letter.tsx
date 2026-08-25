import { motion, type Variants } from 'framer-motion'
import { letterLines, letterSignature } from '../../data/letter'
import ProgressDots from '../ProgressDots'

// Scene 5. 편지 — 한 줄씩 부드럽게 페이드인되는 손편지 연출
export default function Scene5Letter() {
  const container: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.45, delayChildren: 0.3 },
    },
  }

  const line: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <div className="flex min-h-[100svh] flex-col px-6 pb-12">
      <ProgressDots total={5} current={5} />

      <div className="mx-auto w-full max-w-sm flex-1 rounded-2xl border border-blush-200 bg-white px-6 py-8 shadow-[0_20px_45px_-20px_rgba(74,63,69,0.3)]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="font-hand-kr text-lg leading-loose text-ink-900"
        >
          {letterLines.map((text, i) => (
            <motion.p key={i} variants={line} className={text === '' ? 'h-4' : ''}>
              {text}
            </motion.p>
          ))}

          <motion.p
            variants={line}
            className="mt-8 text-right text-xl font-semibold text-blush-600"
          >
            {letterSignature}
          </motion.p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: letterLines.length * 0.45 + 1, duration: 1 }}
        className="mt-6 text-center text-xs tracking-widest text-blush-400"
      >
        ♥ HAPPY BIRTHDAY ♥
      </motion.p>
    </div>
  )
}
