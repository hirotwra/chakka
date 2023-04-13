class Admins::RegistrationsController < Devise::RegistrationsController
  before_action :disallow_non_administrators, only: [:new, :create, :destroy, :new_administer]

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

  private
  def disallow_non_administrators
    redirect_to root_path, notice: "このアカウントは管理者専用ページにアクセスできません。" unless admin_signed_in?
  end

  def admin_params
    params.require(:admin).permit(:email, :password, :password_confirmation)
  end
end
