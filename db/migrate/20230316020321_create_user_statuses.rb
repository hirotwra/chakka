class CreateUserStatuses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_statuses do |t|
      t.references :user, foreign_key: true
      t.string :name, default: "デフォルト", limit: 40
      t.integer :level, default: 1, range: [1, 100]
      t.integer :exp, default: 0
      t.integer :fav_badge, default: 1
      t.integer :score, default: 0
      t.datetime :last_achievemented_at, default: -> { 'NOW()' }
      t.timestamps
    end
  end
end
