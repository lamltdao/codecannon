source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3', '>= 6.0.3.4'
# Send data from backend to react frontend
gem 'gon'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.2', '>= 1.2.3'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'
# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# policies
gem 'pundit'

# Config file (settings.yml)
gem 'config'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

gem 'devise'

gem 'devise-async'

gem 'active_model_serializers'
# Use this gem for voting feature
gem 'acts_as_votable'

# ffaker to generate random testdata without thinking
# refer to https://www.rubydoc.info/github/ffaker/ffaker/FFaker
gem 'ffaker'

gem "sidekiq"

gem "dotenv-rails", "~> 2.7", ">= 2.7.6"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  # Same as byebug
  gem 'pry', '~> 0.13.1'

  # Rspec for testing
  gem 'rspec-rails', '~> 3.5'
  gem 'factory_bot_rails'
  gem 'capybara'
  gem 'database_cleaner'
  gem "standard"
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem "letter_opener"
end

group :test do
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
  gem 'shoulda-matchers', '~> 4.0'
end

gem "google-cloud-storage", "~> 1.31", ">= 1.31.1", require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
