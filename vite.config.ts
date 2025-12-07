import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base 경로 설정
  // 저장소 이름이 'CAT_FAMILY'인 경우 '/CAT_FAMILY/'로 설정
  // 루트 도메인에 배포하는 경우 '/'로 설정 (기본값)
  base: '/',
})

