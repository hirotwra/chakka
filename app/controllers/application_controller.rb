class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session
  before_action :authenticate_user!
  
  def after_sign_in_path_for(resource)
    root_path
  end

protected

  def configure_permitted_parameters
    #binding.pry
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end


end