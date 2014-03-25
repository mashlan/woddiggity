var assert          = require("chai").assert;
var dbConfig        = require('../databaseConfig.js');
var User            = require('../../data_access/repositories/userRepository.js')(dbConfig.mongoose, dbConfig.db, "users", dbConfig.schema.User);

var baseUser  = null;

describe("users", function(){

    beforeEach(function(done){
        var newUser = {
            FirstName: "Eric",
            LastName: "Mashlan",
            Email: "eric.mashlan@gmail.com",
            password: "eric1234"
        };

        User.create(newUser,
            function(err, user){
                if(err){
                    console.log("an error occurred");
                }else{
                    if(!user) throw new Error("'beforeEach user not successfully created.");
                    baseUser = user;
                }
                done();
            });
    });

    afterEach(function(done){
        User.deleteAll(function(){
            done();
        });
    });

    it("attempt create user with invalid email", function(done){
       var data = {
           FirstName: "Eric",
           LastName: "Mashlan",
           Email: "eric.mashlan@gmail.com",
           password: "boo"
        };

        User.create(data, function(err, user){
            assert.isNotNull(err);
            assert.equal(err.message, "Invalid Password", "should be invalid");
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
        var newUser = {
            FirstName: "joe",
            LastName: "shmoe",
            Email: "eric.mashlan@gmail.com",
            password: "eric1234"
        };

        User.create(newUser, function(err, user){
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

            done();
        });
    });

    it("attempt login with invalid password", function(done){
        var data = {Email: 'eric.mashlan@gmail.com', password: 'noSuchPassword'};
        User.logIn(data.Email, data.password, function(err, user, message){
            assert.isFalse(user, 'no user returned');
            assert.isNull(err, 'no error returned');
            assert.isNotNull(message, 'message returned');
            assert.equal(message.message, 'Invalid password', "invalid password returned");

            done();
        });
    });

    it("change user password", function(done){
        var newPassword = "newPass123";
        var updatedUser = {
            FirstName: baseUser.FirstName,
            LastName: baseUser.LastName,
            Email: "eric.mashlan@gmail.com"
        };
        updatedUser._id = baseUser._id.id;

        User.updatePassword(updatedUser, newPassword, function(err, numberAffected){
            assert.isNull(err);
            assert.equal(1, numberAffected, "one record should have updated");
        });

        User.findByEmail(baseUser.Email, function(err, data){
            assert.notEqual(data.HashedPassword, baseUser.HashedPassword, "hashed password should no longer match" );
            done();
        });
    });

    it("change user password fail", function(done){
        var newPassword = "n23";
        var updatedUser = {
            FirstName: baseUser.FirstName,
            LastName: baseUser.LastName,
            Email: "eric.mashlan@gmail.com"
        };
        updatedUser._id = baseUser._id.id;

        User.updatePassword(updatedUser, newPassword, function(err, numberAffected){
            assert.isNotNull(err);
            assert.equal(err.message, "Invalid Password", "should be an invalid password");
            assert.isNull(numberAffected);
            done();
        });
    });
});

