const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    // puts payload into the request for next middleware
    userProperty: 'payload'
});

const ctlrUser = require('../controllers/user.server.controller');
const ctrlAuth = require('../controllers/authentication.server.controller');
const symptoms = require('../controllers/symptomchecker.server.controller');
const emergency = require('../controllers/emergency.server.controller');

router.get('/users', ctlrUser.GetUsers);
router.get('/users/:id', ctlrUser.GetUserDetails);

// check symptoms and generate possible conditions
router.post('/symptomchecker', symptoms.checkConditions);
router.post('/emergency', emergency.submitEmergencyAlert);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;