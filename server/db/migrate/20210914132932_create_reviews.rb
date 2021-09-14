class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.belongs_to :product
      t.float :rating
      t.text :description
      t.timestamps
    end
  end
end
