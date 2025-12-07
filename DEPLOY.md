# 🚀 배포 가이드

## 문제 해결 완료!

### 변경 사항
1. ✅ `vite.config.ts`의 `base` 경로를 `/CAT_FAMILY/`로 수정
2. ✅ GitHub Actions 워크플로우 생성 (자동 배포)

---

## 배포 방법 (2가지 중 선택)

### 방법 1: GitHub Actions 자동 배포 (권장) ⭐

1. **GitHub 저장소 설정**
   - Settings → Pages → Source를 **"GitHub Actions"**로 변경

2. **코드 푸시**
   ```bash
   git add .
   git commit -m "Fix base path for GitHub Pages"
   git push origin main
   ```

3. **자동 배포 확인**
   - Actions 탭에서 워크플로우 실행 확인
   - 완료되면 자동으로 배포됩니다

---

### 방법 2: 수동 배포

1. **로컬에서 재빌드**
   ```bash
   npm run build
   ```

2. **dist 폴더 내용 확인**
   - `dist/index.html`이 `/CAT_FAMILY/assets/...` 경로를 참조하는지 확인

3. **GitHub Pages 설정 변경**
   - Settings → Pages → Source를 **"/ (root)"**에서 **"/dist"**로 변경
   - 또는 `dist` 폴더 내용을 루트로 복사

4. **배포**
   - `dist` 폴더의 내용을 `gh-pages` 브랜치에 푸시하거나
   - `main` 브랜치의 `dist` 폴더를 서빙하도록 설정

---

## ✅ 확인 사항

배포 후 다음을 확인하세요:

1. **URL 접속**: `https://junghaesung79.github.io/CAT_FAMILY/`
2. **콘솔 확인**: 에러가 없는지 확인
3. **네트워크 탭**: `/CAT_FAMILY/assets/index-*.js` 파일이 정상 로드되는지 확인

---

## 🔧 문제가 계속되면

1. **브라우저 캐시 삭제**: Ctrl+Shift+R (또는 Cmd+Shift+R)
2. **GitHub Pages 캐시**: Settings → Pages에서 저장소 이름 변경 후 다시 원래대로
3. **빌드 파일 확인**: `dist` 폴더에 모든 파일이 있는지 확인

