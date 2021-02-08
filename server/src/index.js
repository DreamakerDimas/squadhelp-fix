// require('./dbMongo/mongoose'); //-- don't need for now
const http = require('http');
const express = require('express');
const router = require('./router');
const cors = require('cors');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const { loggerInit, logWrite } = require('./logger');
const { exit } = require('process');

const PORT = process.env.PORT || 9632;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);
loggerInit();

try {
  const server = http.createServer(app);
  server.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`)
  );
  controller.createConnection(server);
} catch (err) {
  logWrite(err);
}
