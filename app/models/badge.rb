class Badge < ApplicationRecord
  has_one :badge_settings, dependent: :destroy
  has_many :user_badges
  has_many :users, through: :user_badges
end
