class FixedExpense < ApplicationRecord
  belongs_to :user
  belongs_to :category
  before_create :generate_uuid

  validates :name, presence: true
  validates :fixed_cost_amount, presence: true, numericality: { greater_than: 0 }
  validates :payment_day, presence: true, numericality: { in: 1..31 }

  private

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
