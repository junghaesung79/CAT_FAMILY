import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base 경로 설정
  // URL이 https://junghaesung79.github.io/CAT_FAMILY/ 이므로 base 경로 설정 필요
  base: '/CAT_FAMILY/',
})

