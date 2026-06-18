import React from 'react';
import FlowerLogo from './components/FlowerLogo.jsx';

const projects = [
  {
    title: 'Aoi',
    subtitle: 'AI 일본어 한자 학습 서비스',
    type: 'aoi',
    image: '/images/aoi.png',
    href: 'https://apps.apple.com/kr/app/aoi-%EC%9D%BC%EB%B3%B8-%EC%83%81%EC%9A%A9%ED%95%9C%EC%9E%90-%ED%95%99%EC%8A%B5/id6554000732',
  },
  {
    title: 'Art-Window',
    subtitle: 'AI 공간 맞춤형 아트워크 커머스',
    type: 'art',
    image: '/images/artwindow.jpg',
    href: 'https://www.art-window.com/',
  },
  {
    title: 'MY4CUT',
    subtitle: '네컷 사진 아카이빙 플랫폼',
    type: 'my4cut',
    image: '/images/my4cut.png',
    href: 'https://github.com/MY4CUT-BE/MY4CUT-BE',
  },
];

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <nav className="nav-left" aria-label="주요 메뉴">
          <a href="#work">Work</a>
          <a href="/about.html">About</a>
        </nav>
        <a className="center-logo" href="#home"><FlowerLogo /></a>
        <a className="hello-button" href="mailto:hmoo4198@gmail.com">Say hey to Hyunmo</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-title">
            <h1>Hyunmo builds reliable backend systems.</h1>
          </div>
          <div className="hero-description">
            <p>
              사용자에게 필요한 서비스를 직접 기획하고, Spring Boot로 인증·결제·AI·인프라를 연결합니다.
              앱 출시부터 운영까지 끝까지 책임지는 개발자입니다.
            </p>
            <a href="/about.html">더 알아보기</a>
          </div>
          <div className="decor-flower flower-left"><FlowerLogo large /></div>
          <div className="decor-flower flower-right"><FlowerLogo dark large /></div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <h2>Featured work</h2>
            <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">See all work</a>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <div className={`preview image-preview ${project.type}-preview`}>
                  <img src={project.image} alt={`${project.title} 서비스 화면`} />
                </div>
                <div className="project-info">
                  <div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
                  <span className="arrow-button" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div>
            <h2>Ready to build a service that people can trust?</h2>
          </div>
          <div>
            <p>
              아이디어를 실제 사용자가 만나는 서비스로 완성해 왔습니다. 낯선 기술과 제약 앞에서도 문제를 작게
              나누고, 오래 운영할 수 있는 해답을 끝까지 만들어냅니다.
            </p>
            <a href="/about.html">전체 여정 보기</a>
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
          <nav className="footer-nav">
            <a href="#work">Work</a>
            <a href="/about.html">About</a>
            <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
