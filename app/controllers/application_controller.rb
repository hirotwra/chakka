class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session
  before_action :authenticate_user!, unless: :admin_signed_in?
  
  def after_sign_in_path_for(resource)
    root_path
  end

  rescue_from Exception,                      with: :_render_500
  rescue_from ActiveRecord::RecordNotFound,   with: :_render_404
  rescue_from ActionController::RoutingError, with: :_render_404
  
  def routing_error
    raise ActionController::RoutingError, params[:path]
  end

  def _render_404(e = nil)
    logger.info "Rendering 404 with excaption: #{e.message}" if e
    if request.format.to_sym == :json
      render json: { error: "404 Not Found" }, status: :not_found
    else
      render "errors/404.html", status: :not_found, formats: :html
    end
  end

  def _render_500(e = nil)
    logger.error "Rendering 500 with excaption: #{e.message}" if e
    if request.format.to_sym == :json
      render json: { error: "500 Internal Server Error" }, status: :internal_server_error
    else
      render "errors/500.html", status: :internal_server_error, formats: :html
    end
  end

protected

  #def configure_permitted_parameters
  #  #binding.pry
  #  devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  #  devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  #end


end