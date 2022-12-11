class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :projects, dependent: :destroy

  devise :database_authenticatable,:registerable,
  :recoverable, :rememberable, :trackable, :validatable,
  :jwt_authenticatable, jwt_revocation_strategy: self

end