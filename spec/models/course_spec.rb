require "rails_helper"

RSpec.describe Course, type: :model do
  context "validation" do
    subject { FactoryBot.build(:course) }

    it { is_expected.to validate_presence_of(:welcome_message) }
    it { is_expected.to validate_presence_of(:overview) }
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:admin) }
  end

  context "association" do
    it { should have_many(:course_participations).with_foreign_key("course_id") }
    it { should have_many(:participants) }
    it { should belong_to(:admin).class_name("User") }
  end

  describe '#course' do
    let(:admin) { FactoryBot.create(:user) }
    let(:course) { FactoryBot.create(:course, admin: admin) }

    subject { course.course }

    context do
      it 'should return itself' do
        is_expected.to eq(course)
      end
    end
  end
end
