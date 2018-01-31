class CreatePermitRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :permit_requests do |t|
      t.string :address
      t.integer :status
      t.integer :permit_type
      t.timestamp :resolved_at
      t.timestamps
    end
  end
end
