class CreateLevelSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :level_settings do |t|
      t.integer :level, null:false
      t.integer :exp, null:false
      t.timestamps
    end
    add_index :level_settings, :level
    add_index :level_settings, :exp
  end
end
