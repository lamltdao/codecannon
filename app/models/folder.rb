class Folder < ApplicationRecord
  belongs_to :course
  belongs_to :creator, class_name: "User"
  belongs_to :parent_folder, optional: true, class_name: "Folder", foreign_key: "parent_folder_id"
  has_many :children_folders, class_name: "Folder", foreign_key: "parent_folder_id", dependent: :destroy
  has_many :files, class_name: "Material", foreign_key: "parent_folder_id", dependent: :destroy

  validates :title, presence: true, allow_blank: false
  scope :root_folders, -> { where(parent_folder: nil) }

  def folder_path
    folder_path = []
    folder_copy = self
    while folder_copy
      if folder_path.size > Settings.file_manager.max_stack_folder
        raise "Folder stack limit exceeded"
      end
      folder_path << folder_copy
      folder_copy = folder_copy.parent_folder
    end
    folder_path.reverse
  end

  def destroy!
    raise Exceptions::Courses::Folders::DestroyRootFolderException.new unless parent_folder_id
    raise Exceptions::Courses::Folders::DestroyFolderWithChildrenException.new unless children_folders.blank? && files.blank?
    super
  end
end
