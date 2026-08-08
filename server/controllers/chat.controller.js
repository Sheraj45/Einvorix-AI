const { generateResponse } = require("../services/gemini.service");

const chat = async (req, res, next) => {
  try {
    const { prompt, character, history } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await generateResponse(character, prompt, history);

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
};
