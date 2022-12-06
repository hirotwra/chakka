Rails.application.routes.draw do
  root to: redirect('/projects')
  
  get 'projects', to: 'site#index'
  get 'projects/new', to: 'site#index'
  get 'projects/:id/edit', to: 'site#index'
  
  namespace :api do
    namespace :v1 do
      resources :projects, only: %i[index show create update destroy]
    end
  end
end