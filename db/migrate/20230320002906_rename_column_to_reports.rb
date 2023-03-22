class RenameColumnToReports < ActiveRecord::Migration[6.1]
  def change
    rename_column :reports, :is_finished?, :is_finished
  end
end
