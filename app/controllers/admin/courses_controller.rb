class Admin::CoursesController < Admin::BaseController
  before_action :authenticate_user!
  layout "admin"

  def new
    authorize [:admin, Course.new]
  end

  def create
    authorize [:admin, Course.new]
    @course = Course.new(course_params!)
    if @course.save
      render json: {courseId: @course.id}
    else
      render json: {errors: @course.errors.full_messages}, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: {errors: ["No user with this username exists"]}, status: :unprocessable_entity
  end

  def course_created
    @course = Course.find(params[:id])
    authorize [:admin, @course]
    gon.courseUrl = course_url(@course)
  end

  private

  def course_params!
    username = params[:admin_username]
    usr = User.find_by!(username: username)
    params[:course][:admin_id] = usr.id
    params.require(:course).permit(:name, :admin_id, :welcome_message, :overview)
  end
end
