class Courses::BaseController < ApplicationController
  layout "course"
  before_action :set_course

  private

  def set_gon_for_course
    gon.isMentor = (@course.admin_id == current_user.id)
    gon.course = @course.slice(:id, :name, :welcome_message, :overview)
    gon.user = current_user.as_json(only: [:username, :id], methods: [:display_name])
    gon.mentor = @course.admin.as_json(only: [:email], methods: [:display_name])
    gon.rootFolderId = @course.folders.root_folders.first.id
  end

  def set_course
    @course = Course.find(params[:course_id])
    render json: {response: "Could not find course"} unless @course
  end
end
