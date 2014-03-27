var assert          = require("chai").assert;
var queryString     = require('querystring');
var mockApp         = require('../testServer.js');

var repo            = mockApp.repo;
var httpMock        = mockApp.http;
var cookie          = "";
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
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        };

        var req = httpMock.request(options, function(response){
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                baseUser = JSON.parse(chunk);
                logInUser(done);
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
        options.method = "GET";
        options.path = "/user/" + baseUser._id;
        options.user = baseUser;
        options.headers.Cookie = cookie;

        var req = httpMock.request(options, function(response){
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                var user = JSON.parse(chunk);
                assert.isNotNull(user);
                assert.equal(baseUser.Email, user.Email);
                done();
            });
        });

        req.on('error', function(e){
            console.log('error: ' + e);
        });

        req.end();
    });

    function logInUser(done){
        var user = queryString.stringify({
            username: "eric@gmail.com",
            password: "eric1234"
        });

        options.method = "POST";
        options.path = "/authentication";

        var request = httpMock.request(options, function(response){
            response.setEncoding('utf8');
            response.on('data', function(chunk){
                var loggedInUser = JSON.parse(chunk);
                cookie = response.headers['set-cookie'][0].split(';')[0];
                baseUser = loggedInUser.user;
                done();
            });
        });

        request.write(user);
        request.end();
    }
});


