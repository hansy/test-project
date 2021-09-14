class Product < ActiveRecord::Base
  has_many :reviews
  
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
  validates :price, numericality: { only_integer: true }, presence: true
end
