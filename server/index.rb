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

get '/reviews' do
  return [
    {
      id: 1,
      rating: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra odio id nunc ultrices, eget ullamcorper augue imperdiet. Praesent metus nibh, posuere eget lectus sed, malesuada vestibulum elit'
    },
    {
      id: 2,
      rating: 2.5,
      description: 'Vestibulum quis auctor libero. Nulla id efficitur magna. Morbi euismod justo quis mi pulvinar, et vulputate augue sollicitudin'
    },
    {
      id: 3,
      rating: 5,
      description: 'Nullam consectetur dui sed dolor placerat, vitae tristique diam placerat. Nulla ultricies arcu magna, vel vulputate mi auctor quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut quis pulvinar ipsum, quis vestibulum augue. Sed tempus, nisl sed lacinia dapibus, urna urna cursus erat, quis maximus leo sapien non ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus'
    }
  ].to_json
end

post '/reviews' do
  request.body.rewind
  data = JSON.parse request.body.read

  content_type :json

  return data.to_json
end
