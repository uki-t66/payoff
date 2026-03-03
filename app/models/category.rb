class Category < ApplicationRecord
  belongs_to :user, optional: true

  validates :name, presence: true

  scope :preset, -> { where(is_preset: true) }
  scope :available_for, ->(user) { where(is_preset: true).or(where(user_id: user.id)) }
end
