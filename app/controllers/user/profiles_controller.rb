class User::ProfilesController < ActionController::Base
  before_action :set_user, only: [:show]

  layout "landing"

  def show
    gon.user = @user.as_json(
      only: [:email, :fname, :lname, :username],
      methods: [:avatar_url]
    )
    gon.isCurrentUser = current_user.present? && (current_user.id == @user.id)
  end

  private

  def set_user
    @user = User.find_by_username(params[:username])
    render "errors/not_found", status: :not_found unless @user
  end
end
