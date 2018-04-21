const mongoose = require('mongoose');
const User = require('../models/users.server.model');

module.exports.profileRead = function (req, res) {

    console.log('inside profile server controller');

    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                res.status(200).json(user);
            });
    }
};