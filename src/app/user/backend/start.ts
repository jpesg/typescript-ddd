import { UserBackendApp } from './user.backend.app'

const run = async () => {
  await new UserBackendApp().start()
}
run().catch((error) => {
  console.log(error)
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err)
  process.exit(1)
})
