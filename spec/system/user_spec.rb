require 'rails_helper'
RSpec.describe 'ユーザ管理機能', type: :system do
  describe '新規登録機能' do
    context 'ユーザを登録した場合' do
      it '一覧画面に遷移する' do
        visit new_user_registration_path
        fill_in 'ニックネーム', with: 'テスト太郎'
        fill_in 'Eメール', with: 'tarooo@sample.com'
        fill_in 'パスワード', with: '123456'
        fill_in 'パスワード（確認用）', with: '123456'
        click_button 'Sign up'
        expect(page).to have_content 'Your Projects'
      end
    end
    context 'ログインせずにタスク一覧画面に遷移した場合' do
      it 'ログイン画面に遷移する' do
        visit projects_path
        expect(page).to have_content '『CHAKKA!』とは？'
      end
    end
  end
  describe 'ログイン機能' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    before do
      visit new_user_session_path
      fill_in 'Eメール', with: 'normal@sample.com'
      fill_in 'パスワード', with: '123456'
      click_button 'Log in'
    end

    context '登録済みユーザでログインした場合' do
      it '一覧画面に遷移する' do
        expect(page).to have_content 'ログイン中'
      end

      it '自身の編集ページにアクセスできる' do
        visit projects_path
        find('#edit-link').click
        expect(page).to have_content 'Edit User'
      end

      it 'ログアウトするとログイン画面に遷移する' do
        find("#logout").click
        expect(page).to have_content '『CHAKKA!』とは？'
      end
    end
  end

  describe 'アクセス制限' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }

    context '一般ユーザがユーザ一覧画面にアクセスした場合' do
      let!(:normal_user) { FactoryBot.create(:normal_user) }
      before do
        visit new_user_session_path
        fill_in 'Eメール', with: 'normal@sample.com'
        fill_in 'パスワード', with: '123456'
        click_button 'Log in'
      end

      it '一覧画面に遷移する' do
        visit admins_users_path
        expect(page).to have_content 'Your Projects'
      end
    end
  end
end