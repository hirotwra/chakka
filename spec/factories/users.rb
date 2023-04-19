FactoryBot.define do
  factory :normal_user, class: User do
    id {1}
    email { "normal@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
  factory :second_normal_user, class: User do
    id {2}
    email { "normal2@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
  factory :third_normal_user, class: User do
    id {3}
    email { "normal3@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
end