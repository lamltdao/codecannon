class CreateDiscussionThreads < ActiveRecord::Migration[6.0]
  def change
    create_table :discussion_threads do |t|
      t.references :user
      t.references :course
      t.timestamps
    end
  end
end
