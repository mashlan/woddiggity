var assert          = require("chai").assert;
var mongoose        = require('mongoose');
var db              = mongoose.createConnection('localhost', 'woddiggityTest');
var schema          = require('../../models/schema.js').schema;
var User            = require('../../routes/user.js').record(mongoose, db, schema);

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
        User.insertNew(baseUser,
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
        User.removeAll(function(){
            done();
        });
    });

    it("retrieve by email", function(done){
        var data = {Email: 'eric.mashlan@gmail.com'};
        User.findByEmail('eric.mashlan@gmail.com', function(err, user){
            assert.ok(user.Email === data.Email, "Email not found");
            done();
        })
    });

//    it("create user with same email", function(done){
//        User.insertNew(baseUser, function(err, user){
//            assert.ok(err !== null, "should have gotten an error");
//        });
//    });
});

