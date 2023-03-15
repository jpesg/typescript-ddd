import * as dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()
const envVarsSchema = z.object({
  NODE_ENV: z.string(),
  MONGODB_USERNAME: z.string(),
  MONGODB_PASSWORD: z.string(),
  MONGODB_DATABASE: z.string(),
  MONGODB_AUTHDB: z.string(),
  MONGODB_SERVER: z.string(),
  MONGODB_PORT: z.string(),
})
const envVars = envVarsSchema.parse(process.env)

export const userConfig = {
  env: envVars.NODE_ENV,
  mongo: {
    user: envVars.MONGODB_USERNAME,
    password: envVars.MONGODB_PASSWORD,
    database: envVars.MONGODB_DATABASE,
    authDb: envVars.MONGODB_AUTHDB,
    server: envVars.MONGODB_SERVER,
    port: envVars.MONGODB_PORT,
  },
}
if (userConfig.env === 'test') {
  userConfig.mongo.database = userConfig.mongo.database + '-test'
}
