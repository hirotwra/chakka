require 'rails_helper'

RSpec.describe 'ユーザモデル機能', type: :model do
  describe 'バリデーションのテスト' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }

    context 'ユーザのメールアドレスが空文字の場合' do
      it 'バリデーションに失敗する' do
        user = User.create(
          email: "",
          password: "MyString")
        expect(user).not_to be_valid
      end
    end

    context 'ユーザのパスワードが空文字の場合' do
      it 'バリデーションに失敗する' do
        user = User.create(
          email: "piyo@piyopiyo.com",
          password: "")
        expect(user).not_to be_valid
      end
    end

    context 'ユーザのメールアドレスがすでに使用されていた場合' do
      it 'バリデーションに失敗する' do
        user = User.create(
          email: "normal@sample.com",
          password: "MyString")
        expect(user).not_to be_valid
      end
    end

    context 'ユーザのパスワードが6文字未満の場合' do
      it 'バリデーションに失敗する' do
        user = User.create(
          email: "piyo@piyopiyo.com",
          password: "1234")
        expect(user).not_to be_valid
      end
    end

    context 'メールアドレスが使われていない値で、かつパスワードが6文字以上の場合' do
      it 'バリデーションに成功する' do
        user = User.create(
          email: "piyo@piyopiyo.com",
          password: "MyString")
        expect(user).to be_valid
      end
    end
  end
end