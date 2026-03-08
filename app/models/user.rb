class User < ApplicationRecord
  has_secure_password

  has_many :categories, dependent: :destroy
  has_many :fixed_expenses, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :monthly_income, numericality: { greater_than: 0 }, allow_nil: true
end
