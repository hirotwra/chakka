[
  [1, 1, 0],#はじめの一歩
  [2, 1, 1],#レベルアップ！
  [3, 2, 1000],#スコア1000
  [4, 3, 1]#ナンバーワン!
].each do |num, check_point, value|
  BadgeSetting.create!(
    { badge_id: num, check_point: check_point, value: value}
  )
#check_point 1:level値, 2:score値, 3,ランキング順位