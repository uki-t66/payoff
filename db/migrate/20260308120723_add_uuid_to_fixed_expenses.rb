class AddUuidToFixedExpenses < ActiveRecord::Migration[7.2]
  def change
    add_column :fixed_expenses, :uuid, :string
    add_index :fixed_expenses, :uuid, unique: true
  end
end
