require "rails_helper"

RSpec.describe DiscussionThread, type: :model do
  context "association" do
    it { should belong_to(:user) }
    it { should belong_to(:course).optional }
    it { should have_many(:comments) }
  end

  describe "validation" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }

    context "body" do
      it "should be validated" do
        expect(discussion_thread).to validate_presence_of(:body)
      end
      it "should not be blank" do
        expect(discussion_thread).not_to allow_value("").for(:body)
      end
    end

    context "title" do
      it "should be validated" do
        expect(discussion_thread).to validate_presence_of(:title)
      end
      it "should not be blank" do
        expect(discussion_thread).not_to allow_value("").for(:title)
      end
    end
  end

  describe "#score" do
    let(:user) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user, username: "m_magician") }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }

    subject { discussion_thread.score }

    context "author upvotes" do
      before do
        user.likes(discussion_thread)
      end

      context "another user upvotes" do
        before do
          user2.likes(discussion_thread)
        end
        it "should return 2" do
          is_expected.to eq(2)
        end
      end

      context "another user downvotes" do
        before do
          user2.dislikes(discussion_thread)
        end
        it "should return 0" do
          is_expected.to eq(0)
        end
      end

      context "another user does not vote" do
        it "should return 1" do
          is_expected.to eq(1)
        end
      end
    end

    context "author downvotes" do
      before do
        user.dislikes(discussion_thread)
      end

      context "another user upvotes" do
        before do
          user2.likes(discussion_thread)
        end
        it "should return 0" do
          is_expected.to eq(0)
        end
      end

      context "another user downvotes" do
        before do
          user2.dislikes(discussion_thread)
        end
        it "should return -2" do
          is_expected.to eq(-2)
        end
      end

      context "another user does not vote" do
        it "should return -1" do
          is_expected.to eq(-1)
        end
      end
    end

    context "author does not vote" do
      context "another user upvotes" do
        before do
          user2.likes(discussion_thread)
        end
        it "should return 1" do
          is_expected.to eq(1)
        end
      end

      context "another user downvotes" do
        before do
          user2.dislikes(discussion_thread)
        end
        it "should return -1" do
          is_expected.to eq(-1)
        end
      end

      context "another user does not vote" do
        it "should return 0" do
          is_expected.to eq(0)
        end
      end
    end
  end

  describe "#last_updated" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }

    subject { discussion_thread.last_updated }

    context do
      it "should be less than or equal to the current time" do
        is_expected.to be <= Time.now.to_i
      end
    end
  end

  describe "#display_json" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }
    let(:json_obj) { discussion_thread.display_json(user) }

    context "include fields" do
      it "#id" do
        expect(json_obj["id"]).to eq(discussion_thread.id)
      end
      it "#body" do
        expect(json_obj["body"]).to eq(discussion_thread.body)
      end
      it "#title" do
        expect(json_obj["title"]).to eq(discussion_thread.title)
      end
      it "#vote" do
        expect(json_obj["vote"]).to eq(user.get_current_user_vote(discussion_thread))
      end
      it "#last_updated" do
        expect(json_obj["last_updated"]).to eq(discussion_thread.last_updated)
      end
      it "#user.id" do
        expect(json_obj["user"]["id"]).to eq(discussion_thread.user.id)
      end
      it "#user.display_name" do
        expect(json_obj["user"]["display_name"]).to eq(discussion_thread.user.display_name)
      end
      it "#user.avatar_url" do
        expect(json_obj["user"]["avatar_url"]).to eq(discussion_thread.user.avatar_url)
      end
    end
  end
end
