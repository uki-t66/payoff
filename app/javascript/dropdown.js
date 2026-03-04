function setupDropdown() {
  const button = document.getElementById('user-menu-button');
  const dropdown = document.getElementById('user-menu-dropdown');

  if (!button || !dropdown) return;

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');
    dropdown.classList.toggle('hidden', !isHidden);
    button.setAttribute('aria-expanded', isHidden);
  });

  // エリア外クリックで閉じる
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    button.setAttribute('aria-expanded', false);
  });
}

document.addEventListener('turbo:load', setupDropdown);