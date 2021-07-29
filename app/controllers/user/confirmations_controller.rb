class User::ConfirmationsController < Devise::ConfirmationsController
  def create
    unconfirmed_email = params[:unconfirmed_email]
    user = User.find_by_email(unconfirmed_email)
    if !user
      raise ActiveRecord::RecordNotFound
    elsif user.confirmed?
      raise ActiveRecord::RecordInvalid
    else
      user.send_confirmation_instructions
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: {errors: ["Email not found"]}, status: :not_found
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: ["Email already confirmed"]}, status: :unprocessable_entity
  end

  private

  def after_confirmation_path_for(resource_name, resource)
    sign_in(resource_name, resource)
    home_path
  end
end
