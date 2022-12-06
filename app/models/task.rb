class Task < ApplicationRecord
  belongs_to :parent
  validates :title, 
    presence: true,
    length: { maximum: 255}
end
