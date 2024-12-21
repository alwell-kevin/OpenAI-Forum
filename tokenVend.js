import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

app.get("/session", async (req, res) => {
  try {
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
    res.json(data);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});