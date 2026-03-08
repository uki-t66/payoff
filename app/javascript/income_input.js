// app/javascript/income_input.js

function setupIncomeInput(inputId, valueId) {
  const input = document.getElementById(inputId);
  const hidden = document.getElementById(valueId);
  if (!input || !hidden) return;

  input.addEventListener('input', () => {
    const raw = input.value.replace(/[^0-9]/g, '');
    input.value = raw ? Number(raw).toLocaleString('ja-JP') : '';
    hidden.value = raw;
  });
}

function setupAllIncomeInputs() {
  setupIncomeInput('income-input', 'income-value');
  setupIncomeInput('income-input-settings', 'income-value-settings');
}

document.addEventListener('DOMContentLoaded', setupAllIncomeInputs);
document.addEventListener('turbo:load', setupAllIncomeInputs);