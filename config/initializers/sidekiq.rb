Sidekiq.configure_server do |config|
  if Rails.env.production?
    config.redis = {
      url: "redis://<%= Rails.application.credentials.REDIS_HOSTNAME %>:<%= Rails.application.credentials.REDIS_PORT %>",
      password: Rails.application.credentials.REDIS_PASSWORD
    }
  else
    config.redis = { url: 'redis://localhost:6379/1' }
  end
end

Sidekiq.configure_client do |config|
  if Rails.env.production?
    config.redis = {
      url: "redis://<%= Rails.application.credentials.REDIS_HOSTNAME %>:<%= Rails.application.credentials.REDIS_PORT %>",
      password: Rails.application.credentials.REDIS_PASSWORD
    }
  else
    config.redis = { url: 'redis://localhost:6379/1' }
  end
end