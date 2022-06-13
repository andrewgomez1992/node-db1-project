const express = require("express");

//2. connect to accounts router!!
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

//3. CONNECT (BELOW JSON)!!
server.use('/api/accounts', accountsRouter);

//1. wiring our catch all :)
server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found!!' })
});

module.exports = server;
