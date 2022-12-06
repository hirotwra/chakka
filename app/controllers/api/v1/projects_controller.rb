class Api::V1::ProjectsController < ApplicationController
  def index
    projects= Project.order(updated_at: :desc)
    render json: projects
  end

  def show
    project = Project.find(params[:id])
    render json: project
  end

  def create
    project = Project.new(project_params)
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
    params.require(:project).permit(:title, :deadline, :description, :active)
  end
end