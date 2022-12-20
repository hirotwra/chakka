FactoryBot.define do
  factory :administer, class: Admin do
    id {100}
    email { "admin@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
end