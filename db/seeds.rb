User.create!(
  [
    {
      id:1, email:'sample1@sample.com', password:'password',
    },
    {
      id:2, email:'sample2@sample.com', password:'password',
    },
    {
      id:3, email:'sample3@sample.com', password:'password',
    },
    {
      id:4, email:'sample4@sample.com', password:'password',
    },
    {
      id:5, email:'sample5@sample.com', password:'password',
    },
    {
      id:20, email:'guest@example.com', password:'password',
    }
  ]
)

Admin.create!(
  [
    {
      email:'adsample1@sample.com', password:'password',
    },
    {
      email:'adsample2@sample.com', password:'password',
    },
    {
      email:'adsample3@sample.com', password:'password',
    },
    {
      email:'adsample4@sample.com', password:'password',
    },
    {
      email:'adsample5@sample.com', password:'password',
    }
  ]
)

UserStatus.create!(
  [
    {
      user_id:1, name:'ユーザー1',
    },
    {
      user_id:2, name:'ユーザー2',
    },
    {
      user_id:3, name:'ユーザー3',
    },
    {
      user_id:4, name:'ユーザー4',
    },
    {
      user_id:5, name:'ユーザー5',
    },
    {
      user_id:20, name:'ゲストステータス',
    },
  ]
)