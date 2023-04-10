class Users::RegistrationsController < Devise::RegistrationsController
  # POST /resource
  def create
    super 
    resource.build_user_status
    resource.save	
  end
end
