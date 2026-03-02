require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get root_url
    assert_response :success
  end
end
