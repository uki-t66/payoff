class CreateFixedExpenses < ActiveRecord::Migration[7.2]
  def change
    create_table :fixed_expenses do |t|
      t.integer :user_id, null: false
      t.integer :category_id, null: false
      t.string :name, null: false
      t.integer :fixed_cost_amount, null: false
      t.integer :payment_day, null: false
      t.boolean :is_active, null: false, default: true

      t.timestamps
    end

    add_index :fixed_expenses, :user_id
    add_index :fixed_expenses, :category_id
  end
end
