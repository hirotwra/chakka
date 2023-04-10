Report.create!(
  [
    {
      is_finished: true, y_record: 'やったこと', w_record: 'わかったこと', t_record: '次やること', user_id:1
    },
    {
      is_finished: true, 
			y_record: 'BCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV', 
			w_record: 'BCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV', 
			t_record: 'BCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV', 
			user_id:1
    },
    {
      is_finished: false, y_record: 'ワーク進行中', w_record: 'ワーク進行中', t_record: 'ワーク進行中', user_id:1
		}
  ]
)

User.create!(
  [
    {
      email:'sample1@sample.com', password:'password',
    },
    {
      email:'sample2@sample.com', password:'password',
    },
    {
      email:'sample3@sample.com', password:'password',
    },
    {
      email:'sample4@sample.com', password:'password',
    },
    {
      email:'sample5@sample.com', password:'password',
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