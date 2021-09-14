require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

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

post '/reviews' do
  request.body.rewind
  data = JSON.parse request.body.read

  content_type :json

  return data.to_json
end
