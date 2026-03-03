class CreateCategories < ActiveRecord::Migration[7.2]
  def change
    create_table :categories do |t|
      t.integer :user_id
      t.string :name, null: false
      t.string :color
      t.boolean :is_preset, null: false, default: false

      t.timestamps
    end
    add_index :categories, :user_id
  end
end
