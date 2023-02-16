const common = [
  '--require-module ts-node/register', // Load TypeScript module
  '--publish-quiet',
]
// eslint-disable-next-line camelcase
const user_backend = [
  ...common,
  'tests/apps/user/backend/features/**/*.feature',
  '--require tests/apps/user/backend/features/step_definitions/*.steps.ts',
].join(' ')
module.exports = {
  // eslint-disable-next-line camelcase
  user_backend,
}
