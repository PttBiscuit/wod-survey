var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var corsExpress = require('express-cors');

module.exports = require('./config/express')(app, config);

app.use(corsExpress(){
  allowedOrigins: ['wodsurveyapp.herokuapp.com']
})

db.sequelize
  .sync()
  .then(function () {
    if (!module.parent) {
      app.listen(config.port, function () {
        console.log('Express server listening on port ' + config.port);
      });
    }
  }).catch(function (e) {
    throw new Error(e);
  });

