Rails.application.routes.draw do
  root to: redirect('/projects')
  
  devise_for :users
  devise_for :admins, controllers:{
    sessions: 'admins/sessions',
    passwords: 'admins/passwords',
    registrations: 'admins/registrations'
  } 
  
  namespace :admins do
    resources :users, only: [:index, :create, :new, :edit, :show, :update, :destroy]
  end
  
  devise_scope :user do
    post 'users/guest_sign_in', to: 'users/sessions#guest_sign_in'
  end

  devise_scope :admin do
    post 'admins/guest_sign_in', to: 'admins/sessions#guest_sign_in'
    get  'admins/new_administer', to: 'admins/registrations#new_administer'
    post 'admins/new_administer', to: 'admins/registrations#create_administer'
  end


  get 'projects', to: 'site#index'
  get 'projects/new', to: 'site#index'
  get 'projects/:id/edit', to: 'site#index'
  get '/projects/finish', to: 'site#index'
  get 'contact', to: 'site#index'


  
  namespace :api do
    namespace :v1 do
      resources :projects, only: %i[index show create update destroy]
    end
  end

  get '*not_found', to:'application#routing_error'
  post '*not_found', to:'application#routing_error'
end