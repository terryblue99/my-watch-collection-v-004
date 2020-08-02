class ChangeWatchesTableNotesToText < ActiveRecord::Migration[6.0]
  def change
    change_column :watches, :notes, :text
  end
end
