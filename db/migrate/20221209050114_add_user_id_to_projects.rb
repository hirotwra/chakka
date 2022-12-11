class AddUserIdToProjects < ActiveRecord::Migration[6.1]
  def change
    add_reference :projects, :user, foreign_key: true, default: 3
  end
end
