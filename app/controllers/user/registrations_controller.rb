class User::RegistrationsController < Devise::RegistrationsController
  layout "authentication"
  before_action :set_gon, only: [:new]
  respond_to :json

  def create
    build_resource(sign_up_params)
    unless resource.save
      render json: {errors: resource.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def edit
    gon.user = resource.as_json(only: [:email, :fname, :lname, :username], methods: [:avatar_url])
    render :edit
  end

  def update
    resource_updated = update_resource(resource, account_update_params)
    unless resource_updated
      render json: {errors: resource.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def set_gon
    gon.recaptchaSiteKey = Rails.env.production? ? Rails.application.credentials.RECAPTCHA_SITE_KEY : ENV["RECAPTCHA_SITE_KEY"]
  end
end
