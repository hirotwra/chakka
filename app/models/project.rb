class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  accepts_nested_attributes_for :tasks, allow: true
  validates :title, 
    presence: true,
    length: { maximum: 255}
end
