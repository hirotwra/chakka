FactoryBot.define do
  factory :project do
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

  factory :project_secound, class: Project do
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

  factory :project_third, class: Project do
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

end