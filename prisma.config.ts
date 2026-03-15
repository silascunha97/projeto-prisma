import * as dotenv from 'dotenv';

dotenv.config();

const prismaConfig = {
  databaseUrl: process.env.DATABASE_URL,
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
};

export default prismaConfig;
