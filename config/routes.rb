Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Landingページ
  root "pages#top"
  resources :users, only: [ :new, :create, :edit, :update, :destroy ] do
    member do
      patch :update_income
    end
  end
  get    "login",  to: "sessions#new"
  post   "login",  to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get    "dashboard", to: "dashboard#index"
  resources :fixed_expenses, only: [ :index, :new, :create, :edit, :update, :destroy ], param: :uuid
  get "calendar", to: "calendar#index", as: :calendar

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
