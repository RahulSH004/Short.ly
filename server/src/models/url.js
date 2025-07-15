const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: [{timestamps:{ type: Number, default: Date.now} }],
    },{ timestamps: true }
);

module.exports = mongoose.model('Url', urlschema);  
