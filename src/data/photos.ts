// ============================================
// 📸 Scene 2. 사진 갤러리에 들어갈 사진 데이터
// ============================================
// ✅ 사진 교체 방법
//   1) src/assets/photos/ 폴더에 원하는 사진 파일을 넣습니다.
//      (파일명은 자유롭게 지어도 됩니다. 예: our-trip-1.jpg)
//   2) 아래에서 import 구문을 새 파일명으로 수정합니다.
//   3) caption(사진 아래 설명 문구)도 자유롭게 바꿔주세요.
//   4) 사진 개수를 늘리거나 줄이고 싶다면, import 줄과 배열의
//      객체({ src, caption })를 통째로 추가/삭제하면 됩니다.

import gallery1 from '../assets/photos/gallery1.jpg'
import gallery2 from '../assets/photos/gallery2.jpg'
import gallery3 from '../assets/photos/gallery3.jpg'
import gallery4 from '../assets/photos/gallery4.jpg'
import gallery5 from '../assets/photos/gallery5.jpg'
import gallery6 from '../assets/photos/gallery6.jpg'

export interface GalleryPhoto {
  /** 사진 파일 (위에서 import 한 것을 그대로 연결) */
  src: string
  /** 사진 아래에 표시될 한 줄 설명 */
  caption: string
}

// 👇 여기에 사진을 넣고 순서를 바꿔주세요 (배열 순서 = 화면에 보여지는 순서)
export const galleryPhotos: GalleryPhoto[] = [
  { src: gallery1, caption: '여기에 사진 설명을 입력하세요 (1)' },
  { src: gallery2, caption: '여기에 사진 설명을 입력하세요 (2)' },
  { src: gallery3, caption: '여기에 사진 설명을 입력하세요 (3)' },
  { src: gallery4, caption: '처음으로 같이 간 부산 여행' },
  { src: gallery5, caption: '전역 기념 전주 여행' },
  { src: gallery6, caption: '여기에 사진 설명을 입력하세요 (6)' },
]
