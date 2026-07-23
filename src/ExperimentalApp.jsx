import React, { useEffect, useRef } from 'react';
import './experimental-ko.css';

const baseUrl = import.meta.env.BASE_URL;

const projects = [
  {
    index: '01',
    title: 'Aoi',
    label: '독립 제품 개발',
    description: '일본 상용한자 학습 경험을 설계하고, iOS 앱부터 AI 문제 생성 서버와 운영 인프라까지 하나의 제품으로 연결했습니다.',
    stack: ['SwiftUI', 'Spring Boot', 'Gemini', 'Docker'],
    image: `${baseUrl}images/aoi.png`,
    href: 'https://apps.apple.com/kr/app/aoi-%EC%9D%BC%EB%B3%B8-%EC%83%81%EC%9A%A9%ED%95%9C%EC%9E%90-%ED%95%99%EC%8A%B5/id6554000732',
    accent: 'acid',
  },
  {
    index: '02',
    title: 'Art-Window',
    label: 'AI 아트 커머스',
    description: '공간 이미지에서 작품 생성, 저장, 주문과 결제까지 이어지는 복합적인 사용자 흐름을 실제 서비스로 구현했습니다.',
    stack: ['OAuth2', 'PayApp', 'OCI', 'Commerce'],
    image: `${baseUrl}images/artwindow.jpg`,
    href: 'https://www.art-window.com/',
    accent: 'violet',
  },
  {
    index: '03',
    title: 'MY4CUT',
    label: '협업형 사진 아카이브',
    description: '친구들과 사진을 공유하고 정리하는 협업형 아카이브의 워크스페이스, 초대, 멤버십과 댓글 구조를 설계했습니다.',
    stack: ['REST API', 'Swagger', 'Domain Design', 'Teamwork'],
    image: `${baseUrl}images/my4cut.png`,
    href: 'https://github.com/MY4CUT-BE/MY4CUT-BE',
    accent: 'cyan',
  },
];

function useInteractiveScene(canvasRef) {
  useEffect(() => {
    const root = document.documentElement;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let frameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerX = width * 0.5;
    let pointerY = height * 0.5;
    let smoothX = pointerX;
    let smoothY = pointerY;
    let particles = [];

    const makeParticles = () => {
      const count = width < 720 ? 34 : 76;
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: index % 11 === 0 ? 1.8 : Math.random() * 1.1 + 0.25,
        depth: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.16 + 0.04,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas && context) {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      makeParticles();
    };

    const updatePointer = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      root.style.setProperty('--pointer-x', `${pointerX}px`);
      root.style.setProperty('--pointer-y', `${pointerY}px`);
      root.style.setProperty('--pointer-x-n', `${pointerX / Math.max(width, 1) - 0.5}`);
      root.style.setProperty('--pointer-y-n', `${pointerY / Math.max(height, 1) - 0.5}`);
    };

    const updateScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--scroll-progress', `${window.scrollY / max}`);
      root.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    const render = () => {
      if (!context || !canvas) return;

      smoothX += (pointerX - smoothX) * 0.045;
      smoothY += (pointerY - smoothY) * 0.045;
      context.clearRect(0, 0, width, height);

      const offsetX = (smoothX / Math.max(width, 1) - 0.5) * 24;
      const offsetY = (smoothY / Math.max(height, 1) - 0.5) * 24;

      particles.forEach((particle) => {
        particle.y -= reduceMotion ? 0 : particle.speed;

        if (particle.y < -8) {
          particle.y = height + 8;
          particle.x = Math.random() * width;
        }

        context.beginPath();
        context.fillStyle = `rgba(214, 255, 81, ${0.16 + particle.depth * 0.4})`;
        context.arc(
          particle.x + offsetX * particle.depth,
          particle.y + offsetY * particle.depth,
          particle.radius,
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      frameId = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    resize();
    updateScroll();
    if (finePointer) window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', resize);
    frameId = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

function ProjectCard({ project }) {
  const handlePointerMove = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty('--card-x', `${x * 100}%`);
    card.style.setProperty('--card-y', `${y * 100}%`);
    card.style.setProperty('--card-rx', `${(0.5 - y) * 8}deg`);
    card.style.setProperty('--card-ry', `${(x - 0.5) * 10}deg`);
  };

  const resetPointer = (event) => {
    event.currentTarget.style.setProperty('--card-rx', '0deg');
    event.currentTarget.style.setProperty('--card-ry', '0deg');
  };

  return (
    <a
      className={`x-project x-project--${project.accent}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label={`${project.title} 프로젝트 열기`}
      data-reveal
    >
      <div className="x-project__index" aria-hidden="true">{project.index}</div>

      <div className="x-project__visual">
        <div className="x-project__beam" />
        <div className="x-project__frame">
          <img src={project.image} alt={`${project.title} 서비스 화면`} />
        </div>
        <div className="x-project__telemetry" aria-hidden="true">
          <span>LIVE MODULE</span>
          <span>0{project.index} / ACTIVE</span>
        </div>
      </div>

      <div className="x-project__copy">
        <p>{project.label}</p>
        <h3>{project.title}</h3>
        <div className="x-project__description">{project.description}</div>
        <ul>
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <span className="x-project__link">프로젝트 보기 <b>↗</b></span>
      </div>
    </a>
  );
}

function ExperimentalApp() {
  const canvasRef = useRef(null);
  useInteractiveScene(canvasRef);

  return (
    <div className="x-site">
      <canvas className="x-particle-field" ref={canvasRef} aria-hidden="true" />
      <div className="x-cursor" aria-hidden="true" />
      <div className="x-cursor-aura" aria-hidden="true" />
      <div className="x-progress" aria-hidden="true"><span /></div>

      <header className="x-header">
        <a className="x-brand" href="#top" aria-label="구현모 포트폴리오 홈">
          <span>HM</span>
          <small>제품 실험 / 2026</small>
        </a>

        <nav aria-label="주요 메뉴">
          <a href="#projects">프로젝트</a>
          <a href={`${baseUrl}about.html`}>기록</a>
          <a className="x-nav-cta" href="mailto:hmoo4198@gmail.com">연락하기 ↗</a>
        </nav>
      </header>

      <main>
        <section className="x-hero" id="top">
          <div className="x-hero__grid" aria-hidden="true" />

          <div className="x-hero__copy">
            <div className="x-status" data-reveal>
              <i />
              <span>새로운 아이디어를 기다리는 중</span>
              <b>SEOUL · 37.56° N</b>
            </div>

            <h1 data-reveal>
              <span>생각을</span>
              <span className="x-hero__outline">움직이는</span>
              <span>제품으로</span>
              <span className="x-hero__signal">만듭니다.</span>
            </h1>

            <div className="x-hero__bottom" data-reveal>
              <p>
                모바일, 서버, AI와 인터랙션을 하나의 경험으로 엮습니다.
                결과물뿐 아니라 결과물이 움직이는 방식까지 설계합니다.
              </p>

              <div className="x-hero__actions">
                <a href="#projects">프로젝트 살펴보기 <span>↓</span></a>
                <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>

          <div className="x-command" aria-hidden="true">
            <div className="x-command__orbit x-command__orbit--one" />
            <div className="x-command__orbit x-command__orbit--two" />

            <div className="x-command__core">
              <span>HM</span>
              <small>CREATIVE<br />SYSTEM</small>
            </div>

            <div className="x-float-panel x-float-panel--terminal">
              <header><i /><i /><i /><span>build.log</span></header>
              <p><b>01</b> idea → prototype</p>
              <p><b>02</b> prototype → product</p>
              <p><b>03</b> product → operation</p>
              <div><span /></div>
            </div>

            <div className="x-float-panel x-float-panel--signal">
              <span>INTERACTION SIGNAL</span>
              <strong>98.7</strong>
              <div className="x-wave"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>

            <div className="x-float-chip x-float-chip--one">AI / 04</div>
            <div className="x-float-chip x-float-chip--two">MOBILE / 01</div>
            <div className="x-float-chip x-float-chip--three">SYSTEM / 03</div>
          </div>

          <div className="x-scroll-note" aria-hidden="true">
            <span>SCROLL TO INITIALIZE</span>
            <i />
          </div>
        </section>

        <div className="x-marquee" aria-hidden="true">
          <div>
            <span>PRODUCT DESIGN</span><i>✦</i><span>MOBILE</span><i>✦</i><span>SERVER</span><i>✦</i>
            <span>AI SYSTEMS</span><i>✦</i><span>INTERACTION</span><i>✦</i><span>OPERATIONS</span><i>✦</i>
            <span>PRODUCT DESIGN</span><i>✦</i><span>MOBILE</span><i>✦</i><span>SERVER</span><i>✦</i>
          </div>
        </div>

        <section className="x-projects" id="projects">
          <div className="x-section-head" data-reveal>
            <div>
              <span>선택한 프로젝트 / 03</span>
              <h2>서로 다른 층을<br />하나의 제품으로.</h2>
            </div>

            <p>
              역할을 먼저 정하지 않습니다. 문제에 필요한 화면, API, 인프라와 운영 방식을 선택해
              실제 사용 가능한 결과로 연결합니다.
            </p>
          </div>

          <div className="x-project-list">
            {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
          </div>
        </section>

        <section className="x-manifesto">
          <div className="x-manifesto__halo" aria-hidden="true" />

          <div className="x-manifesto__label" data-reveal>
            <span>작업 원칙</span>
            <b>04 SIGNALS</b>
          </div>

          <div className="x-manifesto__statement" data-reveal>
            <p>정해진 역할보다 문제를 봅니다.</p>
            <h2>
              호기심으로 관찰하고,<br />
              <em>기술로 연결하고,</em><br />
              끝까지 실행합니다.
            </h2>
          </div>

          <div className="x-principles">
            {[
              ['01', '관찰', '사용자의 불편과 흐름을 먼저 관찰합니다.'],
              ['02', '빠른 구현', '설명보다 빠르게 움직이는 형태를 만듭니다.'],
              ['03', '연결', '화면과 서버, AI와 운영을 하나로 연결합니다.'],
              ['04', '개선', '측정하고 다시 설계하며 완성도를 끌어올립니다.'],
            ].map(([number, title, text]) => (
              <article key={number} data-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="x-contact" data-reveal>
          <div className="x-contact__meta">
            <span>다음 신호</span>
            <small>아이디어, 제품, 실험.</small>
          </div>

          <a href="mailto:hmoo4198@gmail.com">
            <span>함께</span>
            <strong>새로운 것을</strong>
            <em>만들어봅시다.</em>
            <i>↗</i>
          </a>
        </section>
      </main>

      <footer className="x-footer">
        <span>© 2026 구현모</span>
        <span>서울에서 디자인하고 개발했습니다</span>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </div>
  );
}

export default ExperimentalApp;
