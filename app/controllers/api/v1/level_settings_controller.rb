class Api::V1::LevelSettingsController < ApplicationController
  def index
    level_settings = LevelSetting.all
    render json: level_settings.order(level: :desc)
  end

  private

  def level_settings_params
    params.require(:level_settings).permit(:level, :exp)
  end
end