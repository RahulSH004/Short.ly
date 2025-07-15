const express = require('express');
const { generateShortUrl, generateanalytics,redirectShortUrl } = require('../controllers/genrateurl'); // Fix: destructure the functions
const router = express.Router();

router.post('/generate', generateShortUrl);

router.get('/:shortUrl', redirectShortUrl);

router.get('/analytics/:shortUrl', generateanalytics);

module.exports = router;