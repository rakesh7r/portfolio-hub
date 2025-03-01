import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();
const getDbInstance = async () => {
  const dbUrl = process.env.POSTGRES_URL || '';
  const db = neon(dbUrl);
  return db;
};

export const checkVersion = async () => {
  const db = await getDbInstance();
  const result = await db`SELECT version()`;
  const { version } = result[0];
  console.log(`Postgres version: ${version}`);
};
