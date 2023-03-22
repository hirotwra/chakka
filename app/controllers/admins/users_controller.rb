class Admins::UsersController < ApplicationController
  before_action :disallow_non_administrators
  skip_before_action :authenticate_user!
  def index
    @users = User.all
    @admins = Admin.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admins_users_path, notice:"アカウント作成完了/admin" 
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    @projects = @user.projects
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to admins_users_path, notice:"アカウント更新完了/admin" 
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to admins_users_path, notice: "アカウントを削除しました/admin" 
  end

  private
  def disallow_non_administrators
    redirect_to root_path, notice: "このアカウントは管理者専用ページにアクセスできません。" unless admin_signed_in?
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end