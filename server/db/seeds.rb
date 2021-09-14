require 'faker'

(1..5).each do
  product = Product.create!(
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph,
    image: Faker::Placeholdit.image(size: '400x600'),
    price: (Faker::Commerce.price * 100).to_i
  )
  num_reviews = rand(5) # get random number 1-5

  (1..num_reviews).each do
    product.reviews.create(
      rating: Faker::Number.between(from: 1, to: 5),
      description: Faker::Lorem.paragraph
    )
  end
end
