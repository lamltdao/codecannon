class Courses::FoldersController < Courses::BaseController
  before_action :authenticate_user!
  before_action :set_folder, only: [:show, :destroy]
  before_action :set_gon_for_course, only: [:show]

  def show
    authorize [:courses, @folder]
    gon.folderPath = @folder.folder_path.map do |folder|
      folder.slice(:id, :title)
    end
    gon.currentFolder = @folder.slice(:id, :parent_folder_id)
    gon.folders = @folder.children_folders.map do |children_folder|
      children_folder.slice(:id, :title, :creator_id, :parent_folder_id)
    end
    gon.files = @folder.files.map do |file|
      parse_file = file.slice(:title, :id)
      if file.file.attached?
        parse_file["contentType"] = file.file.content_type
        parse_file["previewUrl"] = rails_blob_url(file.file, disposition: "preview")
        parse_file["downloadUrl"] = rails_blob_url(file.file, disposition: "attachment")
      end
      parse_file
    end
  end

  def create
    authorize [:courses, @course.folders.new]
    @folder = @course.folders.create!(folder_params)
    render json: {success: true}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  def destroy
    authorize [:courses, @folder]
    @folder.destroy!
    render json: {success: true}, status: :no_content
  rescue Exceptions::Courses::Folders::DestroyRootFolderException, Exceptions::Courses::Folders::DestroyFolderWithChildrenException => e
    render json: {errors: [e.message]}, status: e.status
  rescue ActiveRecord::RecordNotDestroyed => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  private

  def set_folder
    @folder = @course.folders.find(params[:id])
  end

  def folder_params
    params.require(:folder).permit(:title, :parent_folder_id, :creator_id)
  end
end
