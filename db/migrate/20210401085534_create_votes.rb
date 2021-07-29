class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.references :discussion_thread
      t.references :user, null: false, foreign_key: true
      t.references :comment, foreign_key: true
      t.timestamps
    end
  end
end
