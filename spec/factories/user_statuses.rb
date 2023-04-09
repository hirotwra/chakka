FactoryBot.define do
  factory :normal_user_status, class: UserStatus do
    id {1}
    user_id {1}
    name { "ノーマル１" }
    level { 1 }
    exp { 0 }
    score {0}
    last_achievemented_at { "now()" }
  end
  factory :second_normal_user_status, class: UserStatus do
    id {2}
    user_id {2}
    name { "ノーマル２" }
    level { 5 }
    exp { 1000 }
    score {0}
    last_achievemented_at { "now()" }
  end
end