class Report < ApplicationRecord
  belongs_to :user
  validates :y_record, 
    presence: true,
    length: { maximum: 2000 }
  validates :w_record, 
    presence: true,
    length: { maximum: 2000 }
  validates :t_record, 
    presence: true,
    length: { maximum: 2000 }
end
