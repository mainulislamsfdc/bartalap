const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Your translation API endpoint
app.post('/api/translate', async (req, res) => {
    try {
        // Your translation logic here
        // Use environment variables for API keys
        const API_KEY = process.env.TRANSLATION_API_KEY;
        // ... rest of your translation logic
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});