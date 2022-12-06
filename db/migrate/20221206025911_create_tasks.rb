class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.references :project, foreign_key: true
      t.string :title, null: false
      t.integer :required_time, null: false, default: 30
      t.text :description
      t.boolean :finish, null: false, default: false
      t.timestamps
    end
  end
end
