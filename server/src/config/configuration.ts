/* eslint-disable prettier/prettier */
import ConfigInterface from './ConfigInterface';

export default () =>
  <ConfigInterface>{
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      entityPrefix: process.env.DB_TABLES_PREFIX,
    },
  };
