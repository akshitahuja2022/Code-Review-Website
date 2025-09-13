import express from "express";
import getReviewResponse from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/get-review", getReviewResponse);
export default router;
