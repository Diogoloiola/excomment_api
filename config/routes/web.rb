namespace :web, defaults: { format: :json } do
  namespace :v1 do
    resources :projects, only: %i[show index]
  end
end
