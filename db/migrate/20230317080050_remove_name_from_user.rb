class RemoveNameFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :name, :text
  end
end
