var assert          = require("chai").assert;
var dbConfig        = require('../databaseConfig.js');
var User            = require('../../data_access/repositories/userRepository.js')(dbConfig.mongoose, dbConfig.db, dbConfig.schema);

var baseUser  = {
    _id: null,
    FirstName: "Eric",
    LastName: "Mashlan",
    Email: "eric.mashlan@gmail.com",
    HashedPassword: "",
    Salt: "",
    IsAdmin: true,
    password: "eric1234"
};

describe("users", function(){

    beforeEach(function(done){
        User.create(baseUser,
            function(err, user){
                if(err){
                    console.log("an error occurred");
                }else{
                    if(!user) throw new Error("'beforeEach user not successfully created.");
                }
                done();
            });
    });

    afterEach(function(done){
        User.deleteAll(function(){
            done();
        });
    });

    it("retrieve by email", function(done){
        var data = {Email: 'eric.mashlan@gmail.com'};
        User.findByEmail(data.Email, function(err, user){
            assert.ok(user.Email === data.Email, "Email not found");
            done();
        })
    });

    it("retrieve by email fail", function(done){
        var data = {Email: 'joe.shmoe@booble.com'};
        User.findByEmail(data.Email, function(err, user){
            assert.isNull(user, 'No such user: ' + data.Email);
            assert.isNull(err, 'No error thrown');
            done();
        });
    });

    it("create user with same email", function(done){
        User.create(baseUser, function(err, user){
            assert.ok(err !== null, "should have gotten an error");
            assert.equal(err.code, 11000, 'duplicate key error');
            done();
        });
    });

    it("attempt login with unknown user", function(done){
        var data = {Email: 'joe.shmoe@booble.com', password: 'noSuchUser'};
        User.logIn(data.Email, data.password, function(err, user, message){
            assert.isFalse(user, 'no user returned');
            assert.isNull(err, 'no error returned');
            assert.isNotNull(message, 'message returned');
            assert.equal(message.message, 'Unknown user - ' + data.Email, 'unknown email address');
        });

        done();
    });

    it("attempt login with invalid password", function(done){
        var data = {Email: 'eric.mashlan@gmail.com', password: 'noSuchPassword'};
        User.logIn(data.Email, data.password, function(err, user, message){
            assert.isFalse(user, 'no user returned');
            assert.isNull(err, 'no error returned');
            assert.isNotNull(message, 'message returned');
            assert.equal(message.message, 'Invalid password', "invalid password returned");
        });

        done();
    });

});

