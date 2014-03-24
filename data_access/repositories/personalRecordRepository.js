module.exports = function(mongoose, db, schema){
    var activeRecord    = require('./repository.js');
    var PR              = activeRecord(mongoose, db, "personalRecord", schema.PersonalRecordSchema);
    var History         = activeRecord(mongoose, db, 'personalHistory',schema.PersonalHistorySchema );

    PR.create = function(prData, callback){
        var ObjectId = mongoose.Types.ObjectId;
        var newId = ObjectId();
        var history = new History.model({
            RecordDate: new Date(prData.RecordDate),
            LocalFormat: new Date(prData.RecordDate).toLocaleDateString(),
            Value: prData.Value,
            Units: prData.Units
        });

        PR.findOne({ExerciseId: prData.ExerciseId, UserId: prData.UserId}, function(err, doc){
            if(doc){
                doc.History.push(history);
                doc.save(callback);
            }else{
                var pr = new PR.model({
                    _id: newId,
                    UserId: prData.UserId,
                    ExerciseId: prData.ExerciseId,
                    ExerciseName: prData.ExerciseName
                });

                pr.History.push(history);
                pr.save(callback);
            }
        });
    };

    PR.updateHistoryRecord = function(historyData, callback){

    };

    PR.deleteHistoryRecord = function(historyData, callback){

    };

    return PR;

};