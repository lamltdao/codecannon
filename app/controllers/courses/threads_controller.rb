class Courses::ThreadsController < Courses::BaseController
  before_action :authenticate_user!
  before_action :set_thread, only: [:show, :edit, :update, :upvote, :downvote]
  before_action :set_gon_for_course, only: [:index, :show, :new, :edit]

  def index
    authorize @course, policy_class: Courses::DiscussionThreadPolicy
    @threads = @course.discussion_threads
    gon.threads = @threads.map do |thread|
      thread.display_json(current_user)
    end
  end

  def show
    authorize [:courses, @thread]
    gon.thread = @thread.display_json(current_user)
    maximum_comments_number = 10
    gon.comments = @thread.comments.last(maximum_comments_number).reverse.map do |comment|
      comment.display_json(current_user)
    end
  end

  def new
    @thread = @course.discussion_threads.new
    authorize [:courses, @thread]
    gon.thread = @thread.slice(:id, :body, :title)
  end

  def edit
    authorize [:courses, @thread]
    gon.isEdit = true
    gon.thread = @thread.slice(:id, :body, :title)
  end

  def update
    authorize [:courses, @thread]
    unless @thread.update(thread_params)
      render json: {errors: @thread.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def create
    authorize [:courses, @course.discussion_threads.new]
    @thread = @course.discussion_threads.create(thread_params)
    if @thread.save
      render "index"
    else
      render json: {errors: @thread.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def upvote
    authorize [:courses, @thread], :votable?
    @thread.liked_by current_user
    render json: {response: @thread.score}
  end

  def downvote
    authorize [:courses, @thread], :votable?
    @thread.disliked_by current_user
    render json: {response: @thread.score}
  end

  private

  def set_thread
    @thread = @course.discussion_threads.find(params[:id])
  end

  def thread_params
    params[:discussion_thread][:user_id] = current_user.id
    params[:discussion_thread][:course_id] = @course.id
    params.require(:discussion_thread).permit(:body, :title, :user_id, :course_id)
  end
end
