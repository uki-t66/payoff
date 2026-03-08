window.openDeleteModal = function(uuid, name, amount) {
  document.getElementById('modal-expense-name').textContent = name;
  document.getElementById('modal-expense-amount').textContent = `¥${amount}`;
  document.getElementById('delete-form').action = `/fixed_expenses/${uuid}`;
  document.getElementById('delete-modal').classList.remove('hidden');
};

window.closeDeleteModal = function() {
  document.getElementById('delete-modal').classList.add('hidden');
};