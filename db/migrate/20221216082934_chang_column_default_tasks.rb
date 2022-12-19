class ChangColumnDefaultTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tasks, :title, from: nil, to: "タスク"
  end
end
