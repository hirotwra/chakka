class ChangeProjectValidation < ActiveRecord::Migration[6.1]
  def change
    change_column :projects, :title, :string, limit:100
  end
end
