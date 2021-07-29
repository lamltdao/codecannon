class Courses::CommentsController < Courses::BaseController
  before_action :authenticate_user!
  before_action :set_comment, only: [:reply, :upvote, :downvote]

  def create
    authorize @course, :commentable?, policy_class: Courses::CommentPolicy
    @comment = Comment.create(comment_params)
    render json: {success: true}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  def reply
    authorize @course, :commentable?, policy_class: Courses::CommentPolicy
    @reply = @comment.comments.create(reply_params)
    render json: {success: true}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  def upvote
    authorize @course, :votable?, policy_class: Courses::CommentPolicy
    @comment.liked_by current_user
    render json: {response: @comment.score}
  end

  def downvote
    authorize @course, :votable?, policy_class: Courses::CommentPolicy
    @comment.disliked_by current_user
    render json: {response: @comment.score}
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params[:comment][:author_id] = current_user.id
    params[:comment][:commentable_type] = "DiscussionThread"
    params.require(:comment).permit(:body, :author_id, :commentable_type, :commentable_id)
  end

  def reply_params
    params[:comment][:author_id] = current_user.id
    params.require(:comment).permit(:body, :author_id)
  end
end
