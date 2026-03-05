function setupSidebar() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    if (isOpen) {
      sidebar.classList.add('-translate-x-full');
      overlay?.classList.add('hidden');
    } else {
      sidebar.classList.remove('-translate-x-full');
      overlay?.classList.remove('hidden');
    }
  });
}

document.addEventListener('turbo:load', setupSidebar);