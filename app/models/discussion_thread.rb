class DiscussionThread < ApplicationRecord
  belongs_to :user
  belongs_to :course, optional: true
  has_many :comments, as: :commentable
  acts_as_votable

  validates :title, presence: true, allow_blank: false
  validates :body, presence: true, allow_blank: false

  def score
    get_likes.size - get_dislikes.size
  end

  def last_updated
    updated_at.to_i
  end

  def display_json(current_user)
    as_json(
      only: [:id, :body, :title],
      methods: [:last_updated, :score],
      include: {
        user: {
          only: [:id],
          methods: [:display_name, :avatar_url]
        }
      }
    ).tap do |json_obj|
      json_obj["vote"] = current_user.get_current_user_vote(self)
    end
  end
end
