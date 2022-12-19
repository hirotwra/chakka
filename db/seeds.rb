# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Project.create!(
  [
    {
      title: 'オリジナルアプリ制作', deadline:'2022-12-20', description:'seedにより作成1', user_id:1
    },
    {
      title: 'おおそおじ', deadline:'2022-12-31', description:'seedにより作成2', user_id:1
    },
    {
      title: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV', 
      deadline:'2022-12-23', description:'seedにより作成3,長文', user_id:1
    },
    {
      title: 'オリジナルアプリ制作', deadline:'2022-12-25', description:'seedにより作成4', user_id:1
    },
    {
      title: 'オリジナルアプリ制作', deadline:'2023-12-30', description:'seedにより作成5', user_id:1
    },
  ]
)

User.create!(
  [
    {
      name:'seed1', email:'sample1@sample.com', password:'password',
    },
    {
      name:'seed2', email:'sample2@sample.com', password:'password',
    },
    {
      name:'seed3', email:'sample3@sample.com', password:'password',
    },
    {
      name:'seed4', email:'sample4@sample.com', password:'password',
    },
    {
      name:'seed5', email:'sample5@sample.com', password:'password',
    },
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
    },
  ]
)