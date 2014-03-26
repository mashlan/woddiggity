var assert          = require("chai").assert;
var mockApp         = require('../testServer.js');
var httpMock        = require('http');
var dbConfig        = require('../databaseConfig.js');
var controller      = require('../../controllers/controller.js');
var userRepo        = require('../../data_access/repositories/userRepository.js');
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
            FirstName: "boobobhead",
            LastName: "buggerbut",
            Email: "ericbobobob@gmail.com",
            password: "eric1234"
        });

        options.method = "POST";
        options.path = "/user";
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(newUser)
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
        userRepo.deleteAll(function(){
            done();
        });
    });


    it("get user by id", function(done){

        user.get(req, res, function(err, user){
            assert.ok(user.Email === data.Email, "Email not found");
            done();
        })
    });

});


