# 🚨 배포 문제 해결 가이드

## 현재 문제
- ✅ `https://junghaesung79.github.io/` → 작동
- ❌ `https://junghaesung79.github.io/CAT_FAMILY/` → 404

## 해결 방법

### 시나리오 A: 레포지토리 이름이 `junghaesung79.github.io`인 경우

**이 경우 `/CAT_FAMILY/` 경로로는 배포할 수 없습니다.**

#### 옵션 1: 루트 도메인으로 배포 (권장)
1. `vite.config.ts`에서 `base: '/'`로 변경
2. 재빌드 및 배포
3. `https://junghaesung79.github.io/`에서 사용

#### 옵션 2: 별도 레포지토리 생성
1. 새로운 레포지토리 `CAT_FAMILY` 생성
2. 코드를 새 레포지토리로 이동
3. 프로젝트 페이지로 배포

---

### 시나리오 B: 레포지토리 이름이 `CAT_FAMILY`인 경우

**GitHub Pages 설정을 수정해야 합니다.**

#### 해결 단계:

1. **GitHub 저장소 설정 확인**
   - Settings → Pages
   - Source가 올바르게 설정되어 있는지 확인

2. **GitHub Actions 사용 (권장)**
   ```bash
   # Settings → Pages → Source를 "GitHub Actions"로 변경
   # 그 다음 코드 푸시
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push origin main
   ```

3. **수동 배포**
   ```bash
   npm run build
   # dist 폴더 내용을 gh-pages 브랜치에 푸시
   git subtree push --prefix dist origin gh-pages
   ```
   - Settings → Pages → Source를 `gh-pages` 브랜치로 설정

---

## 빠른 확인 방법

터미널에서 다음 명령어로 확인:

```bash
# 현재 레포지토리 이름 확인
git remote -v
```

또는 GitHub 웹사이트에서:
- 저장소 페이지 상단의 레포지토리 이름 확인

---

## 즉시 시도해볼 수 있는 방법

레포지토리 이름을 모르는 경우, 다음을 시도해보세요:

### 방법 1: GitHub Actions 재배포
1. GitHub 저장소 → Settings → Pages
2. Source를 **"GitHub Actions"**로 변경
3. Actions 탭에서 워크플로우가 실행되는지 확인

### 방법 2: gh-pages 브랜치 생성
```bash
npm run build
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```
그 다음 Settings → Pages → Source를 `gh-pages` 브랜치로 설정

---

## 확인 후 알려주세요

레포지토리 이름을 확인한 후 알려주시면, 정확한 해결책을 제시하겠습니다.

