Feature: Create a new user
  Scenario: A valid non existing user
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80" with body:
    """
    {
    "email": "user@user.com",
    "password": "password"
    }
    """
    Then the response status code should be 201
    And the response should be empty