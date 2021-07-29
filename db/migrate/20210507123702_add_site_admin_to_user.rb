class AddSiteAdminToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :site_admin, :boolean, default: false
  end
end
