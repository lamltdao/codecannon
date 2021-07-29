class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Rails.application.routes.url_helpers
  attr_writer :login

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable, :async

  has_many :admin_courses, foreign_key: "admin_id", class_name: "Course"
  has_many :course_participations, foreign_key: "participant_id"
  has_many :participating_courses, through: :course_participations, source: :course

  has_one_attached :avatar

  validates :username, uniqueness: {case_sensitive: false}
  validates :username, presence: true
  validates :username, format: {
    with: Regexp.new(Settings.user.username_regex),
    message: "must be 4-20 characters, only letters, numbers, and '_' are allowed."
  }

  acts_as_voter

  def login
    @login || username || email
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", {value: login.downcase}]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      conditions[:email].downcase! if conditions[:email]
      where(conditions.to_hash).first
    end
  end

  def avatar_url
    return nil unless avatar.attached?
    rails_blob_url(avatar, disposition: "preview", only_path: true)
  end

  def display_name
    return username if fname.blank? || lname.blank?
    "#{fname} #{lname}"
  end

  def get_current_user_vote(votable_instance)
    if voted_up_on? votable_instance
      "Upvoted"
    elsif voted_down_on? votable_instance
      "Downvoted"
    else
      "Novoted"
    end
  end

  def self.send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
