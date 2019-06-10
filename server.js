const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// import routers

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send("<h3> Server is running </h3>")
});

//server.use roputers

module.exports = server;