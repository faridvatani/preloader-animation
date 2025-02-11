const loader = {
  element: document.querySelector('.loader'),
  counter: document.querySelector('#loader-counter'),
  items: document.querySelectorAll('.loader_item > h2'),
};

const header = {
  media: document.querySelector('.header_media'),
  mediaImage: document.querySelector('.header_media_image'),
  sideLines: document.querySelectorAll('.header_nav_side_line'),
};

const tl = gsap.timeline({ default: { duration: 1.2, ease: 'power4.inOut' } });
const isMobile = window.matchMedia('(max-width: 768px)').matches;

const initLoader = () => {
  gsap.set(loader.items, { yPercent: 100 });
  gsap.set(header.media, { width: '0%', scale: 0.16 });
  gsap.set(header.sideLines, { scaleY: 0 });

  gsap.set(header.sideLines[0], { x: '60rem' });
  gsap.set(header.sideLines[1], { x: '-60rem' });

  animateLoader();
};

const animateLoader = () => {
  tl.addLabel('init').to(loader.items, { yPercent: 0, duration: 0.5 });
  tl.addLabel('counter')
    .to(
      header.media,
      { width: '100%', onUpdate: onUpdate, duration: 2 },
      'counter'
    )
    .to(header.sideLines, { scaleY: 0.16, duration: 0.5 }, 'counter');

  tl.addLabel('scaling').to(header.media, { scale: 1, duration: 1 }, 'scaling');

  if (!isMobile) {
    tl.to(header.sideLines, { x: 0, scale: 1, duration: 1 }, 'scaling');
  } else {
    tl.to(header.sideLines, { autoAlpha: 0, duration: 1 }, 'scaling');
  }
};

function onUpdate() {
  let progress = this.progress();
  let percent = (progress * 100).toFixed();

  loader.counter.innerHTML = `${Math.round(percent)}`;

  if (progress === 1) {
    setTimeout(() => {
      destroyLoader();
    }, 100);
  }
}

function destroyLoader() {
  gsap.to(loader.items, {
    duration: 0.4,
    yPercent: -100,
    ease: 'expo.inOut',
    onComplete: () => loader.element.remove(),
  });
}

export default initLoader;
