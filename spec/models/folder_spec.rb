require "rails_helper"

RSpec.describe Folder, type: :model do
  context "association" do
    it { should belong_to(:creator).class_name("User") }
    it { should belong_to(:course) }
    it { should belong_to(:parent_folder).class_name("Folder").optional }
    it { should have_many(:children_folders).class_name("Folder") }
    it { should have_many(:files).class_name("Material") }
  end

  describe "#Scope" do
    let(:admin) { FactoryBot.create(:user) }
    let(:course) { FactoryBot.create(:course, admin_id: admin.id) }
    let(:root_folder_1) do
      FactoryBot.create(:folder, course_id: course.id, creator_id: admin.id)
    end
    let(:root_folder_2) do
      FactoryBot.create(:folder, course_id: course.id, creator_id: admin.id)
    end
    let(:subfolder_1) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: root_folder_1.id, creator_id: admin.id)
    end
    let(:subfolder_2) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: root_folder_1.id, creator_id: admin.id)
    end
    let(:sub_of_subfolder_2) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: subfolder_2.id, creator_id: admin.id)
    end

    context ".root_folders" do
      subject { Folder.root_folders }

      it "should return an array of root folders" do
        is_expected.to include(root_folder_1, root_folder_2)
        is_expected.not_to include(subfolder_1, subfolder_2, sub_of_subfolder_2)
      end
    end
  end

  describe "#folder_path" do
    let(:admin) { FactoryBot.create(:user) }
    let(:course) { FactoryBot.create(:course, admin_id: admin.id) }
    let(:root_folder) do
      FactoryBot.create(:folder, course_id: course.id, creator_id: admin.id)
    end
    let(:subfolder_1) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: root_folder.id, creator_id: admin.id)
    end
    let(:subfolder_2) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: subfolder_1.id, creator_id: admin.id)
    end

    subject { subfolder_2.folder_path }

    context "normal path flow" do
      it "should return normally" do
        is_expected.to eq([root_folder, subfolder_1, subfolder_2])
      end
    end

    context "infinite recurse" do
      before do
        root_folder.update(parent_folder_id: subfolder_2.id)
      end

      it "should raise error" do
        expect { subfolder_2.folder_path }.to raise_error("Folder stack limit exceeded")
      end
    end
  end

  describe "#destroy!" do
    let(:admin) { FactoryBot.create(:user) }
    let(:course) { FactoryBot.create(:course, admin_id: admin.id) }
    let(:root_folder) do
      FactoryBot.create(:folder, course_id: course.id, creator_id: admin.id)
    end
    let(:subfolder) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: root_folder.id, creator_id: admin.id)
    end
    let(:sub_of_subfolder) do
      FactoryBot.create(:folder, course_id: course.id, parent_folder_id: subfolder.id, creator_id: admin.id)
    end
    let(:subfile_of_subfolder) do
      FactoryBot.build(:material, course_id: course.id, parent_folder_id: subfolder.id, creator_id: admin.id)
    end

    context "destroy a non-root folder without children" do
      it "should successfully destroy" do
        expect { subfolder.destroy! }.not_to raise_error()        
      end
    end

    context "destroy root folder" do
      it "should raise error" do
        expect { root_folder.destroy! }.to raise_error(Exceptions::DestroyRootFolderException)
      end
    end

    context "destroy folder with subfolder" do
      before do
        sub_of_subfolder
      end

      it "should raise error" do
        expect { subfolder.destroy! }.to raise_error(Exceptions::DestroyFolderWithChildrenException)
      end
    end

    context "destroy folder with subfile" do
      before do
        subfile_of_subfolder.file.attach(
          io: File.open("app/assets/images/temporarylogo.png"),
          filename: "temporarylogo.png",
          content_type: "image/png"
        )
        subfile_of_subfolder.save!
      end

      it "should raise error" do
        expect { subfolder.destroy! }.to raise_error(Exceptions::DestroyFolderWithChildrenException)
      end
    end
  end
end
