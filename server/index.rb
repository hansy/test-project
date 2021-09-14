require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/cross_origin'
require 'json'

require './models/product'
require './models/review'

configure do
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options "*" do
  response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"

  200
end

get '/products/:id' do
  @product = Product.includes(:reviews).find_by_id(params[:id])

  @product ? @product.to_json(include: [:reviews]) : 404
end

post '/reviews' do
  request.body.rewind
  data = JSON.parse request.body.read

  content_type :json

  return data.to_json
end
