FactoryBot.define do
  factory :level1, class: LevelSetting do
    id{1}
    level {1}
    exp {0}
    next_exp {100}
  end
  factory :level2, class: LevelSetting do
    id{2}
    level {2}
    exp {100}
    next_exp {300}
  end
  factory :level3, class: LevelSetting do
    id{3}
    level {3}
    exp {300}
    next_exp {600}
  end
  factory :level4, class: LevelSetting do
    id{4}
    level {4}
    exp {600}
    next_exp {900}
  end
end