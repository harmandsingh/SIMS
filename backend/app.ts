import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import academicRoutes from "./routes/academic";
import createHttpError, { isHttpError } from "http-errors";
// import {
//   default as academicRoutes,
//   default as configurationRoutes,
//   default as facultyRoutes,
// } from "./routes/academic";
// import Student from "./models/student";

/* Data Imports */

/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
// app.use("/api/v1/academic", academicRoutes);
// app.use("/faculty", facultyRoutes);
// app.use("/configuration", configurationRoutes);
// app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

/* API Endpoints */

app.use("/api/v1/academic", academicRoutes);

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
