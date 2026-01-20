import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI!,
  dbName: process.env.DB_NAME!,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  cookieSecret: process.env.COOKIE_SECRET!,
  accessTokenTTL: "15m",
  refreshTokenTTL: "30d",
};

if (!env.mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
