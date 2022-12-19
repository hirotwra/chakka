require 'rails_helper'
RSpec.describe '管理者機能', type: :system do
  describe '管理者機能' do
    let!(:administer) { FactoryBot.create(:administer) }
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    let!(:second_normal_user) { FactoryBot.create(:second_normal_user) }

    context '管理者ログインしていない場合' do
      before do
        visit new_user_session_path
        fill_in 'Eメール', with: 'normal@sample.com'
        fill_in 'パスワード', with: '123456'
        click_button 'Log in'
      end
      it '管理者作成フォームにアクセスできない' do
        visit new_admin_registration_path
        expect(page).to have_content 'Your Projects'
      end
    end

    context '管理者がログインした場合' do
      before do
        visit new_admin_session_path
        fill_in 'Email', with: 'admin@sample.com'
        fill_in 'Password', with: '123456'
        click_button 'Log in'
      end

      it 'ユーザ一覧画面にアクセスできる' do
        find("#users-index").click
        expect(page).to have_content '管理者画面:Users'
      end

      it 'ユーザを削除できる' do
        find("#users-index").click
        click_link '削除', match: :first
        expect{
          expect(page.accept_confirm).to eq "Are you sure?"
          expect(page).to have_content "アカウントを削除しました/admin"
          }
      end

      it '管理者を新規作成できる' do
        find("#users-index").click
        click_link '管理者作成'
        fill_in 'Email', with: 'admintest@sample.com'
        fill_in 'Password', with: '123456'
        fill_in 'Password confirmation', with: '123456'
        click_button 'Sign up'
        expect(page).to have_content 'admintest@sample.com'
      end
    end
  end
end