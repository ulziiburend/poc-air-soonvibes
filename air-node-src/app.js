const express = require('express');
const logger = require('morgan');

const app = express();
app.io = require("socket.io")();

const musicStream = require('./utils/music-stream')
const channelSocket = require('./utils/channel-socket')
const chatSocket = require('./utils/chat-socket')

const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

musicStream.startStream();
channelSocket.handler(app.io);
chatSocket.handler(app.io);

module.exports = app;
