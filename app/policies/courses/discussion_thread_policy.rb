class Courses::DiscussionThreadPolicy < Courses::ApplicationPolicy
  def index?
    course_admin? || participant? || site_admin?
  end

  def show?
    course_admin? || participant? || site_admin?
  end

  def new?
    course_admin?
  end

  def create?
    course_admin?
  end

  def edit?
    course_admin?
  end

  def update?
    course_admin?
  end

  def votable?
    course_admin? || participant?
  end
end
