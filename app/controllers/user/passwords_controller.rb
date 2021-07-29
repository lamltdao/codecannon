class User::PasswordsController < Devise::PasswordsController
  layout "authentication"

  def create
    email = params[:email]
    user = User.find_by_email!(email)
    if !user
      raise ActiveRecord::RecordNotFound
    end
    if user.confirmed?
      user.send_reset_password_instructions
    else
      raise ActiveRecord::RecordInvalid
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: {errors: ["Email not found"]}, status: :not_found
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: ["Email not confirmed yet"]}, status: :unprocessable_entity
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    if !resource.errors.empty?
      set_minimum_password_length
      render :edit, json: {errors: resource.errors.full_messages}, status: :unprocessable_entity
    end
  end

  protected

  def assert_reset_token_passed
    if params[:reset_password_token].blank?
      render "errors/not_found", status: :not_found
    end
  end
end
