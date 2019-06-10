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
    res.send("Server is running");
});

//server.use routers
server.use('/api/users', userRouter);
server.use('/api/', authRouter);

module.exports = server;