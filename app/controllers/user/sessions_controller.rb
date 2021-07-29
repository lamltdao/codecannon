class User::SessionsController < Devise::SessionsController
  layout "authentication"

  def create
    self.resource = warden.authenticate(auth_options)
    if resource.present?
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
    else
      render json: {}, status: :unauthorized
    end
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    respond_to_on_destroy
  end

  def respond_to_on_destroy
    respond_to do |format|
      format.all { head :no_content }
    end
  end
end
