const express = require('express');

const model = require('../models/usersModel');
const restricted = require('./restricted.js');

const router = express.Router();


//if user is logged in (checked by restricted middleware), this path returns a list of all users in the database.
router.get('/', restricted, (req, res) => {
    model.find()
        .then(users => {
            res.json({users, session: req.session});
        })
        .catch(error => res.send(error));
});

module.exports = router;