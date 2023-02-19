import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber'
import request, { type Response, type Test } from 'supertest'
import { UserBackendApp } from '../../../../../../src/apps/user/backend/user.backend.app'
import assert from 'assert'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let _request: Test
let application: UserBackendApp
let _response: Response

BeforeAll(async () => {
  application = new UserBackendApp()
  await application.start()
})

AfterAll(async () => {
  await application.stop()
})

Given('I send a GET request to {string}', function (route) {
  _request = request(application.httpServer).get(route)
})
Then('the response status code should be {int}', async function (status: number) {
  await _request.expect(status)
})

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).put(route).send(JSON.parse(body))
})

Then('the response should be empty', async () => {
  _response = await _request
  assert.deepEqual(_response.body, {})
})
