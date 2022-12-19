require 'rails_helper'
RSpec.describe 'プロジェクトモデル機能', type: :model do
  let!(:normal_user) { FactoryBot.create(:normal_user) }
  before do
    @current_user = User.find_by(email: "normal@sample.com")
  end

  describe 'バリデーションのテスト' do
    context 'プロジェクトのタイトルが空の場合' do
      it 'バリデーションにひっかる' do
        project = Project.new(title: '', deadline: '2032/10/01', description: '', user_id:@current_user.id)
        expect(project).not_to be_valid
      end
    end
    context 'プロジェクトの締切が空の場合' do
      it 'バリデーションにひっかる' do
        project = Project.new(title: 'タイトル', deadline: '', description: '', user_id:@current_user.id)
        expect(project).not_to be_valid
      end
    end
    context 'プロジェクトのタイトルが文字数超過の場合' do
      it 'バリデーションにひっかる' do
        project = Project.new(title: 'a'* 101, deadline: '2032/10/01', description: '', user_id:@current_user.id)
        expect(project).not_to be_valid
      end
    end
    context 'タスクのタイトルが100文字以内で記載され、締め切りが入力されている場合' do
      it 'バリデーションが通る' do
        project = Project.new(title: 'a'* 100, deadline: '2032/10/01', description: '', user_id:@current_user.id)
        expect(project).to be_valid
      end
    end
  end
end