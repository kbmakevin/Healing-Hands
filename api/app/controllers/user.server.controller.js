const mongoose = require('mongoose');
const User = require('../models/user.server.model');
const Motivation = require('../models/motivation.server.model');
const EmergencyAlert = require('../models/emergency-alert.server.model');
const VitalSigns = require('../models/vital-signs.server.model');


module.exports.GetUsers = function (req, res, next) {
    User.find({},
        '-hash -salt',
        (err, users) => {
            if (err) {
                return res.status(400).send({ message: err });
            }
            console.log('Get List of Users:', users);
            return res.status(200).json(users);
        }
    )
}

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

// NURSE FUNCTIONS ++++++++++++++++++++++++++++++
// create new motivation document
// push ref to patient 
// push ref to nurse

module.exports.SendMotivation = function (req, res, next) {
    let motivation = new Motivation();
    motivation.author = req.body.author;
    motivation.patient = req.body.patient;
    motivation.message = req.body.message;
    motivation.type = req.body.type;
    // console.log('req body: ', req.body);
    // console.log('motivation doc', motivation);

    User.findByIdAndUpdate(motivation.author,
        { $push: { authoredMotivation: motivation._id } },
        { new: true },
        (err, updatedNurse) => {
            if (err) {
                return res.status(400).send('Could not update Nurse details');
            } else {
                User.findByIdAndUpdate(motivation.patient,
                    { $push: { receivedMotivation: motivation._id } },
                    { new: true },
                    (err, updatedPatient) => {
                        if (err) {
                            return res.status(400).send('Could not update Patient details');
                        } else {
                            motivation.save((err) => {
                                if (err) {
                                    return res.status(400).send('Could not save Motivation details');
                                } else {
                                    return res.status(200).json(motivation);
                                }
                            })
                        }
                    }

                )
            }
        });
};


module.exports.submitEmergencyAlert = function (req, res, next) {
    let emergency = new EmergencyAlert();
    emergency.sender = req.body.sender;
    emergency.receiver = req.body.receiver;
    emergency.message = req.body.message;
    console.log(Date.now);

    User.findByIdAndUpdate(emergency.sender,
        { $push: { sentEmergencyAlerts: emergency._id } },
        { new: true },
        (err, updatedPatient) => {
            if (err) {
                return res.status(400).send('Could not update Patient details');
            } else {
                console.log('Detials saved');
                User.findByIdAndUpdate(emergency.receiver,
                    { $push: { receivedEmergencyAlerts: emergency._id } },
                    { new: true },
                    (err, updatedNurse) => {
                        if (err) {
                            return res.status(400).send('Could not update Nurse details');
                        } else {
                            emergency.save((err) => {
                                if (err) {
                                    return res.status(400).send('Could not save Emergency alert details');
                                } else {
                                    return res.status(200).json(emergency);
                                }
                            })
                        }
                    }

                )
            }
        });

};

// PATIENT FUNCTIONS ++++++++++++++++++++++++++++
