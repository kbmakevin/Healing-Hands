const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// properties
const JWT_SECRET = "MY_SECRET";
const USER_TYPES = ['nurse', 'patient'];

const userSchema = mongoose.Schema({
    // email set to unique as we'll use it for the login credentials
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // the hash and salt will be used instead of saving a password
    // hash created by combining pw provided by user and the salt + applying one-way encryption
    hash: String,
    // string of chars unique to each user
    salt: String,
    type: {
        type: String,
        enum: USER_TYPES,
        default: 'patient'
    },

    // - vital signs(ref to other table)
    // - motivations(ref to collection of other table)
    // - authoredMotivations(ref to collection)
    // - receivedEmergencyAlerts(ref to collection)
    // - sentEergencyAlerts(ref to collection)
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}

// whenever user registers/logs in we need to generate a jwt
userSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, JWT_SECRET);
}

module.exports = mongoose.model('Users', userSchema);
