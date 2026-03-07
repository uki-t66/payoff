function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const content = document.getElementById('main-content');
  if (!sidebar) return;

  const isClosed = sidebar.classList.contains('sidebar-closed');
  if (isClosed) {
    sidebar.classList.remove('sidebar-closed');
    content?.classList.add('lg:pl-64');
    overlay?.classList.add('hidden');
  } else {
    sidebar.classList.add('sidebar-closed');
    content?.classList.remove('lg:pl-64');
    overlay?.classList.remove('hidden');
  }
}

window.toggleSidebar = toggleSidebar;