# Hyunmo Portfolio

Spring Boot 백엔드 개발자 구현모의 프로젝트와 성장 경험을 소개하는 포트폴리오 사이트입니다.

## Highlights

- 실제 출시·운영 중인 개인 프로젝트 Aoi
- 인증, 결제, AI 이미지와 커머스 도메인을 연결한 Art-Window
- 협업형 사진 아카이빙 서비스 MY4CUT
- 캐싱 전략 성능 비교 연구와 정량적 성과

## Tech stack

- React 19
- Vite 7
- CSS
- GitHub Actions

## Local development

Node.js 20 이상을 권장합니다.

```bash
npm ci
npm run dev
```

프로덕션 빌드는 다음 명령으로 확인합니다.

```bash
npm run build
npm run preview
```

## Project structure

```text
.
├── index.html
├── about.html
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── AboutPage.jsx
│   ├── main.jsx
│   ├── about-main.jsx
│   ├── styles.css
│   └── portfolio-enhancements.css
└── vite.config.js
```

## Pages

- `index.html`: 소개와 주요 프로젝트
- `about.html`: 활동, 프로젝트, 연구와 성장 과정

Vite의 멀티 페이지 빌드 설정을 사용하며 결과물은 `dist/`에 생성됩니다.

## Quality checks

Pull request와 `main` 브랜치 변경 시 GitHub Actions가 의존성을 설치하고 프로덕션 빌드를 검증합니다.

## Contact

사이트의 연락처 버튼 또는 [GitHub 프로필](https://github.com/hmooko)을 이용해 주세요.
