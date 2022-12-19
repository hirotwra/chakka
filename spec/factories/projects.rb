FactoryBot.define do
  factory :project do
    title {"title1"}
    deadline {'2032/10/01'}
    description {'説明'}
  end

  factory :project_secound, class: Project do
    title {"title2"}
    deadline {'2032/10/31'}
    description {'説明'}
  end

  factory :project_third, class: Project do
    title {"title3"}
    deadline {'2032/10/02'}
    description {'説明'}
  end

end