const express = require('express');
const bcrypt = require('bcryptjs');

const model = require('../models/usersModel');

const router = express.Router();


// /register

router.post('/register', (req, res) => {
    let info = req.body;
    const hash = bcrypt.hashSync(info.password, 8)
    info.password = hash; //make sure to store hash as password

    model.addUser(info)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// /login

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    model.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    message: `Welcome ${user.username}`
                });
            } else {
                res.status(401).json({
                    message: 'Invalid Credentials.'
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;