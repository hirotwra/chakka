class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  def self.guest
    find_or_create_by!(email: 'guestadmin@example.com') do |admin|
      admin.password = SecureRandom.urlsafe_base64
      # user.confirmed_at = Time.now  # Confirmable を使用している場合は必要
      # 例えば name を入力必須としているならば， user.name = "ゲスト" なども必要
    end
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
