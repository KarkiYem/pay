import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sessionRoute from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/Sessions", sessionRoute);

app.listen(port, () => {
  console.log("server listening on port", port);
});