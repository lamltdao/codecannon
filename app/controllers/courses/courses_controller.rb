class Courses::CoursesController < Courses::BaseController
  before_action :authenticate_user!
  before_action :set_gon_for_course, only: [:show, :edit]

  def show
    authorize [:courses, @course]
  end

  def edit
    authorize [:courses, @course]
  end

  def update
    authorize [:courses, @course]
    unless @course.update(course_params)
      render json: {errors: @course.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  # override the base controller, replace course_id with id
  def set_course
    @course = Course.find(params[:id])
    render json: {response: "Could not find course"} unless @course
  end

  def course_params
    params.require(:course).permit(:welcome_message, :overview)
  end
end
