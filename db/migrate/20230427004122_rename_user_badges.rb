class RenameUserBadges < ActiveRecord::Migration[6.1]
  def change
    rename_table :user_badges, :badge_user_statuses
  end
end
