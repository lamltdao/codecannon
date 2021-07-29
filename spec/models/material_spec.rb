require "rails_helper"

RSpec.describe Material, type: :model do
  context "association" do
    it { should belong_to(:creator).class_name("User") }
    it { should belong_to(:course) }
    it { should belong_to(:parent_folder).class_name("Folder").optional }
    it { should have_one_attached(:file) }
  end

  describe "#Scope" do
    let(:admin) { FactoryBot.create(:user) }
    let(:course) { FactoryBot.create(:course, admin_id: admin.id) }
    let(:root_folder_1) do
      FactoryBot.create(:folder, course_id: course.id, creator_id: admin.id)
    end
    let(:root_file_1) do
      FactoryBot.build(:material, course_id: course.id, creator_id: admin.id)
    end
    let(:root_file_2) do
      FactoryBot.build(:material, course_id: course.id, creator_id: admin.id)
    end
    let(:sub_file_1) do
      FactoryBot.build(:material, course_id: course.id, parent_folder_id: root_folder_1.id, creator_id: admin.id)
    end

    context ".root_files" do
      before(:each) do
        root_file_1.file.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        root_file_2.file.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        sub_file_1.file.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        root_file_1.save!
        root_file_2.save!
        sub_file_1.save!
      end
      subject { Material.root_files }

      it "should return an array of root files" do
        is_expected.to include(root_file_1, root_file_2)
        is_expected.not_to include(sub_file_1)
      end
    end
  end

  describe "Attribute validations" do
    let(:admin) { FactoryBot.create(:user) }
    let(:course) { FactoryBot.create(:course, admin_id: admin.id) }
    let(:root_file_1) do
      FactoryBot.build(:material, course_id: course.id, creator_id: admin.id)
    end
    context "title" do
      before(:each) do
        root_file_1.file.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        root_file_1.save!
      end
      it "should be validated" do
        expect(root_file_1).to validate_presence_of(:title)
      end
      it "should not be blank" do
        expect(root_file_1).not_to allow_value("").for(:title)
      end
    end

    context "file" do
      before(:each) do
        root_file_1.file.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        root_file_1.save!
      end

      it "should be present" do
        expect(root_file_1).to validate_presence_of(:file)
      end
      it "should be attached" do
        expect(root_file_1.file).to be_attached
      end
    end
  end
end
