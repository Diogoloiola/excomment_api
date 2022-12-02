json.scores do
  json.array! @scores, partial: 'score', as: :score
end
