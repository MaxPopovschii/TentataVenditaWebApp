/* eslint-disable prettier/prettier */
export default interface ConfigInterface {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    entityPrefix: string;
  };
}
