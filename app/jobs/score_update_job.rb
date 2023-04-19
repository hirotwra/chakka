class ScoreUpdateJob < ApplicationJob
  sidekiq_options :queue => :default
  require "date"
  def perform
    d = Date.today
    user_statuses = UserStatus.all
    user_statuses.each do |r|
      interval = d - r.last_achievemented_at.to_date
      if interval.to_i <= 2
        updated_score = r.score + 100
        r.update(score: updated_score)
      elsif interval.to_i >= 5
        updated_score = [r.score - 50, 0].max
        r.update(score: updated_score)
      end
    end
  end
end
