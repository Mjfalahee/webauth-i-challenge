const bcrypt = require('bcryptjs');
const model = require('../models/usersModel');

//Custom middleware to check if a session exists, and if the user is logged in (stored a username in the session)


module.exports = function restricted(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({
            message: 'You shall not pass'
        });
    }
};