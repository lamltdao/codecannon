class Courses::CommentPolicy < Courses::ApplicationPolicy
  def votable?
    course_admin? || participant?
  end

  def commentable?
    course_admin? || participant?
  end
end
