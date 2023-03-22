class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.references :user, foreign_key: true
      t.string :title, null:false, limit: 20
      t.timestamps
    end
  end
end
