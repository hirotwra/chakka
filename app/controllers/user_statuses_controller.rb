class UserStatusesController < ApplicationController
  def index
    @user_statuses = UserStatus.all
  end

end