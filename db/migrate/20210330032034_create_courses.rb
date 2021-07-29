class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.text :name
      t.references :admin, foreign_key: { to_table: 'users' }
      
      t.timestamps
    end
  end
end
