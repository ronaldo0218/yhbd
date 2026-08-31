import { motion, AnimatePresence } from 'framer-motion'

interface NextButtonProps {
  label?: string
  onClick: () => void
  visible: boolean
}

// 각 Scene 하단에 공통으로 쓰이는 "다음" 버튼
// visible이 true가 되기 전까지는 렌더링되지 않고, 나타날 때 부드럽게 페이드인 됩니다.
export default function NextButton({ label = '우리 참 재밌게 놀았다 그치', onClick, visible }: NextButtonProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onClick}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 w-full rounded-full bg-blush-500 py-3.5 text-center text-base font-medium tracking-wide text-white shadow-sm shadow-blush-300/50 active:bg-blush-600"
        >
          {label}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
