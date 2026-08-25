import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // ⚠️ GitHub Pages 배포용 설정 — 반드시 실제 저장소 이름으로 수정하세요!
  // 예) 저장소 주소가 https://github.com/username/my-repo 라면
  //     아래 값을 '/my-repo/' 로 바꿔야 합니다. (앞뒤 슬래시 필수)
  // 저장소 이름을 바꾸지 않고 그대로 배포하면 GitHub Pages에서
  // 이미지/스크립트가 로드되지 않고 흰 화면만 나옵니다.
  base: '/yhbd/',
  plugins: [react(), tailwindcss()],
})
