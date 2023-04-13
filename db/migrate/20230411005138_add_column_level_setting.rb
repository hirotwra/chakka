class AddColumnLevelSetting < ActiveRecord::Migration[6.1]
  def change
    add_column :level_settings, :next_exp, :integer, default: 0
  end
end
