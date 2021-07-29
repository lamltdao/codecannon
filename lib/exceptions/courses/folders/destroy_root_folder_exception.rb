module Exceptions
  class Courses::Folders::DestroyRootFolderException < Exceptions::BaseException
    def initialize
      super(422, "Cannot delete root folders")
    end
  end
end
