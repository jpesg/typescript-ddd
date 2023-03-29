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

  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
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
  typeOrm: {
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USERNAME,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DATABASE,
  },
}
if (userConfig.env === 'test') {
  userConfig.mongo.database = userConfig.mongo.database + '-test'
  userConfig.typeOrm.database = userConfig.typeOrm.database + '-test'
}
