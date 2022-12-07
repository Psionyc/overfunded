import * as dotenv from 'dotenv'

const result = dotenv.config()

export const PORT = process.env.APP_PORT