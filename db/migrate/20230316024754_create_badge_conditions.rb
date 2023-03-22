class CreateBadgeConditions < ActiveRecord::Migration[6.1]
  def change
    create_table :badge_conditions do |t|
      t.references :badges, null: false, foreign_key: true
      t.integer :condition_type, null: false
      t.integer :condition_value, null:false
      t.timestamps
    end
  end
end
