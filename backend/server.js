// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint for translations
app.post('/api/translate', async (req, res) => {
    try {
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            }
        );
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

