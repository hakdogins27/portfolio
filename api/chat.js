import { portfolioData } from '../src/data/portfolioData.js';
import { personalQnA } from '../src/data/personalQnA.js';
import { assistantRules } from '../src/data/assistantRules.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    // Strict Request Validation Guard
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Validation Error: "query" must be a non-empty string.' });
    }

    if (query.length > 250) {
      return res.status(400).json({ error: 'Validation Error: "query" exceeds limit of 250 characters.' });
    }

    // Construct the system prompt securely on the server
    const systemPrompt = `${assistantRules.persona} ${assistantRules.strictMode} ${assistantRules.fallback} ${assistantRules.security} ${assistantRules.tone}\n\nCore Knowledge Base:\n${JSON.stringify(portfolioData)}\n\nPersonal Q&A:\n${JSON.stringify(personalQnA)}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY.trim()}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.5,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Groq Proxy Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
