require 'rails_helper'
RSpec.describe 'レベル更新機能', type: :system do
  describe 'レベルアップ' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    let!(:normal_user_status) { FactoryBot.create(:normal_user_status) }
    let!(:level1) { FactoryBot.create(:level1) }
    let!(:level2) { FactoryBot.create(:level2) }
    let!(:level3) { FactoryBot.create(:level3) }
    context 'ワークをクリアした場合' do
      before do
        visit new_user_session_path
        fill_in 'Eメール', with: 'normal@sample.com'
        fill_in 'パスワード', with: '123456'
        click_button 'ログイン'
      end
      it '経験値が閾値を超えた場合のみレベルアップする' do
        #exp0→100
        click_link 'ワーク開始'
        fill_in "yRecord", with:'やったこと'
        fill_in "wRecord", with:'わかったこと'
        click_button '次へ'
        fill_in "tRecord", with:'次やること'
        click_button '次へ'
        click_button '完了'
        click_button '閉じる'
        click_link 'ユーザー情報'
        expect(page).to have_content 'Lv.2' 
        expect(page).to have_content '100 exp'
        expect(page).to have_content '次のレベルまで: 200'
        #exp100→200
        visit root_path
        click_link 'ワーク開始'
        fill_in "yRecord", with:'やったこと'
        fill_in "wRecord", with:'わかったこと'
        click_button '次へ'
        fill_in "tRecord", with:'次やること'
        click_button '次へ'
        click_button '完了'
        click_button '閉じる'
        click_link 'ユーザー情報'
        expect(page).to have_content 'Lv.2' 
        expect(page).to have_content '200 exp'
        expect(page).to have_content '次のレベルまで: 100'
      end
    end
    context 'ワーク完了後' do
      before do
        visit new_user_session_path
        fill_in 'Eメール', with: 'normal@sample.com'
        fill_in 'パスワード', with: '123456'
        click_button 'ログイン'
      end
      it 'レベルアップした場合のみトースト通知が出る' do
        #exp0→100
        click_link 'ワーク開始'
        fill_in "yRecord", with:'やったこと'
        fill_in "wRecord", with:'わかったこと'
        click_button '次へ'
        fill_in "tRecord", with:'次やること'
        click_button '次へ'
        click_button '完了'
        expect(page).to have_content "レベルアップしました！"
        #exp100→200
        click_button '閉じる'
        visit root_path
        click_link 'ワーク開始'
        fill_in "yRecord", with:'やったこと'
        fill_in "wRecord", with:'わかったこと'
        click_button '次へ'
        fill_in "tRecord", with:'次やること'
        click_button '次へ'
        click_button '完了'
        expect(page).to_not have_content "レベルアップしました！"
      end
    end
  end
end