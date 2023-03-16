class CreateReports < ActiveRecord::Migration[6.1]
  def change
    create_table :reports do |t|
      t.references :user, foreign_key: true
      t.boolean :is_finished?, default: false
      t.text :y_record, null: false
      t.text :w_record, null: false
      t.text :t_record, null: false
      t.timestamps
    end
  end
end
