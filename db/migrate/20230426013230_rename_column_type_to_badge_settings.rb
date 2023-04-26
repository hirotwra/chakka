class RenameColumnTypeToBadgeSettings < ActiveRecord::Migration[6.1]
  def change
    rename_column :badge_settings, :type, :check_point
  end
end
