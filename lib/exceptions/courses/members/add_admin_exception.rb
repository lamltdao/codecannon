module Exceptions
  class Courses::Members::AddAdminException < Exceptions::BaseException
    def initialize
      super(422, "Cannot add course admin")
    end
  end
end
