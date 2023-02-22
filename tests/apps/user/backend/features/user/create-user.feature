Feature: Create a new user
  Scenario: A valid non existing user
    Given I send a PUT request to "/users/5735d153-8a8c-4bbc-8598-3c19a3836a57" with body:
    """
    {
    "id": "5735d153-8a8c-4bbc-8598-3c19a3836a57",
    "email": "user@user.com",
    "password": "password"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid non existing user
    Given I send a PUT request to "/users/5735d153-8a8c-4bbc-8598-3c19a3836a57" with body:
    """
    {
      "id": "5735d153-8a8c-4bbc-8598-3c19a3836a57",
      "name": 5,
      "duration": "5 hours"
    }
    """
    Then the response status code should be 422
