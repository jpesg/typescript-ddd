import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber'
import request, { type Test } from 'supertest'
import { UserBackendApp } from '../../../../../../src/apps/user/backend/user.backend.app'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let _request: Test
let application: UserBackendApp

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
