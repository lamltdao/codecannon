class Course < ApplicationRecord
  belongs_to :admin, class_name: "User"
  has_many :course_participations, -> { confirmed }, foreign_key: "course_id"
  has_many :participants, through: :course_participations
  has_many :discussion_threads
  has_many :folders
  has_many :files, class_name: "Material", foreign_key: "course_id"
  after_create :create_root_folder

  validates :welcome_message, presence: true
  validates :overview, presence: true

  def course
    self
  end

  private

  def create_root_folder
    folders.create!({
      creator_id: admin_id,
      title: "Materials"
    })
  end
end
