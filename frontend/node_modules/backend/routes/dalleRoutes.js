import express from 'express';
import * as dotenv from 'dotenv';
import FormData from 'form-data';
import fetch from 'node-fetch'; // Ensure you have this package installed

dotenv.config();

const router = express.Router();

// Basic test route
router.route('/').get((req, res) => {
    res.send('HELLO FROM CLIPDROP API!');
});

// POST route to generate an image based on a prompt using Clipdrop API
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        const form = new FormData();
        form.append('prompt', prompt);

        const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.IMAGE_API_KEY, // Use API key from your .env file
                ...form.getHeaders(),
            },
            body: form,
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.error || 'Error generating image');
        }

        const buffer = await response.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        // Send the base64 image data in the response
        res.status(200).json({ photo: `data:image/jpeg;base64,${base64Image}` });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
