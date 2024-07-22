export type EnvironmentTypes = "development" | "production" | "local";
const config = {
  ENVIRONMENT: <EnvironmentTypes>process.env.NODE_ENV,
  DB_CONNECTION: process.env.DB_CONNECTION,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  IV: process.env.IV,
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: parseInt(process.env.SMTP_PORT || "587"),
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASSWORD,
  },
};
export default config;
