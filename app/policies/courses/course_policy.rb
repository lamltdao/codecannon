class Courses::CoursePolicy < Courses::ApplicationPolicy
  def show?
    course_admin? || participant? || site_admin?
  end

  def update?
    course_admin?
  end
end
