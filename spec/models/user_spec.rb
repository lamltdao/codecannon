require "rails_helper"

RSpec.describe User, type: :model do
  describe "validation" do
    subject { FactoryBot.build(:user) }

    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to respond_to(:password) }
    it { is_expected.to respond_to(:fname) }
    it { is_expected.to respond_to(:lname) }

    describe "username" do
      it { is_expected.to validate_presence_of(:username) }
      it { is_expected.to validate_uniqueness_of(:username).case_insensitive }

      context "regex_matching" do
        it "reject too short" do
          should_not allow_value("low").for(:username)
        end

        it "reject too long" do
          should_not allow_value("onetwothree_123456789").for(:username)
        end

        it "reject contains disallowed char" do
          should_not allow_value("one.two").for(:username)
          should_not allow_value("three-four").for(:username)
          should_not allow_value("five+six").for(:username)
          should_not allow_value("seven eight").for(:username)
        end

        it "accepts good username" do
          should allow_value("l0w13_").for(:username)
          should allow_value("__l0w13__").for(:username)
        end
      end
    end
  end

  context "association" do
    it { should have_many(:admin_courses).with_foreign_key("admin_id").class_name("Course") }
    it { should have_many(:course_participations).with_foreign_key("participant_id") }
    it { should have_many(:participating_courses) }
    it { should have_one_attached(:avatar) }
  end

  describe "#display_name" do
    let(:fname) { FFaker::Name.first_name }
    let(:lname) { FFaker::Name.last_name }
    let(:username) { "_l0W13_" }
    let(:user) { FactoryBot.create(:user, fname: fname, lname: lname, username: username) }

    subject { user.display_name }

    context "fname and lname present" do
      it "return full name of person" do
        is_expected.to eq(fname + " " + lname)
      end
    end

    context "fname and lname not present" do
      let(:fname) { nil }
      let(:lname) { nil }

      it "return username" do
        is_expected.to eq(username)
      end
    end

    context "lname missing" do
      let(:lname) { nil }

      it "return username" do
        is_expected.to eq(username)
      end
    end
  end

  describe "#avatar_url" do
    let(:user) { FactoryBot.create(:user) }

    subject { user.avatar_url }

    context "avatar is attached" do
      before do
        user.avatar.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        user.save!
      end

      it "should not return nil" do
        is_expected.not_to eq(nil)
      end
    end

    context "avatar not attached" do
      it "should return nil" do
        is_expected.to eq(nil)
      end
    end
  end

  describe "#login" do
    let(:user) { FactoryBot.build(:user, email: nil) }

    subject { user.login }

    context 'email is nil' do
      it 'return username' do
        is_expected.to eq(user.username)
      end
    end

    context 'username is nil' do
      let(:user) { FactoryBot.build(:user, username: nil) }

      it 'return email' do
        is_expected.to eq(user.email)
      end
    end
  end

  describe "#get_current_user_vote" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }
    let(:comment) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "DiscussionThread", commentable_id: discussion_thread.id) }
    let(:reply) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "Comment", commentable_id: comment.id) }

    context "get user's vote for thread" do
      context "upvote" do
        before do
          user.likes(discussion_thread)
        end
        subject { user.get_current_user_vote(discussion_thread) }

        it "should return Upvoted" do
          is_expected.to eq("Upvoted")
        end
      end
      context "downvote" do
        before do
          user.dislikes(discussion_thread)
        end
        subject { user.get_current_user_vote(discussion_thread) }

        it "should return Downvoted" do
          is_expected.to eq("Downvoted")
        end
      end
      context "novote" do
        subject { user.get_current_user_vote(discussion_thread) }

        it "should return Novoted" do
          is_expected.to eq("Novoted")
        end
      end
    end

    context "get user's vote for comment" do
      context "upvote" do
        before do
          user.likes(comment)
        end
        subject { user.get_current_user_vote(comment) }

        it "should return Upvoted" do
          is_expected.to eq("Upvoted")
        end
      end
      context "downvote" do
        before do
          user.dislikes(comment)
        end
        subject { user.get_current_user_vote(comment) }

        it "should return Downvoted" do
          is_expected.to eq("Downvoted")
        end
      end
      context "novote" do
        subject { user.get_current_user_vote(comment) }

        it "should return Novoted" do
          is_expected.to eq("Novoted")
        end
      end
    end

    context "get user's vote for reply" do
      context "upvote" do
        before do
          user.likes(reply)
        end
        subject { user.get_current_user_vote(reply) }

        it "should return Upvoted" do
          is_expected.to eq("Upvoted")
        end
      end
      context "downvote" do
        before do
          user.dislikes(reply)
        end
        subject { user.get_current_user_vote(reply) }

        it "should return Downvoted" do
          is_expected.to eq("Downvoted")
        end
      end
      context "novote" do
        subject { user.get_current_user_vote(reply) }

        it "should return Novoted" do
          is_expected.to eq("Novoted")
        end
      end
    end
  end
end
