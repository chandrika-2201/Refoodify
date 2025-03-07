const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const donorController = require('../controllers/donorController');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/join', (req, res) => {
    const { role } = req.body;
    if (role === 'donor') {
        donorController.addDonor(req, res);
    } else if (role === 'volunteer') {
        volunteerController.addVolunteer(req, res);
    } else {
        // Handle partner or other roles
        res.status(400).json({ error: 'Invalid role' });
    }
});

router.post('/newsletter', volunteerController.subscribeNewsletter);

router.post('/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if the user exists in your database
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new User({
                email,
                name,
                picture,
                role: 'donor', // Default role, you may want to let the user choose
            });
            await user.save();
        }

        // Create a session or JWT token for the user
        // For simplicity, we'll just send the user data
        res.json({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
});

module.exports = router;
