class ApplicationMailer < ActionMailer::Base
  default from: Settings.codecannon_email_address
  layout "mailer"
end
