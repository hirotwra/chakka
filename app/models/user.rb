class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  validates :name, presence: true
  has_many :projects, dependent: :destroy

  def self.guest
    find_or_create_by!(email: 'guest@example.com') do |user|
      user.password = SecureRandom.urlsafe_base64
      user.name = 'ゲスト'
      # user.confirmed_at = Time.now  # Confirmable を使用している場合は必要
      # 例えば name を入力必須としているならば， user.name = "ゲスト" なども必要
    end
  end

  devise :database_authenticatable,:registerable,
  :recoverable, :rememberable, :trackable, :validatable,
  :jwt_authenticatable, jwt_revocation_strategy: self

end