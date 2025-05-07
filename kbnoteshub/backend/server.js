import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import mongoose from 'mongoose';
import Note from './models/Note.js';
import notesRoutes from './routes/notes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Route for generating notes from Gemini
app.post('/api/generate', async (req, res) => {
  const { prompt, isPublic } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const content = geminiRes?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    return res.status(200).json({
      content,
      isPublic: isPublic || false,
    });
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    return res.status(500).json({ error: "Failed to generate content." });
  }
});

app.use('/api/notes', notesRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
