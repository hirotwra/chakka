Rails.application.routes.draw do
  root to: redirect('/maintab')
  
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

  #サイドバー内リンク
  get 'maintab', to: 'site#index'
  get 'reports', to: 'site#index'
  get 'user_status', to: "site#index"
  get 'contact', to: 'site#index'
  get 'ranking', to: 'user_statuses#index'

  #学習記録編集
  get 'reports/:id/edit', to: 'site#index'
  
  #旧モデル用root(順次削除)
  get 'projects/new', to: 'site#index'
  get 'projects/:id/edit', to: 'site#index'
  get '/projects/finish', to: 'site#index'
  
  namespace :api do
    namespace :v1 do
      resources :projects, only: %i[index show create update destroy]
      resources :reports, only: %i[index show create update destroy]
      resources :user_statuses, only: %i[show create update]
    end
  end

  get '*not_found', to:'application#routing_error'
  post '*not_found', to:'application#routing_error'
end