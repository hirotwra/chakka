class BadgeUserStatuses < ActiveRecord::Migration[6.1]
  def change
    create_table :badge_user_statuses do |t|
      t.references :user_statuses, null: false, foreign_key: true
      t.references :badges, null: false, foreign_key: true
      t.timestamps
    end
  end
end
