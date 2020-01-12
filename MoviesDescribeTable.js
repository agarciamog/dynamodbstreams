var AWS = require('aws-sdk');
var creds = new AWS.SharedIniFileCredentials({profile: 'adminuser'});

AWS.config.credentials = creds;
AWS.config.update