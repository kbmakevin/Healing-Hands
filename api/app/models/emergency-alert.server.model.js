const mongoose = require('mongoose');

/**
 * patients can send emergency alert to nurses
 */
const emergencyAlertSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.ObjectId, ref: 'User' },
    message: { type: String, required: true }
});

module.exports = mongoose.model('EmergencyAlert', emergencyAlertSchema);
