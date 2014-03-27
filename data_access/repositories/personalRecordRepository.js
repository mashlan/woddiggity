module.exports = function(mongoose, db, modelName, schema){
    var activeRecord    = require('./repository.js');
    var PR              = activeRecord(mongoose, db, modelName, schema);

    PR.create = function(prData, callback){
        var ObjectId = mongoose.Types.ObjectId;
        var newId = ObjectId();
        var history = {
            RecordDate: new Date(prData.RecordDate),
            LocalFormat: new Date(prData.RecordDate).toLocaleDateString(),
            Value: prData.Value,
            Units: prData.Units
        };

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

    PR.sort = function(sortValues, params, callback){
        var sortValue = sortValues.sortName;
        var sortDirection = sortValues.sortDirection;
        if(!sortDirection) sortDirection = "";
        if(!sortValue) sortValue = "";

       PR.model.find({UserId: params.id}).sort(sortDirection + sortValue).exec(callback);
    };

    PR.updateHistoryRecord = function(historyData, callback){

    };

    PR.deleteHistoryRecord = function(historyData, callback){

    };

    return PR;

};