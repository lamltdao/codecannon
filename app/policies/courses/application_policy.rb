class Courses::ApplicationPolicy < ApplicationPolicy
  def course_admin?
    @user.id == @record.course.admin_id
  end

  def participant?
    @record.course.participants.include?(@user)
  end
end
