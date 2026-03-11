// app/javascript/category_form.js

// カテゴリ作成モーダルの制御

document.addEventListener('click', e => {

  // モーダルを開く
  if (e.target.closest('#open-category-modal')) {
    // ドロップダウンを閉じる
    document.querySelectorAll('[data-select-dropdown]').forEach(d => d.classList.add('hidden'));
    openCategoryModal();
    return;
  }

  // モーダルを閉じる（×・キャンセル・背景）
  if (
    e.target.closest('#close-category-modal') ||
    e.target.closest('#cancel-category-modal') ||
    e.target.id === 'category-modal-backdrop'
  ) {
    closeCategoryModal();
    return;
  }

  // カラースウォッチ選択
  const swatch = e.target.closest('.color-swatch');
  if (swatch) {
    selectColor(swatch.dataset.color);
    return;
  }

  // 作成ボタン
  if (e.target.closest('#save-category')) {
    saveCategory();
    return;
  }
});

function openCategoryModal() {
  const modal = document.getElementById('category-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('new-category-name')?.focus();
  // 最初のスウォッチを選択済みにする
  const firstSwatch = document.querySelector('.color-swatch');
  if (firstSwatch) selectColor(firstSwatch.dataset.color);
}

function closeCategoryModal() {
  const modal = document.getElementById('category-modal');
  if (!modal) return;
  modal.style.display = 'none';
  // フォームリセット
  const nameInput = document.getElementById('new-category-name');
  if (nameInput) nameInput.value = '';
  const err = document.getElementById('category-modal-error');
  if (err) { err.textContent = ''; err.classList.add('hidden'); }
}

function selectColor(color) {
  // 全スウォッチの選択解除
  document.querySelectorAll('.color-swatch').forEach(s => {
    s.style.borderColor = 'transparent';
    s.style.transform = 'scale(1)';
  });
  // 選択したスウォッチをハイライト
  const target = document.querySelector(`.color-swatch[data-color="${color}"]`);
  if (target) {
    target.style.borderColor = '#e6edf3';
    target.style.transform = 'scale(1.15)';
  }
  // hidden inputとプレビューを更新
  const colorInput = document.getElementById('new-category-color');
  if (colorInput) colorInput.value = color;
  const preview = document.getElementById('color-preview');
  if (preview) preview.style.backgroundColor = color;
  const previewText = document.getElementById('color-preview-text');
  if (previewText) previewText.textContent = color;
}

function saveCategory() {
  const name  = document.getElementById('new-category-name')?.value.trim();
  const color = document.getElementById('new-category-color')?.value || '#13daec';
  const err   = document.getElementById('category-modal-error');

  if (!name) {
    err.textContent = 'カテゴリ名を入力してください';
    err.classList.remove('hidden');
    return;
  }

  const saveBtn = document.getElementById('save-category');
  saveBtn.disabled = true;
  saveBtn.textContent = '作成中...';

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

  fetch('/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ category: { name, color } }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        err.textContent = data.errors.join('、');
        err.classList.remove('hidden');
        saveBtn.disabled = false;
        saveBtn.textContent = '作成する';
        return;
      }

      // ドロップダウンリストに追加
      const list = document.getElementById('category-dropdown-list');
      if (list) {
        const item = document.createElement('div');
        item.className = 'px-4 py-2.5 text-sm text-gray-900 dark:text-[#e6edf3] hover:bg-[#13daec]/10 hover:text-[#13daec] cursor-pointer transition-colors flex items-center gap-2';
        item.dataset.selectOption = data.id;
        item.dataset.selectText   = data.name;
        item.dataset.selectColor  = data.color;
        item.innerHTML = `<span class="w-3 h-3 rounded-full shrink-0" style="background-color:${data.color};"></span>${data.name}`;
        // 「カテゴリを選択」テキストの後に挿入
        list.appendChild(item);
      }

      // 作成したカテゴリを自動選択
      const input   = document.getElementById('category_id_input');
      const trigger = document.querySelector('#category-select-wrapper [data-select-trigger]');
      const label   = trigger?.querySelector('[data-select-label]');
      if (input)   input.value = data.id;
      if (label)   label.innerHTML = `<span class="w-3 h-3 rounded-full shrink-0" style="background-color:${data.color};"></span>${data.name}`;
      if (trigger) {
        trigger.classList.remove('text-gray-400', 'dark:text-slate-400');
        trigger.classList.add('text-gray-900', 'dark:text-[#e6edf3]');
      }

      closeCategoryModal();
    })
    .catch(() => {
      err.textContent = '通信エラーが発生しました';
      err.classList.remove('hidden');
      saveBtn.disabled = false;
      saveBtn.textContent = '作成する';
    });
}

// Enterキーで作成
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('category-modal')?.style.display === 'flex') {
    const focused = document.activeElement;
    if (focused?.id === 'new-category-name') {
      e.preventDefault();
      saveCategory();
    }
  }
});