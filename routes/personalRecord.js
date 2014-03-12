var mongoose                = null;
var models                  = require('../models/personalRecord.js');
var PersonalRecordSchema    = models.PersonalRecordSchema;
var HistorySchema           = models.PersonalHistorySchema;
var PR                      = null;
var History                 = null;

exports.init = function(mg, db){
    PR =  db.model("personalRecord", PersonalRecordSchema);
    History = db.model('personalHistory',HistorySchema );
    mongoose = mg;
};

exports.list = function(req, res){
    //PR.find({}).remove().exec();
    var id = req.params.id;
    var sortValue = req.query.sortName;
    var sortDirection = req.query.sortDirection;
    if(!sortDirection) sortDirection = "";
    if(!sortValue) sortValue = "";

    var query = PR.find({UserId: id}).sort(sortDirection + sortValue);
    query.exec(function(error, data){
        res.json(data);
    });
};

exports.get = function(req, res){
    var id = req.params.id;
    PR.find({_id: mongoose.Types.ObjectId(id)}, function(err, data){
        if(data.length > 0){res.json(exercise[0]); }
        else res.json(err);
    })
}

exports.create = function(req, res){
    var ObjectId = mongoose.Types.ObjectId;
    var newId = ObjectId();
    var history = new History({
        RecordDate: new Date(req.body.RecordDate),
        LocalFormat: new Date(req.body.RecordDate).toLocaleDateString(),
        Value: req.body.Value,
        Units: req.body.Units
    });

    PR.findOne({ExerciseId: req.body.ExerciseId, UserId: req.body.UserId}, function(err, doc){
        if(doc){
            doc.History.push(history);
            doc.save(function(err){
                if(err ){res.json(err);}
                else{res.json(doc);}
            })
        }else{
            var pr = new PR({
                _id: newId,
                UserId: req.body.UserId,
                ExerciseId: req.body.ExerciseId,
                ExerciseName: req.body.ExerciseName
            });

            pr.History.push(history);

            pr.save(function(err, doc){
                if(err ){res.json(err);}
                else if(!doc){throw 'Error';}
                else{res.json(doc);}
            });
        }
    });
}

exports.update = function(req, res){
    var query = {_id: mongoose.Types.ObjectId(req.body._id)};
    var pr = new PR({
        UserId: req.body.UserId,
        ExerciseId: req.body.ExerciseId,
        RecordDate: req.body.RecordDate,
        Value: req.body.Value
    });

    PR.findOneAndUpdate(query, pr, function(err){
        if(err){res.json(err);}
        else{res.json({success: true});}
    });
}

exports.delete = function(req, res){
    PR.remove({_id: mongoose.Types.ObjectId(req.params.id)}, function(err){
        if(err ){res.json(err);}
        else{res.json({success: true});}
    });
}


