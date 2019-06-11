const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session); //stores the session

// every client has a separate cookie. Even if a user logs on via different mediums, they have different cookies.
// One cookie on one device may expire, but they'll still be logged in on a different one.


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
    store: new KnexSessionStore({ //don't forget the new
        knex: require('./data/dbConfig'), //connection to database
        tablename: 'sessions', //name of table, can be changed.
        sidfieldname: 'sid', // column for session id - name, can be changed
        createtable: true, //create the table if it doesn't exist
        clearInterval: 1000 * 60 * 30 //clear the session after this amount of time in milliseconds.
    })
};

//with KnexSessionStore enabled, the database stores the sessions. This means if the server is restarted, and for the duration of the interval, you are still logged in. 


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