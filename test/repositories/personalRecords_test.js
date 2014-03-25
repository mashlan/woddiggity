var assert          = require("chai").assert;
var dbConfig        = require('../databaseConfig.js');
var PersonalRecords = require('../../data_access/repositories/personalRecordRepository.js')(dbConfig.mongoose, dbConfig.db, "personalRecords", dbConfig.schema.PersonalRecord);

var basePRId = null;
var prDate = new Date();

var basePersonalRecord = {
    _id: null,
    UserId: 5,
    ExerciseId: 1,
    ExerciseName: "Bench",
    History: [{
        RecordDate: prDate,
        LocalFormat: prDate.toLocaleDateString(),
        Value: "200",
        Units: "lbs"
    }]
};

describe("personal records", function(){

    beforeEach(function(done){
        PersonalRecords.create(basePersonalRecord,
            function(err, pr){
                basePRId = pr._id;
                if(err){
                    console.log("an error occurred");
                }else{
                    if(!pr) throw new Error("'beforeEach user not successfully created.");
                }
                done();
            });
    });

    afterEach(function(done){
        PersonalRecords.deleteAll(function(){
            done();
        });
    });

    it('retrieve pr by id', function(done){
        PersonalRecords.findById(basePRId.id, function(err, pr){
            assert.isNotNull(pr);
            assert.isNull(err);
            done();
        })
    })
});
