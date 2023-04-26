class RenameColumnToBadgeSettings < ActiveRecord::Migration[6.1]
  def change
    rename_column :badge_settings, :condition_type, :type
    rename_column :badge_settings, :condition_value, :value
  end
end
