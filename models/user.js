const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: String,
    role: { type: String, enum: ['donor', 'volunteer'], required: true },
    // Add any other fields you need
});

module.exports = mongoose.model('User', userSchema);
