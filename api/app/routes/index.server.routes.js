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

router.get('/users', ctlrUser.GetUsers);
router.get('/users/:id', ctlrUser.GetUserDetails);

router.post('/motivations', ctlrUser.SendMotivation);

router.post('/vitalSigns', ctlrUser.EnterVitalSigns);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;