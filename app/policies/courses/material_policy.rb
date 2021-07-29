class Courses::MaterialPolicy < Courses::ApplicationPolicy
  def create?
    course_admin?
  end

  def destroy?
    course_admin?
  end
end
