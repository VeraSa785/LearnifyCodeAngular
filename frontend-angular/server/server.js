import 'dotenv/config';
import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';

const app = express();
const port = 3000;
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OpenAI API key is not set. Please check your environment variables.");
  process.exit(1); 
}

console.log("OpenAI API key loaded successfully.");

const openai = new OpenAI({ apiKey });

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.post('/chat', async (req, res) => {
  console.log('Received request:', req.body);  

  const { message } = req.body;
  console.log('Message received:', message);  

  if (!message || typeof message !== 'string') {
    console.error("Invalid message content:", message);
    return res.status(400).json({ error: "Invalid value for 'content': expected a non-empty string." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log('Reply from OpenAI:', reply); 
    res.json({ reply });
  } catch (error) {
    console.error('Error from OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
