FactoryBot.define do
  factory :user do
    email { FFaker::Internet.safe_email }
    username { "_L0w13_" }
    password { "aA123456" }
  end
end
