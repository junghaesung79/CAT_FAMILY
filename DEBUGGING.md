# 🔍 빈 화면 디버깅 가이드

## 1단계: 브라우저 개발자 도구 확인

### A. 콘솔(Console) 탭 확인
1. **F12** 또는 **우클릭 → 검사**로 개발자 도구 열기
2. **Console** 탭으로 이동
3. **빨간색 에러 메시지** 확인
   - 어떤 에러가 나타나나요? (에러 메시지 전체를 복사해주세요)
   
   GET https://junghaesung79.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)

### B. 네트워크(Network) 탭 확인
1. **Network** 탭으로 이동
2. 페이지 새로고침 (F5)
3. **빨간색으로 표시된 실패한 요청** 확인
   - 어떤 파일이 404 에러인가요?
   - 특히 `/assets/index-*.js` 파일이 로드되는지 확인
   - `/assets/index-*.css` 파일이 로드되는지 확인

   아무 요청 x

### C. Elements 탭 확인
1. **Elements** 탭에서 `<div id="root"></div>` 확인
2. `root` 요소 안에 내용이 있는지 확인
   - 비어있으면 → React가 렌더링되지 않음
   - 내용이 있으면 → CSS 문제일 수 있음

    <div id="root"></div>
    비어 있음

---

## 2단계: GitHub Pages URL 확인

### 현재 배포된 URL은 무엇인가요?
- `https://username.github.io/CAT_FAMILY/` (저장소 이름 포함)
- `https://username.github.io/` (루트 도메인)
- `https://custom-domain.com/` (커스텀 도메인)

**중요**: URL에 저장소 이름(`/CAT_FAMILY/`)이 포함되어 있다면, `vite.config.ts`의 `base` 설정을 변경해야 합니다!

https://junghaesung79.github.io/CAT_FAMILY/

---

## 3단계: GitHub Pages 설정 확인

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source** 확인
   - `/ (root)` 또는 `/docs` 또는 `/dist` 중 어떤 것으로 설정되어 있나요?

   / (root)
3. **Custom domain** 사용 여부 확인

x

---

## 4단계: 로컬에서 빌드 테스트

터미널에서 다음 명령어 실행:

```bash
npm run build
npm run preview
```

`http://localhost:4173`에서 정상 작동하는지 확인
- 로컬에서는 작동하지만 GitHub Pages에서는 안 되는 경우 → base 경로 문제
- 로컬에서도 안 되는 경우 → 빌드 문제

http://localhost:4173에서 정상 작동

---

## 5단계: 배포된 파일 확인

GitHub 저장소의 배포 브랜치(보통 `gh-pages` 또는 `main`의 `dist` 폴더)에서:

1. `index.html` 파일이 있는지 확인
2. `404.html` 파일이 있는지 확인
3. `assets/` 폴더에 JavaScript/CSS 파일이 있는지 확인
4. 파일 경로가 상대 경로인지 절대 경로인지 확인

---

## 📋 체크리스트 (답변해주세요)

다음 정보를 알려주시면 정확한 해결책을 제시할 수 있습니다:

- [ ] 콘솔에 나타나는 에러 메시지 (전체 복사)
- [ ] 네트워크 탭에서 실패한 파일 목록
- [ ] GitHub Pages URL (전체 주소)
- [ ] GitHub Pages Source 설정 (`/`, `/docs`, `/dist` 중 무엇?)
- [ ] 로컬 `npm run preview` 결과 (작동하는지 여부)
- [ ] 저장소 이름이 URL에 포함되는지 여부

---

## 🔧 가장 흔한 문제들

### 문제 1: Base 경로 불일치
**증상**: JavaScript 파일이 404 에러
**원인**: GitHub Pages URL에 저장소 이름이 포함되어 있는데 `base: '/'`로 설정됨
**해결**: `vite.config.ts`에서 `base: '/CAT_FAMILY/'`로 변경 후 재빌드

### 문제 2: 404.html 누락
**증상**: 직접 URL 접근 시 404, 새로고침 시 빈 화면
**원인**: GitHub Pages가 SPA 라우팅을 지원하지 않음
**해결**: `dist/404.html` 파일이 있는지 확인

### 문제 3: 빌드 파일 미배포
**증상**: 모든 파일이 404
**원인**: `dist` 폴더가 배포되지 않음
**해결**: GitHub Actions 또는 수동 배포 확인

