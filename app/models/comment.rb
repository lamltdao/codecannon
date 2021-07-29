class Comment < ApplicationRecord
  belongs_to :author, class_name: "User"
  belongs_to :commentable, polymorphic: true
  has_many :comments, as: :commentable
  acts_as_votable

  validates :body, presence: true, allow_blank: false

  def score
    get_likes.size - get_dislikes.size
  end

  def last_updated
    updated_at.to_i
  end

  def display_json(current_user)
    as_json(
      only: [:id, :body],
      methods: [:last_updated, :score],
      include: {
        author: {
          methods: [:display_name, :avatar_url]
        },
        comments: {
          only: [:id, :body],
          methods: [:last_updated, :score],
          include: {
            author: {
              methods: [:display_name, :avatar_url]
            }
          }
        }
      }
    ).tap do |json_obj|
      json_obj["vote"] = current_user.get_current_user_vote(self)
      reply_votes = comments.map do |reply|
        current_user.get_current_user_vote(reply)
      end
      json_obj["comments"].zip(reply_votes).each do |reply, vote|
        reply["vote"] = vote
      end
    end
  end
end
