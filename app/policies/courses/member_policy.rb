class Courses::MemberPolicy < Courses::ApplicationPolicy
  def index?
    course_admin? || site_admin?
  end

  def send_confirmation?
    course_admin? || site_admin?
  end
end
