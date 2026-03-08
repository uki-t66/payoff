function setupIncomeInput() {
  const input = document.getElementById('income-input');
  if (!input) return;

  input.addEventListener('input', () => {
    // 数字以外を除去
    const raw = input.value.replace(/[^0-9]/g, '');
    // カンマ区切りで表示
    input.value = raw ? Number(raw).toLocaleString('ja-JP') : '';
    // hidden inputに数値のみをセット
    document.getElementById('income-value').value = raw;
  });
}

document.addEventListener('DOMContentLoaded', setupIncomeInput);
document.addEventListener('turbo:load', setupIncomeInput);