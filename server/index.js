// const express = require('express');
// const bodyParser = require('body-parser');

// const routes = require('./routers');
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routers';

const server = express();
server.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
server.use(bodyParser.json());

server.use(routes);

// module.exports = server;

export default server;
