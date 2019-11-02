const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config')
const path = require('path');
const logger = require('./config/logger').log4js.getLogger('server.js');
const helmet = require('helmet');
const tokenUtil = require('./config/utils/token-util');



//initialize express application
const app = express();


app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(bodyParser.json({
  limit: '10mb'
}));


// Use helmet to secure Express headers
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.noCache());
app.disable('x-powered-by');

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

app.use(function (req, res, next) {
  var authToken = req.headers.authorization;
  if (authToken) {
    tokenUtil.verify(authToken, function (err, decrypted) {
      if (err) {
        res.clearCookie('Authorization');
        res.clearCookie('user')
        res.clearCookie('token');
        res.status(401).send({
          message: 'token expired',
          code: 'TE401'
        });
      } else {
        req.token = {
          username: decrypted.username,
          email: decrypted.email,
          userId: decrypted.userId
        };
        next();
      }
    });
  } else if (isWhitelist(req)) {
    next();
  } else {
    res.status(401).send('Not authorized to access this resource');
  }
});

function isWhitelist(req) {
  return (req.path.indexOf("/favicon.ico") > -1 || req.path.indexOf("/auth/") > -1 || req.path.indexOf("/api/auth/") > -1 || req.path.indexOf("/api/auth/forgot") > -1 || req.path.indexOf("/api/auth/reset") > -1 || req.path.indexOf("/api/public") > -1) ||  req.path.indexOf("/api/user/register") > -1
}

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
