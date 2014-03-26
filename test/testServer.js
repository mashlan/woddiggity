#!/usr/bin/env node
module.export = function(){
    var express         = require('express');
    var http            = require('http');
    var path            = require('path');
    var database        = require('./databaseConfig.js');
    var expressApp      = express();
    var passport        = require('passport');
    var localStrategy   = require('passport-local').Strategy;
    var userRepo        = require('../data_access/repositories/userRepository.js')(database.mongoose, database.db, "users", database.schema.User);

    process.env.PORT = 5050;

    require('../passportConfig')(passport, localStrategy, userRepo);
    require('../serverConfig')(expressApp, process, __dirname, express, path, passport);
    require('../routes')(expressApp, database.mongoose, database.db, database.schema, passport);
    require('../service')(__dirname, path);

    var app = http.createServer(expressApp);

    app.listen(expressApp.get('port'), function(){
        console.log('Express server listening on port ' + expressApp.get('port'));
    });

   exports.repo = userRepo;

}();