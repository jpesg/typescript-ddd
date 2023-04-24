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

  RABBITMQ_USERNAME: z.string().default('guest'),
  RABBITMQ_PASSWORD: z.string().default('guest'),
  RABBITMQ_VHOST: z.string().default('/'),
  RABBITMQ_SECURE: z.boolean().default(false),
  RABBITMQ_HOSTNAME: z.string().default('localhost'),
  RABBITMQ_PORT: z.number().default(5672),
  RABBITMQ_EXCHANGE_NAME: z.string().default('domain_events'),
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
  rabbitmq: {
    connectionSettings: {
      username: envVars.RABBITMQ_USERNAME,
      password: envVars.RABBITMQ_PASSWORD,
      vhost: envVars.RABBITMQ_VHOST,
      connection: {
        secure: envVars.RABBITMQ_SECURE,
        hostname: envVars.RABBITMQ_HOSTNAME,
        port: envVars.RABBITMQ_PORT,
      },
    },
    exchangeSettings: {
      name: envVars.RABBITMQ_EXCHANGE_NAME,
    },
    maxRetries: 5,
    retryTtl: 10,
  },
}
if (userConfig.env === 'test') {
  userConfig.mongo.database = userConfig.mongo.database + '-test'
  userConfig.typeOrm.database = userConfig.typeOrm.database + '-test'
}
