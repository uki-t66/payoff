// app/javascript/sidebar.js

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[aria-label="メニュー"]');
  if (!btn) return;

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;

  const isClosed = sidebar.classList.contains('sidebar-closed');
  if (isClosed) {
    sidebar.classList.remove('sidebar-closed');
    overlay?.classList.add('hidden');
  } else {
    sidebar.classList.add('sidebar-closed');
    overlay?.classList.remove('hidden');
  }
});