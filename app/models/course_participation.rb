class CourseParticipation < ApplicationRecord
  belongs_to :participant, class_name: "User"
  belongs_to :course, class_name: "Course"

  scope :confirmed, -> { where.not(confirmed_at: nil) }
end
