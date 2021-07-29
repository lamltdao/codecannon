FactoryBot.define do
  factory :discussion_thread do
    title { "Discussion_Thread" }
    body { FFaker::Lorem.paragraph }
  end
end