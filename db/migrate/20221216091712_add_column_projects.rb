class AddColumnProjects < ActiveRecord::Migration[6.1]
  def up
    add_column :projects, :memo, :string
  end

  def down
    remove_column :projects, :memo, :string
  end
end
