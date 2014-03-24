#!/usr/bin/env node
var express         = require('express');
var http            = require('http');
var path            = require('path');
var mongoose        = require('mongoose');
var db              = mongoose.createConnection('localhost', 'woddiggity');
var schema          = require('./models/schema.js').schema;
var expressApp      = express();
var debug           = typeof v8debug === 'object';
var passport        = require('passport');
var localStrategy   = require('passport-local').Strategy;
var userRepo        = require('./routes/user.js').record(mongoose, db, schema);

if(debug){
    process.env.PORT = 5000;
}
else{
    process.env.PORT = 80;
}

require('./passportConfig')(passport, localStrategy, userRepo);
require('./serverConfig')(expressApp, process, __dirname, express, path, passport);
require('./routes')(expressApp, mongoose, db, schema, passport);
require('./service')(__dirname, path);

var app = http.createServer(expressApp);

app.listen(expressApp.get('port'), function(){
    console.log('Express server listening on port ' + expressApp.get('port'));
});

