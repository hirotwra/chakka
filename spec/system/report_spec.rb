require 'rails_helper'

RSpec.describe '学習レポート管理機能', type: :system do
  describe '新規作成機能' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    before do
      visit new_user_session_path
      fill_in 'Eメール', with: 'normal@sample.com'
      fill_in 'パスワード', with: '123456'
      click_button 'ログイン'
    end
    context '学習記録を作成時' do
      it '作成に成功する' do
        click_link 'ワーク開始'
        fill_in "yRecord", with:'やったこと'
        fill_in "wRecord", with:'わかったこと'
        click_button '次へ'
        fill_in "tRecord", with:'次やること'
        click_button '次へ'
        rescue Selenium::WebDriver::Error::NoAlertPresentError
        find('#submit-btn').click
        expect(page).to have_content 'ワーク完了！'
      end
      it 'ステップを移動してもフォームの内容が消えない' do
        click_link 'ワーク開始'
        fill_in "yRecord", with:'入力内容Y'
        fill_in "wRecord", with:'入力内容W'
        click_button '次へ'
        fill_in "tRecord", with:'入力内容t'
        click_button '前へ'
        expect(page).to have_content '入力内容Y'
        expect(page).to have_content '入力内容W'
        click_button '次へ'
        expect(page).to have_content '入力内容t'
      end
    end
  end

end