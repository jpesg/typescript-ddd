Feature: Obtain the total number of users
  In order to have a users counter
  As a user
  I want to see the users counter

  Scenario: With one user
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
        "type": "user.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "attributes": {
          "email": "user@email.com",
          "password": "password"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    When I send a GET request to "/users-counter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 1
    }
    """
