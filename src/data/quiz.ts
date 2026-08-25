// ============================================
// 💭 Scene 3. 커플 퀴즈 문제 데이터
// ============================================
// ✅ 문제 수정/추가 방법
//   - question   : 문제 문구
//   - options    : 보기 배열 (2~4개 권장)
//   - answerIndex: 정답 보기의 번호 (0부터 시작!)
//                  예) options의 1번째가 정답이면 0, 2번째가 정답이면 1
//   - 문제를 추가하고 싶으면 아래 배열에 객체를 통째로 복사해서 붙여넣고
//     내용만 바꾸면 됩니다. 순서를 바꾸면 출제 순서도 바뀝니다.

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  /** 정답 보기의 인덱스 (0부터 시작) — 여기 숫자만 바꾸면 정답 수정 가능 */
  answerIndex: number
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: '우리가 처음 만난 날은?',
    options: ['2023년 3월 14일', '2023년 5월 21일', '2023년 8월 9일', '2023년 11월 2일'],
    answerIndex: 1,
  },
  {
    id: 'q2',
    question: '우리가 처음 만난 장소는?',
    options: ['홍대 카페', '수학학원', '친구 소개팅', '동아리 모임'],
    answerIndex: 2,
  },
  {
    id: 'q3',
    question: '우리가 가장 좋아하는 음식은?',
    options: ['떡볶이', '초밥', '파스타', '삼겹살'],
    answerIndex: 0,
  },
  {
    id: 'q4',
    question: '우리가 아직 안가본 곳은?',
    options: ['제주도', '일본', '강릉', '경주'],
    answerIndex: 2,
  },
  {
    id: 'q5',
    question: '율희가 제일 좋아하는 상황은?',
    options: ['가슴운동 했다며 만져보라는 최산', '날씨가 좋아서 산책하자는 박보검', '밥먹고 누워서 배긁으며 코파는 남유민', '손크기 재보자며 은근슬쩍 손잡는 송강'],
    answerIndex: 3,
  },
]
