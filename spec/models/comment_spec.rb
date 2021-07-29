require "rails_helper"

RSpec.describe Comment, type: :model do
  context "association" do
    it { should belong_to(:author).class_name("User") }
    it { should belong_to(:commentable) }
    it { should have_many(:comments) }
  end

  describe "validation" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }
    let(:comment) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "DiscussionThread", commentable_id: discussion_thread.id) }

    context "body" do
      it "should be validated" do
        expect(comment).to validate_presence_of(:body)
      end
      it "should not be blank" do
        expect(comment).not_to allow_value("").for(:body)
      end
    end
  end

  describe "#score" do
    let(:user) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user, username: "m_magician") }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }
    let(:comment) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "DiscussionThread", commentable_id: discussion_thread.id) }
    let(:reply) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "Comment", commentable_id: comment.id) }

    context "comment" do
      subject { comment.score }

      context "author upvotes" do
        before do
          user.likes(comment)
        end

        context "another user upvotes" do
          before do
            user2.likes(comment)
          end
          it "should return 2" do
            is_expected.to eq(2)
          end
        end

        context "another user downvotes" do
          before do
            user2.dislikes(comment)
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
          user.dislikes(comment)
        end

        context "another user upvotes" do
          before do
            user2.likes(comment)
          end
          it "should return 0" do
            is_expected.to eq(0)
          end
        end

        context "another user downvotes" do
          before do
            user2.dislikes(comment)
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
            user2.likes(comment)
          end
          it "should return 1" do
            is_expected.to eq(1)
          end
        end

        context "another user downvotes" do
          before do
            user2.dislikes(comment)
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

    context "reply" do
      subject { reply.score }

      context "author upvotes" do
        before do
          user.likes(reply)
        end

        context "another user upvotes" do
          before do
            user2.likes(reply)
          end
          it "should return 2" do
            is_expected.to eq(2)
          end
        end

        context "another user downvotes" do
          before do
            user2.dislikes(reply)
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
          user.dislikes(reply)
        end

        context "another user upvotes" do
          before do
            user2.likes(reply)
          end
          it "should return 0" do
            is_expected.to eq(0)
          end
        end

        context "another user downvotes" do
          before do
            user2.dislikes(reply)
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
            user2.likes(reply)
          end
          it "should return 1" do
            is_expected.to eq(1)
          end
        end

        context "another user downvotes" do
          before do
            user2.dislikes(reply)
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
  end

  describe "#last_updated" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }
    let(:comment) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "DiscussionThread", commentable_id: discussion_thread.id) }
    let(:reply) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "Comment", commentable_id: comment.id) }

    context "comment" do
      it "should be less than or equal to the current time" do
        expect(comment.last_updated).to be <= Time.now.to_i
      end
    end

    context "reply" do
      it "should be less than or equal to the current time" do
        expect(reply.last_updated).to be <= Time.now.to_i
      end
    end
  end

  describe "#display_json" do
    let(:user) { FactoryBot.create(:user) }
    let(:discussion_thread) { FactoryBot.create(:discussion_thread, user_id: user.id) }
    let(:comment) { FactoryBot.create(:comment, author_id: user.id, commentable_type: "DiscussionThread", commentable_id: discussion_thread.id) }
    let(:json_obj) { comment.display_json(user) }

    context "include fields" do
      it "#id" do
        expect(json_obj["id"]).to eq(comment.id)
      end
      it "#body" do
        expect(json_obj["body"]).to eq(comment.body)
      end
      it "#vote" do
        expect(json_obj["vote"]).to eq(user.get_current_user_vote(comment))
      end
      it "#comments" do
        expect(json_obj["comments"]).to eq(comment.comments)
      end
      it "#author.display_name" do
        expect(json_obj["author"]["display_name"]).to eq(comment.author.display_name)
      end
      it "#author.avatar_url" do
        expect(json_obj["author"]["avatar_url"]).to eq(comment.author.avatar_url)
      end
    end
  end
end
