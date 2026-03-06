const express = require('express');
const axios = require('axios');
const Sentiment = require('sentiment');
require('dotenv').config();
const sentiment = new Sentiment();
const router = express.Router();    

function detectMood(text) {
    const score=sentiment.analyze(text).score;
    if (score > 2) {
        return 'happy';
    }if (score < -2) {
        return 'sad';
    } else {
        return 'relaxed';
    }
}
router.post('/', async (req, res) => {
    const mood = detectMood(req.body.text);
    const YOUTUBE_API=process.env.API_KEY;
    const query={
        happy:'Lungi dance',
        sad:'Arijith songs',
        relaxed:'Galipata songs'
    }
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query[mood]}&key=${YOUTUBE_API}&maxResults=10&type=video`;
    const response=await axios.get(url);
    res.json(response.data.items);
});
module.exports=router;