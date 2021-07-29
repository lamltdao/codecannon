class MemberMailer < ApplicationMailer
  def course_participation_confirmation_email
    @course = params[:course]
    @member = params[:member]
    @confirmation_token = params[:confirmation_token]
    @url = appendQuery(confirm_course_users_url(@course.id), {
      confirmation_token: @confirmation_token
    })
    mail(to: @member.email, subject: "Confirm your participation")
  end

  def appendQuery(url, query = {})
    parsed_url = Addressable::URI.parse(url)
    parsed_url.query_values = (parsed_url.query_values || {}).merge(query)
    stringified_url = parsed_url.to_s
  end
end
