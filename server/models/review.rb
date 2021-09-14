class Review < ActiveRecord::Base
  belongs_to :product
  
  validates :product_id, presence: true
  validates :rating, numericality: true, presence: true
  validates :description, presence: true
end
