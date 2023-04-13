class ScoreUpdateJob < ApplicationJob
  queue_as :default

  def perform
    user_statuses = UserStatus.all
    user_statuses.each do |r|
      updated_score = [r.score - 50, 0].max
      r.update(score: updated_score)
    end
  end
end
