import React, { useState } from "react";
import axios from "axios";
// import "./TextSummarizer.css";

function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text to summarize!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/summarize", { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
      alert("Failed to summarize text. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Text Summarizer</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter or paste your text here..."
      />
      <button onClick={handleSummarize} disabled={isLoading}>
        {isLoading ? "Summarizing..." : "Summarize"}
      </button>
      <div className="summary">
        <h2>Summary</h2>
        <textarea 
        value={summary}
        placeholder="Your summary will appear here..."
        />      
        </div>
    </div>
  );
}

export default TextSummarizer;
