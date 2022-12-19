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
        click_button 'ログイン'
      end
      it '管理者作成フォームにアクセスできない' do
        visit new_admin_registration_path
        expect(page).to have_content 'プロジェクト一覧'
      end
    end

    context '管理者がログインした場合' do
      before do
        visit new_admin_session_path
        fill_in 'admin_email', with: 'admin@sample.com'
        fill_in 'admin_password', with: '123456'
        click_button 'ログイン'
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
        fill_in 'admin_email', with: 'admintest@sample.com'
        fill_in 'admin_password', with: '123456'
        fill_in 'admin_password_confirmation', with: '123456'
        click_button '登録'
        expect(page).to have_content 'admintest@sample.com'
      end
    end
  end
end