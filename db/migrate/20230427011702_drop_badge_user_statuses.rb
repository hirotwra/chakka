class DropBadgeUserStatuses < ActiveRecord::Migration[6.1]
  def change
    drop_table :badge_user_statuses
  end
end
