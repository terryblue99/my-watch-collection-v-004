class AddDateLastWornToWatches < ActiveRecord::Migration[6.0]
  def change
    add_column :watches, :date_last_worn, :string
  end
end
