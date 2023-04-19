require 'rails_helper'

RSpec.describe 'jobs', type: :job do
  describe 'スコア更新' do
    let!(:normal_user) { FactoryBot.create(:normal_user) }
    let!(:second_normal_user) { FactoryBot.create(:second_normal_user) }
    let!(:third_normal_user) { FactoryBot.create(:third_normal_user) }
    let!(:normal_user_status) { FactoryBot.create(:normal_user_status) }
    let!(:second_normal_user_status) { FactoryBot.create(:second_normal_user_status) }
    let!(:third_normal_user_status) { FactoryBot.create(:third_normal_user_status) }
    context 'ジョブ実行時' do
      it 'enqueue job' do
        ActiveJob::Base.queue_adapter = :test #jobを起動するアダプターtest環境ではtestにしておく
        ScoreUpdateJob.perform_later
        expect(ScoreUpdateJob).to have_been_enqueued #キューに入ったかを確認する
      end

      it '前回ワーク達成から2日以内ならスコア+100' do
        ActiveJob::Base.queue_adapter = :test
        expect do
          ScoreUpdateJob.perform_now
          normal_user_status.reload
        end.to change { normal_user_status.score }.by(100)
      end
      it '前回ワーク達成から5日以上ならスコア-50' do
        ActiveJob::Base.queue_adapter = :test
        expect do
          ScoreUpdateJob.perform_now
          second_normal_user_status.reload
        end.to change { second_normal_user_status.score }.by(-50)
      end
      it '前回ワーク達成から3~4日ならスコア変動無し' do
        ActiveJob::Base.queue_adapter = :test
        expect do
          ScoreUpdateJob.perform_now
          third_normal_user_status.reload
        end.to change { third_normal_user_status.score }.by(0)
      end
    end
  end
end
