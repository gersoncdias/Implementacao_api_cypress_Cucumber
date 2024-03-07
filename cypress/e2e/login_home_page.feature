Feature: Login and set authentication cookie

  Scenario: Access the website and set authentication cookie
    Given I'm on the home page
    When I set the authentication token with my credentials
    Then I must be logged in
