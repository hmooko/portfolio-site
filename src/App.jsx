import React from 'react';
import FlowerLogo from './components/FlowerLogo.jsx';

const baseUrl = import.meta.env.BASE_URL;

const projects = [
  {
    title: 'Aoi',
    subtitle: 'AI 일본어 한자 학습 서비스',
    role: 'Solo product · iOS, server & design',
    stack: ['Spring Boot', 'SwiftUI', 'Gemini API', 'Docker'],
    impact: '기획부터 App Store 출시, 결제 검증과 운영 인프라까지 직접 구축했습니다.',
    type: 'aoi',
    image: `${baseUrl}images/aoi.png`,
    href: 'https://apps.apple.com/kr/app/aoi-%EC%9D%BC%EB%B3%B8-%EC%83%81%EC%9A%A9%ED%95%9C%EC%9E%90-%ED%95%99%EC%8A%B5/id6554000732',
  },
  {
    title: 'Art-Window',
    subtitle: 'AI 공간 맞춤형 아트워크 커머스',
    role: 'Team project · Server & commerce',
    stack: ['Spring Boot', 'OAuth2', 'PayApp', 'OCI'],
    impact: '인증, 이미지 저장, 주문·결제·환불 흐름을 안정적으로 연결했습니다.',
    type: 'art',
    image: `${baseUrl}images/artwindow.jpg`,
    href: 'https://www.art-window.com/',
  },
  {
    title: 'MY4CUT',
    subtitle: '네컷 사진 아카이빙 플랫폼',
    role: 'Team project · API & domain',
    stack: ['Spring Boot', 'Swagger', 'REST API', 'Collaboration'],
    impact: '워크스페이스, 초대, 멤버십과 댓글 도메인을 설계하고 구현했습니다.',
    type: 'my4cut',
    image: `${baseUrl}images/my4cut.png`,
    href: 'https://github.com/MY4CUT-BE/MY4CUT-BE',
  },
];

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <nav className="nav-left" aria-label="주요 메뉴">
          <a href="#work">Work</a>
          <a href={`${baseUrl}about.html`}>About</a>
        </nav>
        <a className="center-logo" href="#home" aria-label="홈으로 이동"><FlowerLogo /></a>
        <a className="hello-button" href="mailto:hmoo4198@gmail.com">Say hey to Hyunmo</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-title">
            <p className="hero-eyebrow">Developer · Product builder</p>
            <h1>Hyunmo turns ideas into working products.</h1>
          </div>
          <div className="hero-description">
            <p>
              필요한 문제를 발견하고 모바일 앱, 서버, AI와 인프라를 연결해 실제 서비스로 완성합니다.
              정해진 역할보다 사용자에게 필요한 결과를 만들고 끝까지 운영하는 과정에 집중합니다.
            </p>
            <a href={`${baseUrl}about.html`}>프로젝트와 성장 과정 보기</a>
          </div>
          <div className="decor-flower flower-left"><FlowerLogo large /></div>
          <div className="decor-flower flower-right"><FlowerLogo dark large /></div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected projects</p>
              <h2>Featured work</h2>
            </div>
            <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">See all work</a>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <a
                className="project-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.title}
                aria-label={`${project.title} 프로젝트 자세히 보기`}
              >
                <div className={`preview image-preview ${project.type}-preview`}>
                  <img src={project.image} alt={`${project.title} 서비스 화면`} />
                </div>
                <div className="project-info">
                  <div>
                    <p className="project-role">{project.role}</p>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <ul className="project-stack" aria-label={`${project.title} 기술 스택`}>
                      {project.stack.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <p className="project-impact">{project.impact}</p>
                  </div>
                  <span className="arrow-button" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div>
            <h2>Ready to build something useful together?</h2>
          </div>
          <div>
            <p>
              아이디어를 실제 사용자가 만나는 서비스로 완성해 왔습니다. 낯선 기술과 제약 앞에서도 문제를 작게
              나누고, 상황에 맞는 도구와 역할을 선택해 끝까지 결과를 만들어냅니다.
            </p>
            <a href={`${baseUrl}about.html`}>전체 여정 보기</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-panel">
          <div className="footer-contact">
            <FlowerLogo dark />
            <p>
              Say hey at <a href="mailto:hmoo4198@gmail.com">hmoo4198@gmail.com</a><br />
              or view my work on <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GitHub</a>.
            </p>
          </div>
          <nav className="footer-nav" aria-label="하단 메뉴">
            <a href="#work">Work</a>
            <a href={`${baseUrl}about.html`}>About</a>
            <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;