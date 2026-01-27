import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./env.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import transCategoryRoutes from "./modules/trans-category/trans-category.route.js";
import transRoutes from "./modules/trans/trans.route.js";
import userRoutes from "./modules/user/user.route.js";
import { NotFoundError } from "./utils/error.utils.js";

const app = express();

const isDevelopment = env.nodeEnv === "development";

// Security Headers (Always first)
app.use(
  helmet({
    // 1. Disable HSTS in development to prevent forced HTTPS redirects on localhost
    strictTransportSecurity: isDevelopment ? false : true,

    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        // 2. Disable upgrade-insecure-requests in development
        // to prevent browsers (like Safari) from auto-upgrading HTTP to HTTPS
        "upgrade-insecure-requests": isDevelopment ? null : [],
      },
    },
  })
);

// Configure Morgan middleware to log requests
app.use(morgan(":date[iso] :method :url :status - :response-time ms"));

// Body Parsing (Parses raw data into req.body)
app.use(express.json());

// Other specific middleware (CORS, logging, etc.)
app.use(cookieParser(env.cookieSecret));

app.use(
  cors({
    origin: env.frontendUrl, // frontend server
    credentials: true, // allow cookies
  })
);

// Register routes
app.get("/", (req, res) => {
  console.log(`request: ${req.method} ${req.url}`);
  res.send("Personal Finance Tracker API is running...");
});

app.use("/api/auth", authRoutes());
app.use("/api/users", userRoutes());
app.use("/api/trans-categories", transCategoryRoutes());
app.use("/api/trans", transRoutes());

// Handle 404 errors
app.all(/.*/, (req, _res, next) => {
  // Pass a custom error to the global handler
  const err = new NotFoundError(`Route ${req.originalUrl} not found`);
  (err as any).statusCode = 404;
  next(err);
});

// Global error handler (Always last)
app.use(globalErrorHandler);

export default app;
