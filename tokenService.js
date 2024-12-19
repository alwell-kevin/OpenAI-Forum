import express from "express";
import cors from "cors";
import dotEnv from "dotenv";

// Load environment variables from .env file
dotEnv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/session", async (req, res) => {
  const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-realtime-preview-2024-12-17",
      voice: "verse",
    }),
  });
  const data = await r.json();

  // Send back the JSON we received from the OpenAI REST API
  res.send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});