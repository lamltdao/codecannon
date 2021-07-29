class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :author, foreign_key: { to_table: 'users' }
      t.references :discussion_thread
      t.text :body
      t.references :commentable, polymorphic: true

      t.timestamps
    end
  end
end
