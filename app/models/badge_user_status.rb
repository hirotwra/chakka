class BadgeUserStatuses < ApplicationRecord
  belongs_to :user_status
  belongs_to :badge
end
