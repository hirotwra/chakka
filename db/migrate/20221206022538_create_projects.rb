class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.date :deadline, null: false
      t.text :description
      t.boolean :active, null: false, default: false
      t.timestamps
    end
  end
end

