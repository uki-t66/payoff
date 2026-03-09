function positionDropdown(trigger, dropdown) {
  const rect = trigger.getBoundingClientRect();
  dropdown.style.position = 'fixed';
  dropdown.style.top = `${rect.bottom + 4}px`;
  dropdown.style.left = `${rect.left}px`;
  dropdown.style.width = `${rect.width}px`;
  dropdown.style.zIndex = '9999';
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-custom-select]')) {
    document.querySelectorAll('[data-select-dropdown]').forEach(d => d.classList.add('hidden'));
    return;
  }

  const trigger = e.target.closest('[data-select-trigger]');
  if (trigger) {
    const container = trigger.closest('[data-custom-select]');
    const dropdown = container.querySelector('[data-select-dropdown]');
    document.querySelectorAll('[data-select-dropdown]').forEach(d => {
      if (d !== dropdown) d.classList.add('hidden');
    });

    if (container.hasAttribute('data-select-day')) {
      positionDropdown(trigger, dropdown);
    }

    dropdown.classList.toggle('hidden');
    return;
  }

  const option = e.target.closest('[data-select-option]');
  if (option) {
    const container = option.closest('[data-custom-select]');
    const input = container.querySelector('[data-select-input]');
    const label = container.querySelector('[data-select-label]');
    const dropdown = container.querySelector('[data-select-dropdown]');
    const value = option.dataset.selectOption;
    const text = option.dataset.selectText;

    input.value = value;
    label.textContent = text;

    if (value) {
      const btn = container.querySelector('[data-select-trigger]');
      btn.classList.remove('text-gray-400', 'dark:text-[#7d8590]');
      btn.classList.add('text-gray-900', 'dark:text-[#e6edf3]');
    }

    dropdown.classList.add('hidden');
    return;
  }
});

// スクロール・リサイズ時に位置を更新
document.addEventListener('scroll', () => {
  document.querySelectorAll('[data-select-dropdown]').forEach(d => {
    if (!d.classList.contains('hidden')) {
      const container = d.closest('[data-custom-select]');
      if (container?.hasAttribute('data-select-day')) {
        const trigger = container.querySelector('[data-select-trigger]');
        positionDropdown(trigger, d);
      }
    }
  });
}, true);