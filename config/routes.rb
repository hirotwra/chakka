Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'badges/index'
      get 'badges/show'
    end
  end
  root to: redirect('/maintab')
  
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
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
  get 'ranking', to: 'ranking#index'

  #その他SPA内
  get 'active_work', to: 'site#index'
  get 'reports/:id/edit', to: 'site#index'
  
  namespace :api do
    namespace :v1 do
      resources :projects, only: %i[index show create update destroy]
      resources :reports, only: %i[index last_report show create update destroy]
      resources :user_statuses do
        member do
          patch "exp_update", to: "user_statuses#exp_update"
        end
      end
      resources :level_settings, only: %i[index]
    end
  end

  #sidekiqダッシュボード用マウント
  require 'sidekiq/web'
  require 'sidekiq-scheduler/web'
  mount Sidekiq::Web => '/sidekiq'

  post 'ranking/update'

  get '*not_found', to:'application#routing_error'
  post '*not_found', to:'application#routing_error'
end