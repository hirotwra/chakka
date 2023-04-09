FactoryBot.define do
  factory :report , class: Report do
    user_id {1}
    is_finished {true}
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

  factory :report_secound, class: Report do
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

  factory :report_third, class: Report do
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

  factory :admin_report, class: Report do
    user_id {1}
    is_finished {true}
    y_record {"やったこと"}
    w_record {"わかったこと"}
    t_record {'次やること'}
  end

end