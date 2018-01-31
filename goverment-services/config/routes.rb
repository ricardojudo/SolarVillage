Rails.application.routes.draw do
  resources :permit_requests, only: [:show, :destroy] do
    collection do
      post :create_structural
      post :create_electrical
    end
  end
end
