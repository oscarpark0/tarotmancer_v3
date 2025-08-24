(function(){
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function createEl(tag, cls) { const el = document.createElement(tag); if (cls) el.className = cls; return el; }

  function initStarfield(options={}) {
    const opts = Object.assign({
      count: 220,
      color: '#ffffff',
      minSize: 0.6,
      maxSize: 2.2,
      zIndex: 0,
      container: document.body,
      parallax: true,
      layers: 3,
    }, options);

    const sky = createEl('div', 'starry-sky');
    sky.style.zIndex = String(opts.zIndex);
    sky.style.pointerEvents = 'none';
    sky.style.position = 'fixed';
    sky.style.inset = '0';
    sky.style.color = opts.color;

    const total = Math.max(20, opts.count);
    const perLayer = Math.floor(total / opts.layers);

    for (let l = 0; l < opts.layers; l++) {
      const layer = createEl('div', 'star-layer');
      layer.style.position = 'absolute';
      layer.style.inset = '0';
      layer.style.willChange = 'transform';
      layer.style.transform = `translateZ(0)`;
      layer.dataset.depth = (l+1).toString();

      for (let i = 0; i < perLayer; i++) {
        const star = createEl('div', 'star');
        const size = rand(opts.minSize, opts.maxSize);
        const x = rand(0, 100);
        const y = rand(0, 100);
        const twinkle = rand(2.2, 7.5); 
        const delay = rand(-5, 5); 
        star.style.width = star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--twinkle', `${twinkle}s`);
        star.style.setProperty('--delay', `${delay}s`);
        star.style.opacity = String(rand(0.4, 1));
        star.style.filter = `drop-shadow(0 0 ${size*2}px currentColor)`;
        layer.appendChild(star);
      }
      sky.appendChild(layer);
    }

    const parent = opts.container === document.body ? document.body : opts.container;
    parent.insertBefore(sky, parent.firstChild);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (opts.parallax && !mq.matches) {
      const handler = (e) => {
        const cx = window.innerWidth/2;
        const cy = window.innerHeight/2;
        const dx = (e.clientX - cx) / cx; 
        const dy = (e.clientY - cy) / cy;
        const layers = sky.querySelectorAll('.star-layer');
        layers.forEach((layer, idx) => {
          const depth = (idx+1);
          const amt = 1.5 * depth; 
          layer.style.transform = `translate(${(-dx*amt).toFixed(2)}px, ${(-dy*amt).toFixed(2)}px)`;
        });
      };
      window.addEventListener('mousemove', handler, { passive: true });
    }

    sky.reRoll = function reRoll() {
      const layers = sky.querySelectorAll('.star-layer');
      layers.forEach(layer => {
        layer.querySelectorAll('.star').forEach(star => {
          star.style.left = `${rand(0,100)}%`;
          star.style.top = `${rand(0,100)}%`;
          star.style.setProperty('--twinkle', `${rand(2.2,7.5)}s`);
          star.style.setProperty('--delay', `${rand(-5,5)}s`);
          star.style.opacity = String(rand(0.4, 1));
        });
      });
    };

    const rerollMs = Math.floor(rand(12000, 24000));
    const interval = setInterval(() => sky.reRoll(), rerollMs);
    sky.addEventListener('remove', () => clearInterval(interval));

    return sky;
  }

  function injectCSS(){
    if (document.getElementById('starfield-css')) return;
    const css = `
    .starry-sky { background: radial-gradient(120vh 120vh at 50% 120%, rgba(0,40,0,0.25), rgba(0,0,0,0) 60%) } 
    .starry-sky .star { position: absolute; border-radius: 50%; background: currentColor; animation-name: star-twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; 
      animation-duration: var(--twinkle, 5s);
      animation-delay: var(--delay, 0s);
      animation-duration: calc(var(--twinkle, 5s) + (random() - 0.5) * 1.5s);
      animation-delay: calc(var(--delay, 0s) + (random() - 0.5) * 5s);
    }
    @keyframes star-twinkle { 0%, 100% { transform: scale(1); filter: brightness(0.8); } 50% { transform: scale(1.2); filter: brightness(1.4); } }
    @media (prefers-reduced-motion: reduce) { .starry-sky .star { animation-duration: 0s !important; } }
    `;
    const styleEl = document.createElement('style');
    styleEl.id = 'starfield-css';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  window.initStarfield = function(opts){ injectCSS(); return initStarfield(opts); };
})();
