FactoryBot.define do
  factory :normal_user, class: User do
    id {1}
    name { "ゲストユーザー" }
    email { "normal@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
  factory :second_normal_user, class: User do
    id {2}
    name { "ゲスト2ユーザー" }
    email { "normal2@sample.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
end