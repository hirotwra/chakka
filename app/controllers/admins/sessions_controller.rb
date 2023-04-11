class Admins::SessionsController < Devise::SessionsController
  def guest_sign_in
    admin = Admin.guest
    sign_in admin
    redirect_to root_path, notice: 'ゲスト管理ユーザーとしてログインしました。'
  end
end
