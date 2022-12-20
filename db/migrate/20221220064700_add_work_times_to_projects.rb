class AddWorkTimesToProjects < ActiveRecord::Migration[6.1]
  def up
    add_column :projects, :work_time, :integer, null: false, default: '0'
  end

  def down
    remove_column :projects, :work_time
  end
end
