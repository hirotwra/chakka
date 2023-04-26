class ChangeBadgeConditionsToBadgeSettings < ActiveRecord::Migration[6.1]
  def change
    rename_table :badge_conditions, :badge_settings
  end
end
