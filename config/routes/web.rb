namespace :web, defaults: { format: :json } do
  namespace :v1 do
    resources :projects, only: %i[show index] do
      get 'debts', on: :member
      get 'scores', on: :collection
    end
  end
end
