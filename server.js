const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config')
const path = require('path');
const logger = require('./config/logger').log4js.getLogger('server.js')



const app = express();


app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(bodyParser.json({
  limit: '10mb'
}));

app.use(function (req, res, next) {
  var oneof = false;
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }
  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  if (oneof && req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const dbConnection = require('./config/constants/dbConnection')

const connection = dbConnection.initDBConnections();


config.getGlobbedFiles('./app/**/routes/**/*.js').forEach(function (routePath) {
  require(path.resolve(routePath))(app);
});

global.db = connection;


app.listen(3005, () => {
  console.log('Server listening on port 3005')
  logger.info('Server started on port 3005...');
});
