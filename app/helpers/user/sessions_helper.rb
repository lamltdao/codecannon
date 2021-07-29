module User::SessionsHelper
  def credentials_json(resource, keys)
    resource.as_json(only: keys).to_json
  end
end
