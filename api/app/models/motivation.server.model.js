const mongoose = require('mongoose');

/**
 * daily motivational tips, videos or games to the patient that encourage
 * physical exercise at home after first weeks of their release from the 
 * hospital
 */
const motivationSchema = mongoose.Schema({
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.ObjectId, ref: 'User' },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Motivation', motivationSchema);
