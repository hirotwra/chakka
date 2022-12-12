class AddIsFinishedToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :is_finished, :boolean, default: false, null: false
  end
end
