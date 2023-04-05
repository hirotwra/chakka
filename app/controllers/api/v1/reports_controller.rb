class Api::V1::ReportsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if admin_signed_in?
			reports = User.find(1).reports
    else
			report = current_user.reports
    end
		render json: reports
  end

  def show
		if params[:id] == "last_report"
			report = current_user.reports.last
		else
			report = Report.find(params[:id])
		end
    render json: report
  end

  def create
    report = Report.new(report_params)
    if admin_signed_in?
      report.user_id = User.find(1).id
    else
      report.user_id = current_user.id
    end
    
    if report.save
      render json: report
    else
      render json: report.errors, status: 422
    end
  end

  def update
    report = Report.find(params[:id])
    if report.update(report_params)
      render json: report
    else
      render json: report.errors, status: 422
    end
  end

  def destroy
    if Report.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end
  

  private

  def report_params
    params.require(:report).permit(:is_finished, :y_record, :w_record, :t_record, :user_id, :updated_at)
  end
end