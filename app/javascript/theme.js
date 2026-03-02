function applyTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}

function setupToggle() {
  const btns = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile')
  ].filter(Boolean);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', !isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  });
}

applyTheme();
document.addEventListener('turbo:load', setupToggle);