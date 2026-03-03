class FixedExpense < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :name, presence: true
  validates :category_id, presence: true
  validates :fixed_cost_amount, presence: true, numericality: { greater_than: 0 }
  validates :payment_day, presence: true, numericality: { in: 1..31 }
end
