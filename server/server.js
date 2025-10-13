// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GOOGLE_API_KEY;

// ❌ Check for API key and exit if not found
if (!API_KEY) {
  console.error("❌ Set GOOGLE_API_KEY in your .env file");
  process.exit(1);
}

// ✅ Initialize the Google Generative AI client with a stable model
// ...
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// ...
// --- Health check ---
app.get('/', (req, res) => {
  res.send('🚀 Travel Planner Backend is running!');
});

// --- Build JSON prompt ---
function buildPrompt(form) {
  return `
You are a world-class travel planner. Generate a concise day-by-day itinerary in JSON ONLY.
User input:
- destination: ${form.destination}
- days: ${form.days}
- budget: ${form.budget}
- travelers: ${form.travelers || 'solo'}

Requirements:
Return valid JSON with this structure:
{
  "destination": string,
  "summary": string,
  "days": [
    { "day": 1, "title": string, "morning": string, "afternoon": string, "evening": string, "tips": string (optional) }, ...
  ],
  "estimated_cost": string,
  "transport_suggestions": string
}

Use real places if possible. JSON only. Do not include any extra text.
`;
}

// --- POST /plan-trip ---
app.post('/plan-trip', async (req, res) => {
  const form = req.body;

  if (!form.destination || !form.days) {
    return res.status(400).json({ ok: false, message: 'Destination and days are required' });
  }

  try {
    const prompt = buildPrompt(form);
    console.log("📨 Sending prompt to Gemini API:", prompt);

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    console.log("📩 Gemini API response:", text);

    // ✅ Extract JSON, as Gemini sometimes wraps output in markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;

    let itinerary;
    try {
      itinerary = JSON.parse(jsonText);
    } catch (err) {
      console.error('❌ Failed to parse JSON:', err);
      return res.status(200).json({
        ok: false,
        parseError: true,
        raw: text,
        message: 'Model output could not be parsed as JSON.',
      });
    }

    res.json({ ok: true, itinerary });

  } catch (err) {
    console.error('❌ Error calling Gemini API:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// --- Start server ---
app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));