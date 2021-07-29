Devise::Async.setup do |config|
  config.enabled = true
 
     # Rails5 version or above, cancel the following configuration
  # Supported options: :resque, :sidekiq, :delayed_job, :queue_classic
     # config.backend = :sidekiq # This has been synchronized with the config.active_job.queue_adapter setting in config/application.rb
     # config.queue = :mailers # This needs to be configured in config/sidekiq.yml
end