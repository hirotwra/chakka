class RemoveMemoFromProjects < ActiveRecord::Migration[6.1]
  def up
    remove_column :projects, :memo
  end

  def down
    add_column :projects, :memo, :string
  end
end
