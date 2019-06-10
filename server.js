const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// import routers
const userRouter = require('./data/routers/userRouter');
const authRouter = require('./data/routers/authRouter');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send("<h3> Server is running </h3>")
});

//server.use roputers
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;