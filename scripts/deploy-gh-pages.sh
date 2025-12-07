#!/bin/bash

# GitHub Pages 배포 스크립트
# 이 스크립트는 dist 폴더의 내용을 gh-pages 브랜치에 배포합니다

set -e

echo "🔨 빌드 시작..."
npm run build

echo "📦 dist 폴더 확인..."
if [ ! -d "dist" ]; then
  echo "❌ dist 폴더가 없습니다. 빌드를 먼저 실행하세요."
  exit 1
fi

echo "🌿 gh-pages 브랜치로 배포..."
cd dist

# .git 폴더가 없으면 초기화
if [ ! -d ".git" ]; then
  git init
  git checkout -b gh-pages
  git remote add origin $(cd .. && git remote get-url origin) 2>/dev/null || true
fi

git add .
git commit -m "Deploy to GitHub Pages" || echo "변경사항 없음"
git push -f origin gh-pages

echo "✅ 배포 완료!"
echo "📝 GitHub 저장소 → Settings → Pages → Source를 'gh-pages' 브랜치로 설정하세요."

