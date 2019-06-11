const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

// import routers
const userRouter = require('./data/routers/userRouter');
const authRouter = require('./data/routers/authRouter');

const server = express();
const sessionConfig = {
    name: 'taco', // default = sid
    secret: 'This is a secret.',
    resave: false, // If there are no changes to the session, don't save it.
    saveUninitialized: true, //for GDPR compliance
    cookie: {
        maxAge: 1000 * 60 * 10, //Milliseconds
        secure: false, //send cookie only over https, set to true in production!
        httpOnly: true, //always set to true, it means client JS can't access the cookie
    },
    store: new KnexSessionStore({
        knex: require('./data/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
};


server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.send("Server is running");
});

//server.use routers
server.use('/api/users', userRouter);
server.use('/api/', authRouter);

module.exports = server;