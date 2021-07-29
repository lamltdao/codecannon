module Exceptions
  class Courses::Members::AddExistingMemberException < Exceptions::BaseException
    def initialize
      super(422, "User already enrolled")
    end
  end
end
