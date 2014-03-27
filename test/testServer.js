#!/usr/bin/env node
module.export = function(){
    var expressTest         = require('express');
    var httpTest            = require('http');
    var path                = require('path');
    var database            = require('./databaseConfig.js');
    var expressTestApp      = expressTest();
    var passportTest        = require('passport');
    var localStrategyTest   = require('passport-local').Strategy;
    var userRepoTest        = require('../data_access/repositories/userRepository.js')(database.mongoose, database.db, "users", database.schema.User);

    process.env.PORT = 5050;

    __dirname = __dirname.substr(0, __dirname.lastIndexOf("\\"));

    require('../passportConfig')(passportTest, localStrategyTest, userRepoTest);
    require('../serverConfig')(expressTestApp, process, __dirname, expressTest, path, passportTest);
    require('../routes')(expressTestApp, database.mongoose, database.db, database.schema, passportTest);
    require('../service')(__dirname, path);

    var appTest = httpTest.createServer(expressTestApp);

    appTest.listen(expressTestApp.get('port'), function(){
        console.log('Express server listening on port ' + expressTestApp.get('port'));
    });

    exports.repo = userRepoTest;
    exports.http = httpTest;

}();