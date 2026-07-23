# Hyunmo Portfolio

문제를 발견하고 모바일 앱, 서버, AI와 인프라를 연결해 실제 제품으로 만들어 온 구현모의 포트폴리오 사이트입니다.

특정 직무나 기술 하나보다, 사용자에게 필요한 결과를 만들기 위해 상황에 맞는 역할과 도구를 선택해 온 과정을 보여주는 데 초점을 맞췄습니다.

## Highlights

- 기획부터 디자인, 개발, 출시와 운영까지 직접 진행한 개인 프로젝트 Aoi
- 인증, 결제, AI 이미지와 커머스 흐름을 연결한 Art-Window
- 여러 직군과 API 명세를 기반으로 협업한 MY4CUT
- 캐싱 전략을 실험하고 성능을 정량적으로 비교한 연구 경험

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