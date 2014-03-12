#!/usr/bin/env node
var express     = require('express');
var routes      = require('./routes');
var http        = require('http');
var path        = require('path');
var fs          = require('fs');
var expressApp  = express();

require('./serverConfig')(expressApp, process, __dirname, express, path, routes);

var app = http.createServer(expressApp);

app.listen(expressApp.get('port'), function(){
    console.log('Express server listening on port ' + expressApp.get('port'));
});

