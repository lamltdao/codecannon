class AddConfirmableToCourseParticipation < ActiveRecord::Migration[6.0]
  # Note: Can't use change, as CourseParticipation.update_all will fail in the down migration
  def up
    add_column :course_participations, :confirmation_token, :string
    add_column :course_participations, :confirmed_at, :datetime
    add_column :course_participations, :confirmation_sent_at, :datetime
    add_index :course_participations, :confirmation_token, unique: true
    # To avoid a short time window between running the migration and updating all existing
    # users as confirmed
    CourseParticipation.update_all confirmed_at: DateTime.now
    # All existing user accounts should be able to log in after this.
  end

  def down
    remove_index :course_participations, :confirmation_token
    remove_columns :course_participations, :confirmation_token, :confirmed_at, :confirmation_sent_at
  end
end
