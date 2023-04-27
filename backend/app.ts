import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import academicRoutes from "./routes/academic";
import configurationRoutes from "./routes/configuration";
import session from "express-session";
import MongoStore from "connect-mongo";

/* Loads .env file contents into process.env. */
dotenv.config();

/* Creates an Express application. The express() function is a top-level function exported by the express module. */
const app = express();

/* Concise output colored by response status for development use. The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes. :method :url :status :response-time ms - :res[content-length] */
app.use(morgan("dev"));

/* Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. */
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

/* API Endpoints */

app.use("/api/v1/academic", academicRoutes);
app.use("/api/v1/configuration", configurationRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
