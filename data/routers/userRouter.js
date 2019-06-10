const express = require('express');

const model = require('../models/usersModel');
const restricted = [];

const router = express.Router();

router.get('/', restricted, (req, res) => {
    model.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.send(error));
});

module.exports = router;