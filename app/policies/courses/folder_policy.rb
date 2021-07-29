class Courses::FolderPolicy < Courses::ApplicationPolicy
  def show?
    course_admin? || participant? || site_admin?
  end

  def create?
    course_admin?
  end

  def destroy?
    course_admin?
  end
end
