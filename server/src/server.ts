import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import dataRoutes from "./routes/dataRoutes";
import cors from "cors";

dotenv.config();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", dataRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
