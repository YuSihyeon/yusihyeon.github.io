(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll('[data-language]')];
  function setLanguage(lang) {
    const selected = lang === 'en' ? 'en' : 'ko';
    const sections = [...document.querySelectorAll('main section')];
    const anchor = sections.find(s => s.getBoundingClientRect().bottom > 0);
    const offset = anchor ? anchor.getBoundingClientRect().top : 0;
    root.dataset.lang = selected;
    root.lang = selected;
    document.querySelectorAll("[data-href-ko][data-href-en]").forEach(link => {
      link.href = selected === "en" ? link.dataset.hrefEn : link.dataset.hrefKo;
    });
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.language === selected)));
    try { localStorage.setItem('sihyeon-language', selected); } catch {}
    if (anchor && window.scrollY > 0) window.scrollBy({top:anchor.getBoundingClientRect().top-offset,behavior:'instant'});
  }
  buttons.forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.language)));
  let initial = 'ko';
  try { initial = localStorage.getItem('sihyeon-language') || 'ko'; } catch {}
  setLanguage(initial);
  const nav = [...document.querySelectorAll('nav a')];
  function updateActive() {
    let active = 'about';
    for (const a of nav) {
      const section = document.querySelector(a.getAttribute('href'));
      if (section && section.getBoundingClientRect().top <= 180) active = section.id;
    }
    nav.forEach(a => {
      const on = a.getAttribute('href') === '#' + active;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', updateActive, {passive:true});
  updateActive();
})();
