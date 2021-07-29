class Courses::MembersController < Courses::BaseController
  before_action :authenticate_user!, except: [:confirm]
  before_action :set_gon_for_course, except: [:confirm, :send_confirmation]

  def index
    authorize @course, policy_class: Courses::MemberPolicy
    gon.members = {
      admin: [@course.admin.as_json(only: [:email], methods: [:display_name])],
      participants: @course.participants.map { |p| p.as_json(only: [:email], methods: [:display_name]) }
    }
  end

  # POST /courses/:id/members/send_confirmation
  def send_confirmation
    authorize @course, policy_class: Courses::MemberPolicy
    new_member = User.find_by_email(params[:member_email])
    if validate_new_member(new_member)
      token = generateToken
      MemberMailer.with(member: new_member, course: @course, confirmation_token: token).course_participation_confirmation_email.deliver_later
      cp = @course.course_participations.find_by_participant_id(new_member.id)
      if cp
        cp.confirmation_sent_at = Time.now
        cp.confirmation_token = token
        cp.save!
      else
        @course.course_participations.create({participant_id: new_member.id, confirmation_sent_at: Time.now, confirmation_token: token})
        @course.save!
      end
    end
  rescue Exceptions::Courses::Members::AddExistingMemberException, Exceptions::Courses::Members::AddAdminException => e
    render json: {errors: [e.message]}, status: e.status
  rescue ActiveRecord::RecordNotFound => e
    render json: {errors: ["Email not found"]}, status: :not_found
  rescue ActiveRecord::RecordNotSaved => e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end

  # GET /courses/members/confirm?confirmation_token=...
  def confirm
    token = params[:confirmation_token]
    course_participation = @course.course_participations.find { |cp| cp.confirmation_token == token }
    if course_participation
      course_participation.confirmed_at = Time.now
      course_participation.save!
    end
    # shoud have sth like flash here
    redirect_to after_confirm_path
  end

  private

  def generateToken(length = 20)
    # Copied from Devise's friendly_token
    rlength = (length * 3) / 4
    SecureRandom.urlsafe_base64(rlength).tr("lIO0", "sxyz")
  end

  def validate_new_member(member)
    if !member
      raise ActiveRecord::RecordNotFound
    end
    if @course.participants.include?(member)
      raise Exceptions::Courses::Members::AddExistingMemberException
    end
    if @course.admin == member
      raise Exceptions::Courses::Members::AddAdminException
    end
    true
  end

  def after_confirm_path
    return home_path if current_user.present?
    new_user_session_path
  end
end
