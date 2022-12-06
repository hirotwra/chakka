class Task < ApplicationRecord
  belongs_to :project
  validates :title, 
    presence: true,
    length: { maximum: 255}
end
