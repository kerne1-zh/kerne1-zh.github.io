// 尹子豪 · 个人作品集 —— 交互脚本
// 功能：滚动高亮当前导航 + 简单淡入动画（不改动任何视觉样式）

(function () {
  // ── 导航滚动高亮 ──────────────────────────
  const links = document.querySelectorAll('.nav-links a');
  const sections = ['home', 'works', 'skills', 'quests']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function highlight() {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec;
    }
    links.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }

  window.addEventListener('scroll', highlight, { passive: true });
  highlight();

  // ── 区块淡入（尊重系统减弱动效设置）──────
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.work-card, .skill-card, .quest-item');
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
  }
})();
