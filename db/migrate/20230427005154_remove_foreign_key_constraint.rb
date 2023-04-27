class RemoveForeignKeyConstraint < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :badge_user_statuses, :users
  end
end
