class FixedExpense < ApplicationRecord
  belongs_to :user
  belongs_to :category
  before_create :generate_uuid

  validates :name, presence: true
  validates :fixed_cost_amount, presence: true, numericality: { greater_than: 0 }
  validates :payment_day, presence: true, numericality: { in: 1..31 }

  scope :upcoming_within, ->(days) {
  today = Date.today
  target_days = (0..days).map { |i| (today + i).day }.uniq

  where(payment_day: target_days, is_active: true)
    .includes(:category)
    .order(:payment_day)
}

  private

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
