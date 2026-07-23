import React, { useEffect, useRef, useState } from 'react';

const baseUrl = import.meta.env.BASE_URL;

const projects = [
  {
    number: '01',
    title: 'Aoi',
    subtitle: '일본 상용한자를 더 오래 기억하게 만드는 학습 제품',
    summary: '학습 경험 설계부터 iOS 앱, AI 문제 생성 서버와 운영 인프라까지 혼자 연결해 실제 스토어에 출시했습니다.',
    role: 'Product · iOS · Server · Design',
    stack: ['SwiftUI', 'Spring Boot', 'Gemini', 'Docker'],
    image: `${baseUrl}images/aoi.png`,
    href: 'https://apps.apple.com/kr/app/aoi-%EC%9D%BC%EB%B3%B8-%EC%83%81%EC%9A%A9%ED%95%9C%EC%9E%90-%ED%95%99%EC%8A%B5/id6554000732',
    shape: 'phone',
  },
  {
    number: '02',
    title: 'Art-Window',
    subtitle: '공간과 작품을 연결하는 AI 커머스 플랫폼',
    summary: '이미지 기반 작품 생성부터 저장, 주문과 결제까지 이어지는 복합적인 사용자 흐름을 팀과 함께 실제 서비스로 구현했습니다.',
    role: 'Team · Server · Commerce',
    stack: ['OAuth2', 'PayApp', 'OCI', 'Commerce'],
    image: `${baseUrl}images/artwindow.jpg`,
    href: 'https://www.art-window.com/',
    shape: 'landscape',
  },
  {
    number: '03',
    title: 'MY4CUT',
    subtitle: '친구들과 함께 쌓아가는 사진 아카이브',
    summary: '워크스페이스, 초대, 멤버십과 댓글 구조를 설계하고 협업형 사진 기록 서비스의 API와 도메인을 구현했습니다.',
    role: 'Team · API · Domain',
    stack: ['REST API', 'Swagger', 'Domain Design', 'Collaboration'],
    image: `${baseUrl}images/my4cut.png`,
    href: 'https://github.com/MY4CUT-BE/MY4CUT-BE',
    shape: 'phone',
  },
];

function usePageMotion() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateScroll = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--page-progress', String(window.scrollY / scrollable));
      root.style.setProperty('--page-y', `${window.scrollY}px`);
    };

    const updatePointer = (event) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.12 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id || 'intro');
      }),
      { rootMargin: '-42% 0px -42% 0px' },
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
    document.querySelectorAll('[data-section]').forEach((element) => sectionObserver.observe(element));

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    if (!reduceMotion) window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return activeSection;
}

function ProjectChapter({ project }) {
  const mediaRef = useRef(null);

  const moveMedia = (event) => {
    const media = mediaRef.current;
    if (!media) return;
    const bounds = media.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    media.style.setProperty('--media-x', x.toFixed(3));
    media.style.setProperty('--media-y', y.toFixed(3));
  };

  const resetMedia = () => {
    mediaRef.current?.style.setProperty('--media-x', '0');
    mediaRef.current?.style.setProperty('--media-y', '0');
  };

  return (
    <section className="e-project" id={`project-${project.number}`} data-section>
      <div className="e-project__sticky">
        <div className="e-project__copy" data-reveal>
          <div className="e-project__label">
            <span>PROJECT {project.number}</span>
            <span>{project.role}</span>
          </div>
          <h2>{project.title}</h2>
          <p className="e-project__subtitle">{project.subtitle}</p>
          <p className="e-project__summary">{project.summary}</p>
          <ul aria-label={`${project.title} 기술 스택`}>
            {project.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="e-text-link" href={project.href} target="_blank" rel="noreferrer">
            프로젝트 열기 <span aria-hidden="true">↗</span>
          </a>
        </div>

        <a
          ref={mediaRef}
          className={`e-project__media e-project__media--${project.shape}`}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          onPointerMove={moveMedia}
          onPointerLeave={resetMedia}
          aria-label={`${project.title} 프로젝트 열기`}
          data-reveal
        >
          <div className="e-project__crop">
            <img src={project.image} alt={`${project.title} 서비스 화면`} />
          </div>
          <span className="e-project__figure">FIG. {project.number}</span>
          <span className="e-project__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function EditorialApp() {
  const activeSection = usePageMotion();

  return (
    <div className="e-site">
      <div className="e-progress" aria-hidden="true"><span /></div>
      <div className="e-pointer-light" aria-hidden="true" />

      <header className="e-header">
        <a className="e-logo" href="#intro" aria-label="구현모 포트폴리오 처음으로">
          <strong>HM</strong>
          <span>구현모<br />Portfolio 2026</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#project-01">프로젝트</a>
          <a href={`${baseUrl}about.html`}>소개</a>
          <a href="mailto:hmoo4198@gmail.com">연락하기</a>
        </nav>
      </header>

      <aside className="e-index" aria-label="현재 섹션">
        <span>{activeSection === 'intro' ? '00' : activeSection.replace('project-', '')}</span>
        <div><i /></div>
        <small>{activeSection === 'intro' ? 'INTRO' : 'PROJECT'}</small>
      </aside>

      <main>
        <section className="e-hero" id="intro" data-section>
          <div className="e-hero__eyebrow" data-reveal>
            <span>Developer & Product Builder</span>
            <span>Seoul, Korea</span>
          </div>
          <h1 data-reveal>
            <span>아이디어를</span>
            <span>제품으로,</span>
            <span>제품을 <em>경험으로.</em></span>
          </h1>
          <div className="e-hero__bottom" data-reveal>
            <p>
              모바일 앱부터 서버, AI와 인프라까지 필요한 기술을 연결합니다.
              정해진 직무보다 문제를 실제로 해결하고 오래 사용할 수 있는 제품을 만드는 과정에 집중합니다.
            </p>
            <a href="#project-01">작업 보기 <span>↓</span></a>
          </div>
          <div className="e-hero__edition" aria-hidden="true">
            <span>SELECTED WORKS</span>
            <strong>03</strong>
            <small>2024—2026</small>
          </div>
        </section>

        <section className="e-statement" data-section>
          <p data-reveal>역할을 먼저 정하지 않습니다.</p>
          <h2 data-reveal>
            문제를 관찰하고,<br />
            필요한 기술을 고르고,<br />
            <span>작동하는 결과를 만듭니다.</span>
          </h2>
          <div className="e-statement__notes" data-reveal>
            <span>01 / 관찰</span>
            <span>02 / 구현</span>
            <span>03 / 연결</span>
            <span>04 / 개선</span>
          </div>
        </section>

        {projects.map((project) => <ProjectChapter project={project} key={project.number} />)}

        <section className="e-method" data-section>
          <div className="e-section-title" data-reveal>
            <span>HOW I WORK</span>
            <h2>작은 단서에서<br />제품의 구조를 찾습니다.</h2>
          </div>
          <div className="e-method__grid">
            {[
              ['01', '관찰', '사용자의 흐름과 불편을 먼저 살펴봅니다.'],
              ['02', '빠른 형태', '설명보다 먼저 만져볼 수 있는 형태를 만듭니다.'],
              ['03', '기술 연결', '화면, 서버, AI와 운영을 하나의 경험으로 엮습니다.'],
              ['04', '반복 개선', '측정하고 다시 설계하며 완성도를 높입니다.'],
            ].map(([number, title, text]) => (
              <article key={number} data-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="e-contact" data-section>
          <p data-reveal>새로운 문제와 아이디어를 기다립니다.</p>
          <a href="mailto:hmoo4198@gmail.com" data-reveal>
            함께 만들어볼까요?
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="e-footer">
        <span>© 2026 HYUNMO KOO</span>
        <a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href="#intro">맨 위로 ↑</a>
      </footer>
    </div>
  );
}

export default EditorialApp;
