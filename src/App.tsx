import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Scene1Cover from './components/scenes/Scene1Cover'
import Scene2Gallery from './components/scenes/Scene2Gallery'
import Scene3Quiz from './components/scenes/Scene3Quiz'
import Scene4Timeline from './components/scenes/Scene4Timeline'
import Scene5Letter from './components/scenes/Scene5Letter'

const TOTAL_SCENES = 5

function App() {
  // 진행 상황은 useState로만 관리합니다 — 새로고침하면 Scene 1부터 다시 시작해요.
  const [scene, setScene] = useState(1)

  const goNext = () => setScene((s) => Math.min(TOTAL_SCENES, s + 1))

  return (
    <div className="min-h-[100svh] bg-blush-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {scene === 1 && <Scene1Cover onComplete={goNext} />}
          {scene === 2 && <Scene2Gallery onComplete={goNext} />}
          {scene === 3 && <Scene3Quiz onComplete={goNext} />}
          {scene === 4 && <Scene4Timeline onComplete={goNext} />}
          {scene === 5 && <Scene5Letter />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
