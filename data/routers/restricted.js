const bcrypt = require('bcryptjs');
const model = require('../models/usersModel');

//Custom middleware to check if user is logged in


module.exports = function restricted(req, res, next) {
    const {username, password} = req.headers;

    if (username && password) {
        model.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({
                        message: 'Invalid Credentials'
                    });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    else {
        res.status(400).json({
            message: 'You must provide credentials to access the site.'
        })
    }
};