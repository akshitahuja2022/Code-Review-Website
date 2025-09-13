import aiService from "../services/ai.service.js";

const getReviewResponse = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  const response = await aiService(code);
  res.send(response);
};

export default getReviewResponse;
