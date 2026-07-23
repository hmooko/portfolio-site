import React, { useEffect, useRef, useState } from 'react';

const baseUrl = import.meta.env.BASE_URL;

const products = [
  {
    id: 'aoi',
    number: '01',
    label: 'Independent product',
    title: 'Aoi',
    headline: '외우는 시간을 줄이고, 기억하는 시간을 늘립니다.',
    description:
      '일본 상용한자 학습 흐름을 직접 설계하고 iOS 앱, AI 문제 생성 서버, 배포와 운영까지 하나의 제품으로 연결했습니다.',
    tags: ['SwiftUI', 'Spring Boot', 'Gemini', 'Docker'],
    image: `${baseUrl}images/aoi.png`,
    href: 'https://apps.apple.com/kr/app/aoi-%EC%9D%BC%EB%B3%B8-%EC%83%81%EC%9A%A9%ED%95%9C%EC%9E%90-%ED%95%99%EC%8A%B5/id6554000732',
    tone: 'coral',
    stat: '01',
    statLabel: '스토어 출시 제품',
  },
  {
    id: 'art-window',
    number: '02',
    label: 'AI commerce platform',
    title: 'Art-Window',
    headline: '생성된 이미지가 실제 주문으로 이어지는 경험.',
    description:
      'AI 작품 생성, 사용자 저장, 주문과 결제가 자연스럽게 이어지도록 서버와 커머스 흐름을 팀과 함께 구현했습니다.',
    tags: ['OAuth2', 'Commerce', 'OCI', 'Payment'],
    image: `${baseUrl}images/artwindow.jpg`,
    href: 'https://www.art-window.com/',
    tone: 'blue',
    stat: '04',
    statLabel: '핵심 도메인 연결',
  },
  {
    id: 'my4cut',
    number: '03',
    label: 'Collaborative archive',
    title: 'MY4CUT',
    headline: '사진을 올리는 순간이 함께 쌓이는 기록이 되도록.',
    description:
      '워크스페이스, 초대, 멤버십, 댓글과 피드 구조를 설계하고 협업형 사진 기록 서비스의 API를 구현했습니다.',
    tags: ['REST API', 'Swagger', 'Domain', 'Collaboration'],
    image: `${baseUrl}images/my4cut.png`,
    href: 'https://github.com/MY4CUT-BE/MY4CUT-BE',
    tone: 'lime',
    stat: '12+',
    statLabel: '주요 API 플로우',
  },
];

const roles = [
  {
    index: '01',
    title: '제품 설계자',
    eyebrow: 'Product builder',
    text: '문제를 기능 목록으로 바꾸기 전에 사용자의 행동과 제품이 남겨야 할 결과부터 정의합니다.',
    glyph: '◒',
  },
  {
    index: '02',
    title: '풀스택 구현자',
    eyebrow: 'Full-stack engineer',
    text: '화면, API, 데이터와 배포를 분리된 업무가 아니라 하나의 사용자 경험으로 연결합니다.',
    glyph: '⌘',
  },
  {
    index: '03',
    title: 'AI 경험 개발자',
    eyebrow: 'AI experience',
    text: '모델을 붙이는 것보다 사용자가 결과를 신뢰하고 반복해서 사용할 수 있는 흐름을 설계합니다.',
    glyph: '✦',
  },
];

const notes = [
  ['01', '작은 제품을 끝까지 운영하면서 배운 것', '좋은 구현은 출시 시점보다 수정하기 쉬운 구조에서 드러납니다.'],
  ['02', 'AI 기능을 제품 기능으로 만드는 기준', '정확도만큼 실패했을 때 사용자가 다음 행동을 이해할 수 있어야 합니다.'],
  ['03', '팀 프로젝트에서 서버가 해야 하는 일', 'API는 데이터를 전달하는 인터페이스이면서 팀의 합의를 고정하는 문서입니다.'],
];

function useSceneMotion() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateScroll = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--cr-progress', String(window.scrollY / scrollable));
      root.style.setProperty('--cr-scroll', `${window.scrollY}px`);
    };

    const updatePointer = (event) => {
      root.style.setProperty('--cr-pointer-x', `${event.clientX}px`);
      root.style.setProperty('--cr-pointer-y', `${event.clientY}px`);
      root.style.setProperty('--cr-pointer-nx', String(event.clientX / window.innerWidth - 0.5));
      root.style.setProperty('--cr-pointer-ny', String(event.clientY / window.innerHeight - 0.5));
    };

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.12 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id || 'hero');
      }),
      { rootMargin: '-42% 0px -42% 0px' },
    );

    document.querySelectorAll('[data-cr-reveal]').forEach((element) => revealObserver.observe(element));
    document.querySelectorAll('[data-cr-section]').forEach((element) => sectionObserver.observe(element));

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

  return { activeSection, menuOpen, setMenuOpen };
}

function ProductPreview({ product }) {
  const ref = useRef(null);

  const move = (event) => {
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    node.style.setProperty('--card-x', x.toFixed(3));
    node.style.setProperty('--card-y', y.toFixed(3));
  };

  const reset = () => {
    ref.current?.style.setProperty('--card-x', '0');
    ref.current?.style.setProperty('--card-y', '0');
  };

  return (
    <a
      ref={ref}
      className={`cr-product-window cr-product-window--${product.tone}`}
      href={product.href}
      target="_blank"
      rel="noreferrer"
      onPointerMove={move}
      onPointerLeave={reset}
      aria-label={`${product.title} 프로젝트 열기`}
      data-cr-reveal
    >
      <div className="cr-product-window__bar">
        <span><i /><i /><i /></span>
        <small>{product.title.toLowerCase()}.product</small>
        <b>↗</b>
      </div>
      <div className="cr-product-window__canvas">
        <div className="cr-product-window__grid" />
        <div className="cr-product-window__glow" />
        <img src={product.image} alt={`${product.title} 서비스 화면`} />
        <div className="cr-product-window__status">
          <span>LIVE PRODUCT</span>
          <strong>{product.number}</strong>
        </div>
      </div>
    </a>
  );
}

function HeroStage() {
  return (
    <div className="cr-hero-stage" aria-hidden="true">
      <div className="cr-orbit cr-orbit--one"><i /><i /></div>
      <div className="cr-orbit cr-orbit--two"><i /></div>
      <div className="cr-core"><span>HM</span><small>PRODUCT SYSTEM</small></div>

      <div className="cr-float cr-float--terminal">
        <header><span><i /><i /><i /></span><small>build.log</small></header>
        <p><b>01</b> observe the problem</p>
        <p><b>02</b> connect the system</p>
        <p><b>03</b> ship the product</p>
        <div><span /></div>
      </div>

      <div className="cr-float cr-float--preview">
        <header><span>PRODUCT VIEW</span><b>↗</b></header>
        <div><img src={`${baseUrl}images/aoi.png`} alt="" /></div>
        <footer><span>Aoi</span><small>iOS · AI · SERVER</small></footer>
      </div>

      <div className="cr-float cr-float--signal">
        <small>SYSTEM SIGNAL</small>
        <strong>98.4</strong>
        <div>{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
      </div>

      <span className="cr-chip cr-chip--one">REAL USERS / 2026</span>
      <span className="cr-chip cr-chip--two">PRODUCT · CODE · OPERATION</span>
      <span className="cr-chip cr-chip--three">SEOUL 37.5665° N</span>
    </div>
  );
}

function CleanroomApp() {
  const { activeSection, menuOpen, setMenuOpen } = useSceneMotion();

  return (
    <div className="cr-site">
      <div className="cr-progress" aria-hidden="true"><span /></div>
      <div className="cr-pointer-light" aria-hidden="true" />

      <header className="cr-header">
        <a className="cr-brand" href="#hero" aria-label="구현모 포트폴리오 처음으로">
          <span>HM</span>
          <small>Product builder<br />Seoul, Korea</small>
        </a>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="주요 메뉴">
          <a href="#platform" onClick={() => setMenuOpen(false)}>소개</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>프로젝트</a>
          <a href="#roles" onClick={() => setMenuOpen(false)}>역할</a>
          <a href="#contact" className="cr-nav-cta" onClick={() => setMenuOpen(false)}>연락하기 ↗</a>
        </nav>
        <button className="cr-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="메뉴 열기">
          <span /><span />
        </button>
      </header>

      <aside className="cr-side-index" aria-label="현재 섹션">
        <span>{activeSection.startsWith('product-') ? activeSection.replace('product-', '0') : '00'}</span>
        <i><b /></i>
        <small>{activeSection.replace('-', ' ')}</small>
      </aside>

      <main>
        <section className="cr-hero" id="hero" data-cr-section>
          <div className="cr-hero__noise" />
          <div className="cr-hero__copy">
            <div className="cr-kicker" data-cr-reveal>
              <span>BUILD BEYOND THE OBVIOUS</span>
              <span>PORTFOLIO / 2026</span>
            </div>
            <h1 data-cr-reveal>
              <span>기술을 엮어</span>
              <span>제품을</span>
              <span><em>궤도에</em> 올립니다.</span>
            </h1>
            <div className="cr-hero__bottom" data-cr-reveal>
              <p>
                모바일 앱, 서버, AI와 운영 환경을 하나의 경험으로 연결합니다.
                역할의 경계를 넘나들며 아이디어가 실제 사용자에게 닿는 순간까지 만듭니다.
              </p>
              <div>
                <a href="#products" className="cr-button cr-button--dark">프로젝트 보기 <span>↓</span></a>
                <a href="mailto:hmoo4198@gmail.com" className="cr-button">함께 만들기 <span>↗</span></a>
              </div>
            </div>
          </div>
          <HeroStage />
          <a className="cr-play" href="#platform" data-cr-reveal><i>▶</i><span>작업 방식 보기</span></a>
        </section>

        <section className="cr-platform" id="platform" data-cr-section>
          <div className="cr-platform__heading" data-cr-reveal>
            <span>ONE CONNECTED SYSTEM</span>
            <h2>아이디어가 제품이 되기까지<br /><em>모든 층을 연결합니다.</em></h2>
          </div>
          <div className="cr-platform__stage" data-cr-reveal>
            <div className="cr-platform__rail">
              {['DISCOVER', 'DESIGN', 'BUILD', 'SHIP', 'LEARN'].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
              ))}
            </div>
            <div className="cr-platform__screen">
              <header><span>HM / PRODUCT WORKSPACE</span><small>LIVE</small></header>
              <div className="cr-platform__layout">
                <aside>
                  <b>PROJECTS</b>
                  <span className="is-active">Aoi launch</span>
                  <span>Commerce flow</span>
                  <span>Archive API</span>
                  <span>Infrastructure</span>
                </aside>
                <div className="cr-platform__editor">
                  <div className="cr-platform__code">
                    <span><i>01</i>const product = observe(problem);</span>
                    <span><i>02</i>const system = connect(interface, server, ai);</span>
                    <span><i>03</i>const result = ship(product, system);</span>
                    <span><i>04</i>measure(result);</span>
                    <span><i>05</i>iterate();</span>
                  </div>
                  <div className="cr-platform__result">
                    <small>RUNNING PRODUCT</small>
                    <strong>사용자가 만나는<br />결과까지.</strong>
                    <div><span>APP</span><span>API</span><span>AI</span><span>OPS</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cr-products" id="products" data-cr-section>
          <div className="cr-section-heading" data-cr-reveal>
            <span>SELECTED PRODUCTS</span>
            <h2>실제로 작동하고,<br />사용되는 것들.</h2>
            <p>아이디어를 설명하는 데서 멈추지 않고 스토어, 서비스와 저장소에 남은 결과를 소개합니다.</p>
          </div>

          {products.map((product) => (
            <article className={`cr-product cr-product--${product.tone}`} id={`product-${product.number.replace('0', '')}`} data-cr-section key={product.id}>
              <div className="cr-product__sticky">
                <div className="cr-product__copy" data-cr-reveal>
                  <div className="cr-product__eyebrow"><span>{product.number}</span><small>{product.label}</small></div>
                  <h3>{product.title}</h3>
                  <h4>{product.headline}</h4>
                  <p>{product.description}</p>
                  <ul>{product.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <a href={product.href} target="_blank" rel="noreferrer">프로젝트 열기 <span>↗</span></a>
                </div>
                <ProductPreview product={product} />
                <div className="cr-product__stat" data-cr-reveal>
                  <strong>{product.stat}</strong><span>{product.statLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="cr-roles" id="roles" data-cr-section>
          <div className="cr-section-heading cr-section-heading--light" data-cr-reveal>
            <span>BUILT FOR REAL PROBLEMS</span>
            <h2>하나의 직무보다<br />필요한 역할을 선택합니다.</h2>
          </div>
          <div className="cr-role-grid">
            {roles.map((role) => (
              <article key={role.index} data-cr-reveal>
                <div><span>{role.index}</span><i>{role.glyph}</i></div>
                <small>{role.eyebrow}</small>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
                <a href="#contact">이 역할과 이야기하기 ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="cr-proof" data-cr-section>
          <div className="cr-proof__copy" data-cr-reveal>
            <span>VERIFICATION OVER DECORATION</span>
            <h2>예쁜 화면보다<br />확인 가능한 결과를.</h2>
            <p>성능, 실패 처리, 운영과 유지보수까지 제품의 일부로 다룹니다. 구현 이후의 상태를 측정하고 다음 개선으로 연결합니다.</p>
          </div>
          <div className="cr-proof__dashboard" data-cr-reveal>
            <header><span>PRODUCT HEALTH</span><small>LAST CHECK / NOW</small></header>
            <div className="cr-proof__metrics">
              <article><span>DELIVERY</span><strong>3</strong><small>shipped products</small></article>
              <article><span>STACK</span><strong>4L</strong><small>interface to ops</small></article>
              <article><span>STATUS</span><strong>LIVE</strong><small>continuous learning</small></article>
            </div>
            <div className="cr-proof__graph">
              {Array.from({ length: 28 }, (_, index) => <i key={index} style={{ '--height': `${18 + ((index * 37) % 76)}%` }} />)}
            </div>
            <footer><span>OBSERVE</span><span>BUILD</span><span>VERIFY</span><span>ITERATE</span></footer>
          </div>
        </section>

        <section className="cr-notes" data-cr-section>
          <div className="cr-notes__header" data-cr-reveal>
            <span>FIELD NOTES</span>
            <h2>만들면서<br />배운 것들.</h2>
          </div>
          <div className="cr-notes__list">
            {notes.map(([index, title, text]) => (
              <article key={index} data-cr-reveal>
                <span>{index}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <i>↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="cr-contact" id="contact" data-cr-section>
          <div className="cr-contact__orb" aria-hidden="true"><span>HM</span></div>
          <div className="cr-contact__copy" data-cr-reveal>
            <span>NEXT MISSION</span>
            <h2>다음 제품을<br />함께 궤도에<br />올려볼까요?</h2>
            <p>새로운 문제, 제품 아이디어, 팀의 기술 과제를 편하게 보내주세요.</p>
            <a href="mailto:hmoo4198@gmail.com">대화 시작하기 <span>↗</span></a>
          </div>
        </section>
      </main>

      <footer className="cr-footer">
        <a className="cr-brand" href="#hero"><span>HM</span><small>Product builder<br />Seoul, Korea</small></a>
        <div><a href="https://github.com/hmooko" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:hmoo4198@gmail.com">Email ↗</a></div>
        <span>© 2026 HYUNMO KOO</span>
      </footer>
    </div>
  );
}

export default CleanroomApp;
