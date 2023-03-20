class CreateReportTags < ActiveRecord::Migration[6.1]
  def change
    create_table :report_tags do |t|
      t.references :reports, null: false, foreign_key: true
      t.references :tags, null: false, foreign_key: true
      t.timestamps
    end
  end
end
