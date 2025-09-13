import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/ai.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/ai", router);

app.get("/", (req, res) => {
  res.send("Welcome to CodeReview Server");
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
