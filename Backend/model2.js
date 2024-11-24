const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const HF_API_KEY = "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"; // Replace with your Hugging Face API key

app.post("/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: text },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const summary = response.data[0]?.summary_text;
    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing text:", error.message);
    res.status(500).json({ error: "Error summarizing text" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
