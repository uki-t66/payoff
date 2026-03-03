class User < ApplicationRecord
  has_secure_password

  has_many :categories, dependent: :destroy
  has_many :fixed_expenses, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
