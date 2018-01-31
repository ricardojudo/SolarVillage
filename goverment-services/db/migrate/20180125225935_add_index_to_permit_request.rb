class AddIndexToPermitRequest < ActiveRecord::Migration[5.1]
  def change
    add_index :permit_requests, [:address, :permit_type], unique: true
  end
end
