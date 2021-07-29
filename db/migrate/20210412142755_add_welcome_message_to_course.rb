class AddWelcomeMessageToCourse < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :welcome_message, :text
    add_column :courses, :overview, :text
  end
end