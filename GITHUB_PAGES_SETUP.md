# 🔧 GitHub Pages 설정 가이드

## 현재 상황 분석

현재 다음과 같은 문제가 있습니다:
- ✅ `https://junghaesung79.github.io/` → 홈화면 표시 (작동)
- ❌ `https://junghaesung79.github.io/CAT_FAMILY/` → 404 에러

## 원인 파악

이 문제는 **레포지토리 이름**에 따라 해결 방법이 다릅니다.

---

## 시나리오 1: 레포지토리 이름이 `junghaesung79.github.io`인 경우

### 특징
- 이것은 **사용자 페이지(User Page)**입니다
- 루트 도메인(`https://junghaesung79.github.io/`)으로만 배포됩니다
- `/CAT_FAMILY/` 경로로는 배포할 수 없습니다

### 해결 방법
**옵션 A: 루트 도메인으로 배포 (권장)**
- `vite.config.ts`의 `base: '/'`로 변경
- 루트 도메인에서만 사용

**옵션 B: 별도 레포지토리 생성**
- 새로운 레포지토리 `CAT_FAMILY` 생성
- 그 레포지토리에서 프로젝트 페이지로 배포

---

## 시나리오 2: 레포지토리 이름이 `CAT_FAMILY`인 경우

### 특징
- 이것은 **프로젝트 페이지(Project Page)**입니다
- `https://junghaesung79.github.io/CAT_FAMILY/`로 배포되어야 합니다

### 현재 문제
GitHub Pages 설정이 잘못되었을 가능성이 높습니다.

### 해결 방법

#### 1. GitHub Pages 설정 확인
1. GitHub 저장소 → **Settings** → **Pages**
2. **Source** 확인:
   - **"Deploy from a branch"** 선택
   - **Branch**: `main` (또는 `gh-pages`)
   - **Folder**: `/ (root)` 또는 `/dist`

#### 2. GitHub Actions 사용 (권장)
1. Settings → Pages → Source를 **"GitHub Actions"**로 변경
2. 코드 푸시 시 자동 배포

#### 3. 수동 배포
1. `npm run build` 실행
2. `dist` 폴더 내용을 `gh-pages` 브랜치에 푸시:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```
3. Settings → Pages → Source를 `gh-pages` 브랜치로 설정

---

## 확인 사항 체크리스트

다음 정보를 확인해주세요:

- [ ] **레포지토리 이름**: GitHub 저장소의 실제 이름은 무엇인가요?
  - `junghaesung79.github.io` 인가요?
  - `CAT_FAMILY` 인가요?

- [ ] **GitHub Pages Source 설정**: Settings → Pages에서 무엇으로 설정되어 있나요?
  - `/ (root)`
  - `/dist`
  - `gh-pages` 브랜치
  - GitHub Actions

- [ ] **배포된 파일 위치**: GitHub 저장소에서 `dist` 폴더가 어디에 있나요?
  - `main` 브랜치의 루트에 있나요?
  - `gh-pages` 브랜치에 있나요?

---

## 빠른 해결 방법

### 방법 1: 레포지토리 이름 확인 후 설정 변경

레포지토리 이름에 따라 `vite.config.ts`를 수정:

**레포지토리 이름이 `junghaesung79.github.io`인 경우:**
```typescript
base: '/',
```

**레포지토리 이름이 `CAT_FAMILY`인 경우:**
```typescript
base: '/CAT_FAMILY/',
```

### 방법 2: GitHub Actions 재배포

1. `vite.config.ts` 확인 (base 경로)
2. 코드 푸시
3. Actions 탭에서 배포 확인

---

## 다음 단계

위의 체크리스트를 확인한 후, 레포지토리 이름을 알려주시면 정확한 해결책을 제시하겠습니다.

