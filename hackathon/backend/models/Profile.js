const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    state: { type: String, required: true },
    district: { type: String, required: true },
    landHolding: { type: Number, required: true }, // in acres
    cropType: [{ type: String }],
    socialCategory: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
