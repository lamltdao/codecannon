class Admin::CoursePolicy < Admin::ApplicationPolicy
  def create?
    site_admin?
  end

  def course_created?
    site_admin?
  end
end
