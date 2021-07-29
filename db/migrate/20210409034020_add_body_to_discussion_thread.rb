class AddBodyToDiscussionThread < ActiveRecord::Migration[6.0]
  def change
    add_column :discussion_threads, :body, :text
    add_column :discussion_threads, :title, :text
  end
end
