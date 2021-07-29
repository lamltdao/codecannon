class AddUsernameFnameLnameToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :fname, :string
    add_column :users, :lname, :string
    add_column :users, :username, :string
  end
end
