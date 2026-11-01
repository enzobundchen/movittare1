const raiz = document.documentElement;

if (window.gsap && window.ScrollTrigger && window.SplitText) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out' });

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    animarHero();
    animarSecoes();
    animarNumeros();
    raiz.classList.remove('com-animacao');
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
} else {
  raiz.classList.remove('com-animacao');
}

function animarHero() {
  SplitText.create('.hero h1', {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (texto) => gsap.from(texto.lines, { yPercent: 105, duration: 1, stagger: .12, delay: .1 }),
  });

  gsap.timeline()
    .from('.hero .selo', { opacity: 0, y: 12, duration: .7 }, 0)
    .from('.hero__lead, .hero .acoes', { opacity: 0, y: 20, duration: .8, stagger: .12 }, .6)
    .from('.hero__foto', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut', clearProps: 'clipPath' }, 0)
    .from('.hero__foto img', { scale: 1.12, duration: 1.7, clearProps: 'transform' }, 0);
}

function animarSecoes() {
  const itens = [
    '.clinica__foto', '.clinica__txt > :not(.fatos)', '.fatos li',
    '.cabeca > *', '.trat__linha > img', '.trat__linha h3', '.lista > div', '.trat__painel h3',
    '.equipe__topo > img', '.pessoas li',
    '.local__info > *', '.local__mapa', '.chamada > *',
  ].join(', ');

  gsap.set(itens, { opacity: 0, y: 24 });
  ScrollTrigger.batch(itens, {
    start: 'top 90%',
    once: true,
    onEnter: (lote) => gsap.to(lote, { opacity: 1, y: 0, duration: .8, stagger: .08, clearProps: 'opacity,transform' }),
  });
}

function animarNumeros() {
  document.querySelectorAll('.fatos strong').forEach((numero) => {
    const [, prefixo, valor] = numero.textContent.match(/^(\D*)(\d+)$/);
    if (Number(valor) < 2) return;

    const contador = { valor: 0 };
    gsap.to(contador, {
      valor: Number(valor),
      duration: 1.4,
      ease: 'power2.out',
      snap: { valor: 1 },
      onUpdate: () => { numero.textContent = prefixo + contador.valor; },
      scrollTrigger: { trigger: '.fatos', start: 'top 90%', once: true },
    });
  });
}
