json.debts do
  json.array! @debts, partial: 'debt', as: :debt
end
