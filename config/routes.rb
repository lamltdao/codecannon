Rails.application.routes.draw do
  get "errors/not_found"
  get "errors/internal_server_error"
  get "errors/unauthorized"
  devise_for :users, path_names: {
    sign_in: "login",
    sign_out: "logout"
  }, controllers: {
    confirmations: "user/confirmations",
    sessions: "user/sessions",
    registrations: "user/registrations",
    passwords: "user/passwords"
  }
  root to: "common#landing"
  get "/home", to: "common#home"
  get "/account_confirmation", to: "common#account_confirmation"
  get "/forgot_password", to: "common#forgot_password"

  resources :courses, only: [:show, :edit, :update], controller: "courses/courses" do
    resources :folders, controller: "courses/folders", path: "materials", only: [:show, :create, :destroy]
    resources :materials, controller: "courses/materials", path: "files", only: [:create, :destroy]
    resources :threads, only: [:index, :show, :new, :update, :edit, :create, :upvote, :downvote], controller: "courses/threads" do
      member do
        put "upvote", to: "courses/threads#upvote"
        put "downvote", to: "courses/threads#downvote"
      end
    end
    resources :comments, only: [:create, :reply, :upvote, :downvote], controller: "courses/comments" do
      member do
        post "reply", to: "courses/comments#reply"
        put "upvote", to: "courses/comments#upvote"
        put "downvote", to: "courses/comments#downvote"
      end
    end
    resources :users, controller: "courses/members", path: "members", only: [:index, :create, :delete, :send_confirmation, :confirm] do
      collection do
        post "send_confirmation", to: "courses/members#send_confirmation"
        get "confirm", to: "courses/members#confirm"
      end
    end
  end
  get "/profile/:username", to: "user/profiles#show"
  namespace :admin do
    resources :courses, only: [:new, :create]
    get "/course_created/:id", to: "courses#course_created", as: "course_created"
  end
  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all
  match "/401", to: "errors#unauthorized", via: :all
end
