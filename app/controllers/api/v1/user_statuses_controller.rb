class Api::V1::UserStatusesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    user_statuses = UserStatus.all
    user_status = current_user.user_status
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

  private

  def user_status_params
    params.require(:user_status).permit(:name, :level, :exp, :fav_badge, :score, :last_achievemented_at, :user_id)
  end
end