class Courses::MaterialsController < Courses::BaseController
  before_action :authenticate_user!
  before_action :set_material, only: [:destroy]

  def create
    authorize [:courses, @course.files.new]
    @material = Material.create!(material_params)
    render json: {success: true}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  def destroy
    authorize [:courses, @material]
    @material.destroy!
    render json: {success: true}, status: :no_content
  rescue ActiveRecord::RecordNotDestroyed => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  private

  def set_material
    @material = @course.files.find(params[:id])
  end

  def material_params
    params.require(:material).permit(:title, :course_id, :parent_folder_id, :creator_id, :file)
  end
end
