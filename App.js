import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to React  native",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.use((err, req, res, next) => {
  return res.status(500).send({
    success: false,
    message: err.message,
  });
});

export default app;
