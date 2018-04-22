const mongoose = require('mongoose');
const User = require('../models/user.server.model');
const Motivation = require('../models/motivation.server.model');
const EmergencyAlert = require('../models/emergency-alert.server.model');
const VitalSigns = require('../models/vital-signs.server.model');

module.exports.GetUserDetails = function (req, res, next) {
    let id = req.params.id;

    User.findOne(
        { _id: id },
        '-hash -salt'
    )
        .populate('authoredMotivation receivedEmergencyAlerts vitalSigns receivedMotivation sentEmergencyAlerts')
        .exec((err, user) => {
            if (err) {
                return res.status(400).send({ message: err });
            }
            console.log('Get User Details:', user);
            return res.status(200).json(user);
        });
};