class CreateCourseParticipations < ActiveRecord::Migration[6.0]
  def change
    create_table :course_participations do |t|
      t.references :participant, foreign_key: {to_table: 'users'}
      t.references :course , null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
