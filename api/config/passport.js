// 2018.03.27 - 00:31:09
const passport = require('passport');
const mongoose = require('mongoose');
// 2018.04.21 - 00:38:36
const LocalStrategy = require('passport-local').Strategy;
// const User = mongoose.model('User');
const User = require('../app/models/users.server.model');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in db
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is invalid
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return that user object
            return done(null, user);
        })
    }
));

// // handling student serialization
// const Student = require('../app/models/students.server.model');
// // authenticated student must be serialized to the session
// passport.serializeUser(function (student, done) {
//     done(null, student.studentNumber);
// });
// // deserialize when requests are made
// passport.deserializeUser(function (studentNumber, done) {
//     Student.findOne({ studentNumber: studentNumber }, '-passport -salt', function (err, user) {
//         done(err, user);
//     });
// });

// // include the local strategy config file
// require('./strategies/local');