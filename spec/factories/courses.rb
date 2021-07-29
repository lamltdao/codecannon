FactoryBot.define do
  factory :course do
    name { FFaker::CoursesFR::Mathematiques.lesson }
    welcome_message { "welcome" }
    overview { "this is an overview" }
  end
end
