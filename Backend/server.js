const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Summarization Route
app.post("/summarize", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required for summarization." });
  }

  // Dummy summarization logic
  const summary = text.split(" ").slice(0, 10).join(" ") + "...";

  return res.json({ summary });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
