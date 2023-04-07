require 'rails_helper'
RSpec.describe 'ユーザ管理機能', type: :system do
  describe '新規登録機能' do
    context 'ユーザを登録した場合' do
      it '一覧画面に遷移する' do
        visit new_user_registration_path
        fill_in 'Eメール', with: 'tarooo@sample.com'
        fill_in 'パスワード', with: '123456'
        fill_in 'パスワード（確認用）', with: '123456'
        click_button 'アカウント登録'
        binding.pry
        expect(page).to have_content 'メインタブ'
      end
    end
    context 'ログインせずに一覧画面に遷移した場合' do
      it 'ログイン画面に遷移する' do
        visit maintab_path
        expect(page).to have_content '『CHAKKA!』とは？'
      end
    end
  end
  describe 'ログイン機能' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    let!(:normal_user_status) { FactoryBot.create(:normal_user_status) }
    before do
      visit new_user_session_path
      fill_in 'Eメール', with: 'normal@sample.com'
      fill_in 'パスワード', with: '123456'
      click_button 'ログイン'
    end

    context '登録済みユーザでログインした場合' do
      it '一覧画面に遷移する' do
        expect(page).to have_content 'ログイン中'
      end

      it '自身の編集ページにアクセスできる' do
        visit maintab_path
        find('#edit-link').click
        expect(page).to have_content '登録情報'
      end

      it 'ログアウトするとログイン画面に遷移する' do
        find("#logout").click
        expect(page).to have_content '『CHAKKA!』とは？'
      end
    end
  end

  describe 'アクセス制限' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    let!(:normal_user_status) { FactoryBot.create(:normal_user_status) }
    let!(:report) { FactoryBot.create(:report) }
    context '一般ユーザが管理者用画面にアクセスした場合' do
      before do
        visit new_user_session_path
        fill_in 'Eメール', with: 'normal@sample.com'
        fill_in 'パスワード', with: '123456'
        click_button 'ログイン'
      end

      it 'メインタブ' do
        visit admins_users_path
        expect(page).to have_content 'メインタブ'
      end
    end
  end
end