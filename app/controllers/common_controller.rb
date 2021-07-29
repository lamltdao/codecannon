class CommonController < ApplicationController
  layout "landing"

  def home
    unless current_user.present?
      redirect_to root_path
      return
    end

    gon.user = current_user.slice(:username, :site_admin)
    gon.courses = {
      adminCourses: current_user.admin_courses,
      participatingCourses: current_user.participating_courses
    }
  end

  def landing
    redirect_to home_path if current_user.present?
  end

  def account_confirmation
    redirect_to home_path if current_user.present? && current_user.confirmed?
  end

  def forgot_password
    redirect_to home_path if current_user.present? && current_user.confirmed?
  end
end
