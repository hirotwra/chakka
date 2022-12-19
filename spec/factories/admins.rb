FactoryBot.define do
  factory :administer, class: Admin do
    id {1}
    email { "admin@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
end