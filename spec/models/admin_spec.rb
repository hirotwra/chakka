require 'rails_helper'

RSpec.describe '管理者ユーザモデル機能', type: :model do
  describe 'バリデーションのテスト' do
    let!(:administer) { FactoryBot.create(:administer) }

    context 'ユーザのメールアドレスが空文字の場合' do
      it 'バリデーションに失敗する' do
        admin = Admin.create(
          email: "",
          password: "MyString")
        expect(admin).not_to be_valid
      end
    end

    context 'ユーザのパスワードが空文字の場合' do
      it 'バリデーションに失敗する' do
        admin = Admin.create(
          email: "piyo@piyopiyo.com",
          password: "")
        expect(admin).not_to be_valid
      end
    end

    context 'ユーザのメールアドレスがすでに使用されていた場合' do
      it 'バリデーションに失敗する' do
        admin = Admin.create(
          email: "admin@sample.com",
          password: "MyString")
        expect(admin).not_to be_valid
      end
    end

    context 'ユーザのパスワードが6文字未満の場合' do
      it 'バリデーションに失敗する' do
        admin = Admin.create(
          email: "admin@sample.com",
          password: "1234")
        expect(admin).not_to be_valid
      end
    end

    context 'ユーザのメールアドレスが使われていない値で、かつパスワードが6文字以上の場合' do
      it 'バリデーションに成功する' do
        admin = Admin.create(
          email: "piyo@piyopiyo.com",
          password: "MyString")
        expect(admin).to be_valid
      end
    end
  end
end