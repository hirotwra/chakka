class AddColumnUserStatus < ActiveRecord::Migration[6.1]
  def change
    add_column :user_statuses, :next_level_exp, :integer, default: 100
  end
end
