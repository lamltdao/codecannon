module Exceptions
  class Courses::Folders::DestroyFolderWithChildrenException < Exceptions::BaseException
    def initialize
      super(422, "Cannot delete folders with subfolders or files")
    end
  end
end
