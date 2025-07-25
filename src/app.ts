import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", authRoutes);

export default app;
