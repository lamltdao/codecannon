class AddConfirmableToDevise < ActiveRecord::Migration[6.0]
  # Note: Can't use change, as User.update_all will fail in the down migration
  def up
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_index :users, :confirmation_token, unique: true
    # To avoid a short time window between running the migration and updating all existing
    # users as confirmed
    User.update_all confirmed_at: DateTime.now
    # All existing user accounts should be able to log in after this.
  end

  def down
    remove_index :users, :confirmation_token
    remove_columns :users, :confirmation_token, :confirmed_at, :confirmation_sent_at
  end
end
