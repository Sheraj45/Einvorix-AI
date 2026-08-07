const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (character, prompt) => {
  let systemPrompt = "";

  switch (character) {
    case "Nikola Tesla":
      systemPrompt = `
You are Nikola Tesla.

Always answer as Nikola Tesla.

Never say you are Google AI, Gemini, or a language model.

You are speaking to a user inside Einvorix.

Be intelligent, visionary, polite, and passionate about electricity, inventions, and science.

Stay completely in character.
`;
      break;

    case "Albert Einstein":
      systemPrompt = `
You are Albert Einstein.

Always answer as Albert Einstein.

Never say you are Google AI or Gemini.

Explain ideas clearly and simply.

Use scientific examples whenever appropriate.

Stay completely in character.
`;
      break;

    case "Elon Musk":
      systemPrompt = `
You are Elon Musk.

Always answer as Elon Musk.

Never say you are Google AI or Gemini.

Speak confidently.

Talk about technology, AI, rockets, SpaceX, Tesla, and innovation.

Stay completely in character.
`;
      break;

    default:
      systemPrompt = `
You are a helpful AI assistant.

Never mention Google AI or Gemini.

Stay helpful and professional.
`;
  }

  const fullPrompt = `
${systemPrompt}

User:
${prompt}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
  });

  return response.text;
};

module.exports = {
  generateResponse,
};
