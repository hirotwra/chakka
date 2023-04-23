class UserStatus < ApplicationRecord
  belongs_to :user

  def exp_update(exp)
    before_exp = self.exp
    self.exp += (exp)
    self.next_level_exp -= (exp)
    self.last_achievemented_at = Date.today
    level_settings = LevelSetting.all.order(level: :desc)
    update_level = level_settings.find { |level|
      level.exp > before_exp && level.exp <= self.exp
    }
    transaction do
      if self.next_level_exp <= 0
        self.level = update_level.level
        self.next_level_exp = update_level.next_exp - self.exp
        bonus = self.level * 100
        self.score += bonus
        self.save!
        return { user_status: self, flash_message: "レベルアップ！ スコアボーナス+#{bonus}" }
      end
      self.save!
      return self 
    end
  end
end
