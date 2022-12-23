class RemoveActiveFromProjects < ActiveRecord::Migration[6.1]
  def change
    remove_column :projects, :active, :boolean
  end
end
