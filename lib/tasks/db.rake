namespace :db do
  namespace :staging do
    desc "Seed a batch of data on staging"
    task :seed_data_for_courses => :environment do
      # Generate 50 users
      users = 50.times.map do |i|
        id = '%02i' % i
        username = "user#{id}"
        password = id + id + id
        email = "user#{id}@codecannon.net"
        fname = FFaker::NameVN.first_name
        lname = FFaker::NameVN.last_name
        site_admin = (i < 5)
        User.create(
          username: username, password: password, email: email, fname: fname,
          lname: lname, site_admin: site_admin, password_confirmation: password
        )
      end

      def random_markdown_text
        uri = URI('https://jaspervdj.be/lorem-markdownum/markdown.txt?no-code=true')
        res = Net::HTTP.get_response(uri)
        return res.body if res.is_a?(Net::HTTPSuccess)
        return "This ***is*** **Mark***down*"
      end

      # Generate 10 courses
      courses = 10.times.map do |i|
        id = "#{i}0#{i}"
        name = "#{FFaker::CoursesFR::Mathematiques.lesson.capitalize} #{id}"
        admin = users.sample
        welcome_message = FFaker::DizzleIpsum.words(3).join(' ')
        overview = random_markdown_text
        admin.admin_courses.create(
          name: name, overview: overview, welcome_message: welcome_message
        )
      end

      # Each course with some students
      courses.each do |course|
        course.participants = users.filter {|user| user != course.admin}.sample((5..30).to_a.sample)
      end

      # generate threads and comments for discussions
      courses.each do |course|
        thread_count = (5..10).to_a.sample
        thread_count.times do
          thread = course.discussion_threads.create(user: course.admin, body: random_markdown_text, title: FFaker::DizzleIpsum.word)
          comment_count = (3..15).to_a.sample
          comment_count.times do
            comment = thread.comments.create!(author: course.participants.sample, body: FFaker::DizzleIpsum.words(2).join(' '))
            reply_count = (0..3).to_a.sample
            reply_count.times do
              comment.comments.create!(author: course.participants.sample, body: FFaker::DizzleIpsum.word)
            end
          end
        end
      end
    end
  end
end
