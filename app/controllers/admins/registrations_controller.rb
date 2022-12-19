# frozen_string_literal: true

class Admins::RegistrationsController < Devise::RegistrationsController
  before_action :disallow_non_administrators, only: [:new, :create, :destroy, :new_administer]
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end


  def new_administer
    @admin = Admin.new
  end

  def create_administer
    @admin = Admin.new(admin_params)
    if @admin.save
      redirect_to admins_users_path, notice:"アカウント作成完了/admin" 
    else
      render :new_administer, notice:"アカウント作成失敗/admin" 
    end
  end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  private
  def disallow_non_administrators
    redirect_to root_path, notice: "このアカウントは管理者専用ページにアクセスできません。" unless admin_signed_in?
  end

  def admin_params
    params.require(:admin).permit(:email, :password, :password_confirmation)
  end
end
