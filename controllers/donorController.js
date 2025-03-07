const Donor = require('../models/donor');

exports.addDonor = (req, res) => {
    const { name, email } = req.body;
    
    Donor.create(name, email, (err, result) => {
        if (err) {
            console.error('Error adding donor:', err);
            return res.status(500).json({ error: 'An error occurred while processing your request' });
        }
        res.status(201).json({ message: 'Donor added successfully', id: result.insertId });
    });
};

exports.submitDonation = (req, res) => {
    // Implement donation submission logic
};

exports.getDonationHistory = (req, res) => {
    // Implement donation history retrieval logic
};
