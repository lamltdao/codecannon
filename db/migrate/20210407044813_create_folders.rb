class CreateFolders < ActiveRecord::Migration[6.0]
  def change
    create_table :folders do |t|
      t.references :course, null: false, foreign_key: true
      t.string :title
      t.references :creator, foreign_key: { to_table: 'users' }
      t.references :parent_folder, foreign_key: { to_table: 'folders' }

      t.timestamps
    end
  end
end
