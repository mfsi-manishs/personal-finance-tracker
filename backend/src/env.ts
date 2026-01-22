import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  host: process.env.HOST || "http://localhost",
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI!,
  dbName: process.env.DB_NAME!,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  cookieSecret: process.env.COOKIE_SECRET!,
  accessTokenTTL: "15m",
  refreshTokenTTL: "30d",
  smtpHost: process.env.SMTP_HOST!,
  smtpPort: Number(process.env.SMTP_PORT!),
  smtpUser: process.env.SMTP_USER!,
  smtpPass: process.env.SMTP_PASS!,
};

if (!env.mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
