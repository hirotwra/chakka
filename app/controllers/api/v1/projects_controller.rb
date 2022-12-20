class Api::V1::ProjectsController < ApplicationController
    skip_before_action :verify_authenticity_token

  def index
    if admin_signed_in?
      projects = User.find(1).projects.order(updated_at: :desc)
    else
      projects = current_user.projects.order(updated_at: :desc)
    end
    render json: projects
  end

  def show
    project = Project.find(params[:id])
    render json: project
  end

  def create
    project = Project.new(project_params)
    if admin_signed_in?
      project.user_id = User.find(1).id
    else
      project.user_id = current_user.id
    end
    
    if project.save
      render json: project
    else
      render json: project.errors, status: 422
    end
  end

  def update
    project = Project.find(params[:id])
    if project.update(project_params)
      render json: project
    else
      render json: project.errors, status: 422
    end
  end

  def destroy
    if Project.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end
  

  private

  def project_params
    params.require(:project).permit(:title, :deadline, :description, :active, :user_id, :is_finished, :work_time)
  end
end