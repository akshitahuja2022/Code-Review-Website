import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/ai.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use("/ai", router);

app.get("/", (req, res) => {
  res.send("Welcome to CodeReview Server");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});
