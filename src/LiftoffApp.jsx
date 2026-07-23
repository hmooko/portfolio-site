import React, { useEffect, useMemo, useRef, useState } from 'react';

const baseUrl = import.meta.env.BASE_URL;

const projects = [
  {
    id: 'aoi',
    number: '01',
    title: 'Aoi',
    label: 'Solo Product',
    headline: '배움을 제품으로\n완성했습니다.',
    description:
      '학습 경험 설계부터 iOS 앱, AI 문제 생성 서버와 운영 인프라까지 혼자 연결해 실제 스토어에 출시했습니다.',
    stack: ['SwiftUI', 'Spring Boot', 'Gemini', 'Docker'],
    image: `${baseUrl}images/aoi.png`,
    href: 'https://apps.apple.com/kr/app/aoi-%EC%9D%BC%EB%B3%B8-%EC%83%81%EC%9A%A9%ED%95%9C%EC%9E%90-%ED%95%99%EC%8A%B5/id6554000732',
    tone: 'coral',
    device: 'phone',
    metric: 'APP STORE',
    signal: 'LIVE',
  },
  {
    id: 'art-window',
    number: '02',
    title: 'Art-Window',
    label: 'Team Product',
    headline: '생성과 결제를\n하나의 흐름으로.',
    description:
      'AI 이미지 생성, 작품 저장, 주문과 결제까지 이어지는 복합적인 사용자 흐름을 팀과 함께 실제 서비스로 구현했습니다.',
    stack: ['OAuth2', 'PayApp', 'OCI', 'Commerce'],
    image: `${baseUrl}images/artwindow.jpg`,
    href: 'https://www.art-window.com/',
    tone: 'blue',
    device: 'desktop',
    metric: 'COMMERCE',
    signal: 'ONLINE',
  },
  {
    id: 'my4cut',
    number: '03',
    title: 'MY4CUT',
    label: 'Team Platform',
    headline: '관계를 기록하는\n도메인을 설계했습니다.',
    description:
      '워크스페이스, 초대, 멤버십과 댓글 구조를 설계하고 협업형 사진 기록 서비스의 API와 도메인을 구현했습니다.',
    stack: ['REST API', 'Swagger', 'Domain Design', 'Collaboration'],
    image: `${baseUrl}images/my4cut.png`,
    href: 'https://github.com/MY4CUT-BE/MY4CUT-BE',
    tone: 'violet',
    device: 'phone',
    metric: 'DOMAIN',
    signal: 'BUILT',
  },
];

function useSceneMotion() {
  const [activeProject, setActiveProject] = useState('aoi');

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--l-scroll', String(window.scrollY / max));
      root.style.setProperty('--l-scroll-px', `${window.scrollY}px`);
    };

    const updatePointer = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty('--l-pointer-x', `${event.clientX}px`);
      root.style.setProperty('--l-pointer-y', `${event.clientY}px`);
      root.style.setProperty('--l-pointer-nx', nx.toFixed(4));
      root.style.setProperty('--l-pointer-ny', ny.toFixed(4));
    };

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.14 },
    );

    const projectObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveProject(entry.target.dataset.project || 'aoi');
      }),
      { rootMargin: '-38% 0px -38% 0px' },
    );

    document.querySelectorAll('[data-l-reveal]').forEach((element) => revealObserver.observe(element));
    document.querySelectorAll('[data-project]').forEach((element) => projectObserver.observe(element));

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    if (!reduceMotion) window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      revealObserver.disconnect();
      projectObserver.disconnect();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return activeProject;
}

function MiniTerminal() {
  return (
    <div className="l-mini-terminal" aria-hidden="true">
      <header>
        <i />
        <i />
        <i />
        <span>product.log</span>
      </header>
      <p><b>01</b> observe user flow</p>
      <p><b>02</b> connect the layers</p>
      <p><b>03</b> ship working product</p>
      <div><span /></div>
    </div>
  );
}

function HeroInterface() {
  return (
    <div className="l-hero-interface" aria-hidden="true">
      <div className="l-orbit l-orbit--one"><i /><i /></div>
      <div className="l-orbit l-orbit--two"><i /></div>
      <div className="l-orbit l-orbit--three" />

      <div className="l-core">
        <span>HM</span>
        <small>PRODUCT<br />SYSTEM</small>
      </div>

      <MiniTerminal />

      <div className="l-float-card l-float-card--preview">
        <div className="l-float-card__bar">
          <span>PRODUCT PREVIEW</span>
          <i>●</i>
        </div>
        <div className="l-preview-body">
          <div>
            <small>ACTIVE BUILD</small>
            <strong>Aoi</strong>
            <p>Mobile · Server · AI</p>
          </div>
          <img src={`${baseUrl}images/aoi.png`} alt="" />
        </div>
      </div>

      <div className="l-float-card l-float-card--signal">
        <small>BUILD SIGNAL</small>
        <strong>98.7%</strong>
        <div className="l-signal-bars">
          {[32, 54, 42, 80, 62, 95, 72, 88].map((height, index) => (
            <i key={`${height}-${index}`} style={{ '--bar-height': `${height}%` }} />
          ))}
        </div>
      </div>

      <div className="l-float-pill l-float-pill--one">SWIFTUI / SPRING</div>
      <div className="l-float-pill l-float-pill--two">SEOUL · 37.56°N</div>
      <div className="l-float-pill l-float-pill--three">SYSTEM READY</div>
    </div>
  );
}

function ProjectWindow({ project }) {
  const windowRef = useRef(null);

  const handleMove = (event) => {
    const node = windowRef.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    node.style.setProperty('--window-rx', `${(-y * 5).toFixed(2)}deg`);
    node.style.setProperty('--window-ry', `${(x * 7).toFixed(2)}deg`);
    node.style.setProperty('--window-x', `${((x + 0.5) * 100).toFixed(1)}%`);
    node.style.setProperty('--window-y', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const reset = () => {
    const node = windowRef.current;
    if (!node) return;
    node.style.setProperty('--window-rx', '0deg');
    node.style.setProperty('--window-ry', '0deg');
    node.style.setProperty('--window-x', '50%');
    node.style.setProperty('--window-y', '50%');
  };

  return (
    <a
      ref={windowRef}
      className={`l-project-window l-project-window--${project.device}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      aria-label={`${project.title} 프로젝트 열기`}
      data-l-reveal
    >
      <div className="l-project-window__topbar">
        <div><i /><i /><i /></div>
        <span>{project.title.toLowerCase()}.product</span>
        <small>{project.signal}</small>
      </div>
      <div className="l-project-window__canvas">
        <div className="l-project-window__grid" />
        <div className="l-project-window__glow" />
        <div className="l-project-window__device">
          <img src={project.image} alt={`${project.title} 서비스 화면`} />
        </div>
        <span className="l-project-window__coordinate">X 128.40 / Y 032.11</span>
        <span className="l-project-window__badge">{project.metric}</span>
      </div>
    </a>
  );
}

function ProjectScene({ project, index }) {
  return (
    <section
      className={`l-project l-project--${project.tone}`}
      id={project.id}
      data-project={project.id}
    >
      <div className="l-project__sticky">
        <div className="l-project__copy" data-l-reveal>
          <div className="l-project__eyebrow">
            <span>{project.number}</span>
            <span>{project.label}</span>
          </div>
          <h2>
            {project.headline.split('\n').map((line) => <span key={line}>{line}</span>)}
          </h2>
          <p>{project.description}</p>
          <ul aria-label={`${project.title} 기술 스택`}>
            {project.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="l-project__link" href={project.href} target="_blank" rel="noreferrer">
            <span>{project.title} 자세히 보기</span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>

        <ProjectWindow project={project} />

        <div className="l-project__rail" aria-hidden="true">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i />
          <small>{String(projects.length).padStart(2, '0')}</small>
        </div>
      </div>
    </section>
  );
}

function RoleCard({ icon, title, text, index }) {
  return (
    <article className="l-role-card" data-l-reveal>
      <span className="l-role-card__index">0{index}</span>
      <div className="l-role-card__icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <i aria-hidden="true">↗</i>
    </article>
  );
}

function LiftoffApp() {
  const activeProject = useSceneMotion();
  const activeIndex = useMemo(
    () => Math.max(projects.findIndex((project) => project.id === activeProject), 0),
    [activeProject],
  );

  return (
    <div className="l-site">
      <div className="l-progress" aria-hidden="true"><span /></div>
      <div className="l-pointer-halo" aria-hidden="true" />

      <header className="l-header">
        <a className="l-brand" href="#top" aria-label="구현모 포트폴리오 처음으로">
          <span>HM</span>
          <small>PRODUCT<br />BUILDER</small>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#aoi">프로젝트</a>
          <a href={`${baseUrl}about.html`}>소개</a>
          <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <a className="l-header__cta" href="mailto:hmoo4198@gmail.com">함께 만들기 <span>↗</span></a>
      </header>

      <main>
        <section className="l-hero" id="top">
          <div className="l-hero__mesh" aria-hidden="true" />
          <div className="l-hero__copy">
            <p className="l-kicker" data-l-reveal>
              <i /> AVAILABLE FOR THE NEXT MISSION
            </p>
            <h1 data-l-reveal>
              <span>기술을 엮어</span>
              <span><em>제품을</em> 궤도에</span>
              <span>올립니다.</span>
            </h1>
            <div className="l-hero__bottom" data-l-reveal>
              <p>
                모바일 앱, 서버, AI와 인프라를 하나의 경험으로 연결합니다.
                역할보다 결과에 집중하고, 아이디어가 실제로 작동하는 순간까지 만듭니다.
              </p>
              <div>
                <a href="#aoi">프로젝트 탐색 <span>↓</span></a>
                <a href={`${baseUrl}about.html`}>소개 보기 <span>↗</span></a>
              </div>
            </div>
          </div>

          <HeroInterface />

          <div className="l-scroll-cue" aria-hidden="true">
            <span>SCROLL TO LAUNCH</span>
            <i />
          </div>
        </section>

        <section className="l-intro">
          <div className="l-intro__orbit" aria-hidden="true"><i /><i /></div>
          <div className="l-intro__copy" data-l-reveal>
            <span>01 / PRODUCT SYSTEM</span>
            <h2>하나의 화면 뒤에 있는<br />모든 층을 연결합니다.</h2>
            <p>
              좋은 제품은 인터페이스 하나로 끝나지 않습니다. 데이터 구조, 서버, 자동화,
              배포와 운영까지 자연스럽게 이어질 때 비로소 사용자의 경험이 됩니다.
            </p>
          </div>
          <div className="l-intro__diagram" data-l-reveal aria-label="제품 개발 영역">
            {['INTERFACE', 'DOMAIN', 'AI', 'INFRA'].map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
                <i />
              </div>
            ))}
            <em>HM</em>
          </div>
        </section>

        <section className="l-projects-header">
          <div data-l-reveal>
            <span>SELECTED PRODUCTS · 2024—2026</span>
            <h2>작동하는 결과로<br />증명한 프로젝트.</h2>
          </div>
          <p data-l-reveal>
            각 프로젝트는 서로 다른 문제에서 출발했지만, 사용자가 실제로 만나는 제품까지 완성했다는 공통점을 가집니다.
          </p>
          <div className="l-active-project" aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <i><b style={{ transform: `scaleX(${(activeIndex + 1) / projects.length})` }} /></i>
            <small>{String(projects.length).padStart(2, '0')}</small>
          </div>
        </section>

        {projects.map((project, index) => (
          <ProjectScene project={project} index={index} key={project.id} />
        ))}

        <section className="l-roles">
          <div className="l-section-heading" data-l-reveal>
            <span>BUILT ACROSS THE STACK</span>
            <h2>문제에 따라 역할을<br />자유롭게 바꿉니다.</h2>
          </div>
          <div className="l-role-grid">
            <RoleCard
              index={1}
              icon="⌘"
              title="Product"
              text="사용 흐름과 핵심 가치를 정의하고, 필요한 기능의 우선순위를 제품 관점에서 결정합니다."
            />
            <RoleCard
              index={2}
              icon="◇"
              title="Interface"
              text="모바일과 웹에서 정보가 자연스럽게 읽히고 조작되는 인터페이스를 설계하고 구현합니다."
            />
            <RoleCard
              index={3}
              icon="{ }"
              title="System"
              text="도메인과 API, AI 자동화와 배포 환경을 연결해 지속적으로 운영 가능한 구조를 만듭니다."
            />
          </div>
        </section>

        <section className="l-proof">
          <div className="l-proof__visual" data-l-reveal>
            <div className="l-proof__sphere" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="l-proof__panel">
              <header><span>PERFORMANCE REPORT</span><i>● VERIFIED</i></header>
              <div>
                <article><small>P95 LATENCY</small><strong>-68.6%</strong><span>optimized</span></article>
                <article><small>THROUGHPUT</small><strong>+88.2%</strong><span>improved</span></article>
              </div>
              <footer><span>KCC 2025</span><span>01 / 02</span></footer>
            </div>
          </div>
          <div className="l-proof__copy" data-l-reveal>
            <span>MEASURED IMPACT</span>
            <h2>감각뿐 아니라<br />수치로도 개선합니다.</h2>
            <p>
              구조를 바꾸고 성능을 측정하며, 결과가 실제로 나아졌는지 확인합니다.
              구현의 완성도는 눈에 보이는 화면과 보이지 않는 시스템 모두에서 만들어집니다.
            </p>
          </div>
        </section>

        <section className="l-contact">
          <div className="l-contact__stars" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
          </div>
          <p data-l-reveal>READY FOR THE NEXT LAUNCH</p>
          <h2 data-l-reveal>
            새로운 아이디어를<br />작동하는 제품으로.
          </h2>
          <a href="mailto:hmoo4198@gmail.com" data-l-reveal>
            함께 시작하기 <span>↗</span>
          </a>
          <div className="l-contact__planet" aria-hidden="true"><i /><i /></div>
        </section>
      </main>

      <footer className="l-footer">
        <a className="l-brand" href="#top">
          <span>HM</span>
          <small>HYUNMO KOO<br />PORTFOLIO 2026</small>
        </a>
        <div>
          <a href="mailto:hmoo4198@gmail.com">EMAIL ↗</a>
          <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="#top">TOP ↑</a>
        </div>
        <p>DESIGNED & BUILT BY HYUNMO KOO</p>
      </footer>
    </div>
  );
}

export default LiftoffApp;
