import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import postsRoutes from "./routes/api/post";
import usersRoutes from "./routes/api/user";
import authRouters from "./routes/api/auth"

const app = express();
const {
  MONGO_URI
} = config;

app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MONGO DB CONNECTION SUCCESS"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.json({
    test: "hello",
  });
});

app.use("/api/post", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRouters)

export default app;