[
  ['はじめの一歩', 'Chakka!をはじめた。', image: File.open('./app/assets/images/test1.jpg')],
  ['レベルアップ!', 'はじめてレベルアップをした。', image: File.open('./app/assets/images/test2.jpg')],
  ['スコア1000', '1000スコアを達成した。', image: File.open('./app/assets/images/test3.jpg')],
  ['ナンバーワン!', 'ランキング一位を達成した。', image: File.open('./app/assets/images/test4.jpg')]
].each do |name, description, image|
  Badge.create!(
    { name: name, description: description, image: image}
  )
end