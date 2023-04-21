class Api::V1::UserStatusesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    user_statuses = UserStatus.all
    if admin_signed_in?
      user_status = UserStatus.find_by(user_id: 20)
    else
      user_status = current_user.user_status
    end
    render json: user_status
  end

  def create
  end

  def update
    user_status = UserStatus.find(params[:id])
    if user_status.update(user_status_params)
      render json: user_status
    else
      render json: user_status.errors, status: 422
    end
  end

  def show
    user_status = current_user.user_status
    render json: user_status
  end

  def exp_update
    user_status = current_user.user_status
    before_exp = user_status.exp
    user_status.exp += 100
    user_status.next_level_exp -= 100
    user_status.last_achievemented_at = Date.today
    level_settings = LevelSetting.all.order(level: :desc)
    update_level = level_settings.find{|level|
      level.exp > before_exp && level.exp <= user_status.exp
    }
    if user_status.next_level_exp <= 0
      user_status.level = update_level.level
      user_status.next_level_exp = update_level.next_exp - user_status.exp
      user_status.save!
      render json: {user_status: user_status, flash_message: "レベルアップしました！"}
      return
    end
      user_status.save!
      render json: user_status
  end

  private

  def user_status_params
    params.require(:user_status).permit(:name, :level, :exp, :next_level_exp, :fav_badge, :score, :last_achievemented_at,)
  end
end