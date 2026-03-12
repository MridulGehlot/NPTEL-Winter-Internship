const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Scheme = require('../models/Scheme');

// Save Farmer Profile
router.post('/profiles', async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/profiles/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        res.status(200).json(profile);
    } catch (err) {
        res.status(404).json({ error: "Profile not found" });
    }
});

// Get all schemes (metadata)
router.get('/schemes', async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json(schemes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const multer = require('multer');
const { processPdf, checkEligibility } = require('../services/ragService');

// Multer setup for PDF uploads with size limit
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Save Scheme and process PDF (RAG Ingestion)
router.post('/schemes/upload', upload.single('pdf'), async (req, res) => {
    try {
        const { name, department, description } = req.body;
        const mongoose = require('mongoose');
        console.log("Current Mongoose state in API:", mongoose.connection.readyState);

        const newScheme = new Scheme({
            name, department, description, pdfPath: req.file.path
        });
        const savedScheme = await newScheme.save();

        // Process PDF for RAG
        const ragResult = await processPdf(req.file.path, savedScheme._id);

        res.status(201).json({ scheme: savedScheme, ragResult });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mock AI RAG endpoint
router.post('/check-eligibility', async (req, res) => {
    try {
        const { profileId, schemeId } = req.body;

        // Fetch profile and scheme
        const profile = await Profile.findById(profileId);
        if (!profile) return res.status(404).json({ error: "Profile not found" });

        const result = await checkEligibility(profile, schemeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/parse-voice', async (req, res) => {
    try {
        const { transcript } = req.body;
        const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
        
        if (!transcript || transcript.trim().length === 0) {
            return res.status(400).json({ error: "Transcript is empty" });
        }

        // Using flash for faster parsing
        const llm = new ChatGoogleGenerativeAI({ 
            modelName: "gemini-1.5-flash",
            apiKey: process.env.GEMINI_API_KEY 
        });
        
        const prompt = `You are a form parser for Indian agriculture. Extract farmer profile information from the spoken transcript.
        
Return ONLY a valid JSON object with these exact keys (all fields are required):
- state: (string, e.g., 'Maharashtra', 'Punjab')
- district: (string, e.g., 'Pune', 'Ludhiana')
- landHolding: (number only, in acres, e.g., 5 or 2.5)
- cropType: (array of strings, e.g., ["wheat", "rice"])
- socialCategory: (string, one of: 'General', 'OBC', 'SC', 'ST')

If any field is missing or unclear, use reasonable defaults or best guess based on context.

Transcript: "${transcript}"

Return ONLY JSON, no markdown:
{"state":"","district":"","landHolding":0,"cropType":[],"socialCategory":""}`;
        
        const response = await llm.invoke(prompt);
        
        // Extract text - handle all possible response formats
        let text = response;
        if (response && typeof response === 'object') {
            text = response.content || response.text || response.output_text || JSON.stringify(response);
        }
        
        if (typeof text !== 'string') {
            text = String(text);
        }
        
        // Clean markdown
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Extract JSON
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            text = text.substring(jsonStart, jsonEnd + 1);
        }
        
        const parsedData = JSON.parse(text);
        
        const result = {
            state: parsedData.state || '',
            district: parsedData.district || '',
            landHolding: parseFloat(parsedData.landHolding) || 0,
            cropType: Array.isArray(parsedData.cropType) ? parsedData.cropType : [parsedData.cropType || ''],
            socialCategory: parsedData.socialCategory || 'General'
        };
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Voice parsing error:', err.message);
        res.status(500).json({ error: `Failed to parse voice: ${err.message}` });
    }
});

module.exports = router;
