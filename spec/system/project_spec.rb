require 'rails_helper'

RSpec.describe 'プロジェクト管理機能', type: :system do
  describe '新規作成機能' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    before do
      visit new_user_session_path
      fill_in 'Eメール', with: 'normal@sample.com'
      fill_in 'パスワード', with: '123456'
      click_button 'ログイン'
    end
    context 'プロジェクトを新規作成した場合' do
      it '作成したタスクが表示される' do
        click_link '新規プロジェクト'
        fill_in "title-input", with:'お買い物'
        fill_in "description-input", with:'イオンに行く'
        fill_in "deadline-input", with:'2032/10/01'
        rescue Selenium::WebDriver::Error::NoAlertPresentError
        find('#submit-btn').click
        expect(page).to have_content 'お買い物'
      end
    end
  end

  describe '一覧表示機能' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    before do
      visit new_user_session_path
      fill_in 'Eメール', with: 'normal@sample.com'
      fill_in 'パスワード', with: '123456'
      click_button 'ログイン'
      FactoryBot.create(:project, user:normal_user) 
      FactoryBot.create(:project_secound, user:normal_user)
      FactoryBot.create(:project_third, user:normal_user)
      visit projects_path
    end
    context '一覧画面に遷移した場合' do
      it '最後に作成したプロジェクトが表示される' do
        expect(page).to have_content 'title3'
      end

      it 'プロジェクトを作成した数だけタブが表示される' do
        expect(page.all('.react-tabs__tab').count).to eq 3
      end
    end
  end
end