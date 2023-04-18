FactoryBot.define do
  factory :normal_user_status, class: UserStatus do
    id {1}
    user_id {1}
    name { "ノーマル１" }
    level { 1 }
    exp { 0 }
    score {0}
    last_achievemented_at { DateTime.now() }
  end
  factory :second_normal_user_status, class: UserStatus do
    id {2}
    user_id {2}
    name { "ノーマル２" }
    level { 4 }
    exp { 1000 }
    score {100}
    last_achievemented_at { DateTime.now.ago(5.days) }
  end
  factory :third_normal_user_status, class: UserStatus do
    id {3}
    user_id {3}
    name { "ノーマル3" }
    level { 1 }
    exp { 0 }
    score {100}
    last_achievemented_at { DateTime.now.ago(4.days) }
  end
end