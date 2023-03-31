require 'rails_helper'
RSpec.describe '学習記録モデル機能', type: :model do
  let!(:normal_user) { FactoryBot.create(:normal_user) }
  before do
    @current_user = User.find_by(email: "normal@sample.com")
  end

  describe 'バリデーションのテスト' do
    context '全ての値が存在するな場合' do
      it 'バリデーションが通る' do
        report = Report.new(y_record: 'やったこと', w_record: 'わかったこと', t_record: '次やること', user_id:@current_user.id)
        expect(report).to be_valid
      end
    end
    context '空の値が存在する場合' do
      it 'バリデーションにひっかる' do
        report = Report.new(y_record: '', w_record: 'わかったこと', t_record: '次やること', user_id:@current_user.id)
        expect(report).not_to be_valid
      end
    end
  end
end