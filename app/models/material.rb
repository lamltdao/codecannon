class Material < ApplicationRecord
  belongs_to :course
  belongs_to :creator, class_name: "User"
  belongs_to :parent_folder, optional: true, class_name: "Folder", foreign_key: "parent_folder_id"
  has_one_attached :file

  validates :title, presence: true, allow_blank: false
  validates :file, presence: true

  scope :root_files, -> { where(parent_folder: nil) }
end
