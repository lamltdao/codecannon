class RemoveThreadReferenceFromComment < ActiveRecord::Migration[6.0]
  def change
    remove_reference(:comments, :discussion_thread, index: false)
  end
end
