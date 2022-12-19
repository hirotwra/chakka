class ChangColumnDefault < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :required_time, :integer
    remove_column :tasks, :description, :text
  end
end
