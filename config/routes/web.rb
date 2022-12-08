namespace :web, defaults: { format: :json } do
  namespace :v1 do
    resources :projects, only: %i[show index] do
      get 'debts', on: :member
      get 'scores', on: :collection
      get 'amount_technical_debt', on: :member
      get 'hierarchical_json', on: :member
      get 'general_report', on: :member
    end
  end
end
