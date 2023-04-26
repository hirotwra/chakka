class RenameColumnBadgesIdToBadgeSettings < ActiveRecord::Migration[6.1]
  def change
    rename_column :badge_settings, :badges_id, :badge_id
  end
end
