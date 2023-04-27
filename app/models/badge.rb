class Badge < ApplicationRecord
  has_one :badge_settings, dependent: :destroy
  has_many :badge_user_statuses
  has_many :user_statuses, through: :badge_user_statuses
end
