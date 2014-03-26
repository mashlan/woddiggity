var assert          = require("chai").assert;
var mockApp         = require('../testServer.js');
var httpMock        = require('http');
var dbConfig        = require('../databaseConfig.js');
var controller      = require('../../controllers/controller.js');
var userRepo        = require('../../data_access/repositories/userRepository.js');
var repo            = mockApp.repo;
var queryString     = require('querystring');

var user            = controller(dbConfig.mongoose, dbConfig.db, "users", dbConfig.schema.User, userRepo);
var baseUser        = null;

var options = {
    host: 'localhost',
    port: 5050,
    path: '',
    method: ''
};

describe("user controller", function(){

    before(function(done){
        var newUser = queryString.stringify({
            FirstName: "Eric",
            LastName: "Mashlan",
            Email: "eric@gmail.com",
            password: "eric1234"
        });

        options.method = "POST";
        options.path = "/user";
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        var req = httpMock.request(options, function(response){
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                baseUser = JSON.parse(chunk);
                done();
            });
        });

        req.on('error', function(e){
            console.log('error: ' + e);
        });

        req.write(newUser);
        req.end();
    });

    after(function(done){
        repo.deleteAll(function(){
            done();
        });
    });


    it("get user by id", function(done){
        logInUser(function(){
            options.method = "GET";
            options.path = "/user/" + baseUser._id;
            options.headers = null;
            options.user = baseUser;

            var req = httpMock.request(options, function(response){
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    var user = JSON.parse(chunk);
                    done();
                });
            });

            req.on('error', function(e){
                console.log('error: ' + e);
            });

            req.end();
        });
    });

    function logInUser(callback){
        var user = queryString.stringify({
            username: "eric@gmail.com",
            password: "eric1234"
        });

        options.method = "POST";
        options.path = "/login";
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        var request = httpMock.request(options, function(response){
            response.setEncoding('utf8');
            response.on('data', function(chunk){
                var loggedInUser = JSON.parse(chunk);
                baseUser = loggedInUser.user;
                callback();
            });
        });

        request.write(user);
        request.end();
    }
});


