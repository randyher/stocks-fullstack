class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.integer :quantity
      t.integer :cost
      t.integer :user_id

      t.timestamps
    end
  end
end
