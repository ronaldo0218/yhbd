interface ProgressDotsProps {
  total: number
  current: number
}

// 상단에 표시되는 작은 진행도 점 (Scene 1/5, 2/5 ... 를 시각적으로 표현)
export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 pb-2 pt-6">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i + 1 === current ? 'w-5 bg-blush-500' : 'w-1.5 bg-blush-200'
          }`}
        />
      ))}
    </div>
  )
}
