// ============================================
// 🧩 Scene 4. 사진 시간순 정렬 게임 데이터
// ============================================
// ✅ 사진/정답 수정 방법
//   1) src/assets/photos/ 에 사진 9장을 넣고 아래 import를 교체하세요.
//   2) order 값 = "실제로 촬영된 시간 순서" 입니다. (1이 가장 먼저 찍은 사진)
//      화면에는 무작위로 섞여서 나오고, 플레이어가 order가 빠른 사진부터
//      순서대로 눌러야 정답 처리됩니다.
//   3) 사진 장수를 바꾸고 싶다면 배열 항목을 추가/삭제하고,
//      order 값이 1부터 빠짐없이 이어지도록 다시 매겨주세요.
//   4) label은 정답을 맞힌 후(또는 디버깅 시) 참고할 수 있는 메모입니다.
//      게임 중에는 화면에 노출되지 않습니다.

import timeline1 from '../assets/photos/timeline1.jpg'
import timeline2 from '../assets/photos/timeline2.jpg'
import timeline3 from '../assets/photos/timeline3.jpg'
import timeline4 from '../assets/photos/timeline4.jpg'
import timeline5 from '../assets/photos/timeline5.jpg'
import timeline6 from '../assets/photos/timeline6.jpg'
import timeline7 from '../assets/photos/timeline7.jpg'
import timeline8 from '../assets/photos/timeline8.jpg'
import timeline9 from '../assets/photos/timeline9.jpg'

export interface TimelinePhoto {
  id: string
  src: string
  /** 실제 시간 순서 (1 = 가장 먼저). 이 숫자만 바꾸면 정답이 바뀝니다 */
  order: number
  /** 개발자용 메모 (화면에 표시되지 않음) */
  label: string
}

// 👇 order 값을 실제 추억 순서에 맞게 수정하세요
export const timelinePhotos: TimelinePhoto[] = [
  { id: 't1', src: timeline1, order: 1, label: '첫 만남' },
  { id: 't2', src: timeline2, order: 2, label: '첫 데이트' },
  { id: 't3', src: timeline3, order: 3, label: '첫 여행' },
  { id: 't4', src: timeline4, order: 4, label: '기념일' },
  { id: 't5', src: timeline5, order: 5, label: '생일 파티' },
  { id: 't6', src: timeline6, order: 6, label: '놀이공원' },
  { id: 't7', src: timeline7, order: 7, label: '겨울 여행' },
  { id: 't8', src: timeline8, order: 8, label: '1주년' },
  { id: 't9', src: timeline9, order: 9, label: '지금' },
]
