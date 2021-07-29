class ChangeLearnersToUsers < ActiveRecord::Migration[6.0]
  def self.up
    rename_table :learners, :users
  end

  def self.down
    rename_table :users, :learners
  end
end
