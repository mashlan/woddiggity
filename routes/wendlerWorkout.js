var mongoose                = null;
var WendlerWorkoutSchema    = require('../models/wendlerWorkout.js').WendlerWorkoutSchema;
var WendlerWorkout          = null;

exports.init = function(mg, db){
    WendlerWorkout =  db.model("wendlerWorkouts", WendlerWorkoutSchema);
    mongoose = mg;
};

exports.list = function(req, res){
    var sortValue = req.query.sortName;
    var sortDirection = req.query.sortDirection;
    if(!sortDirection) sortDirection = "";
    if(!sortValue) sortValue = "";

    var query = WendlerWorkout.find().sort(sortDirection + sortValue);
    query.exec(function(error, doc){
        res.json(doc);
    });
};

exports.get = function(req, res){
    var id = req.params.id;
    WendlerWorkout.find({_id: mongoose.Types.ObjectId(id)}, function(err, data){
        if(data.length > 0){res.json(data[0]); }
        else res.json(err);
    })
};

exports.create = function(req, res){
    var ObjectId = mongoose.Types.ObjectId;
    var newId = ObjectId();

    var data = new WendlerWorkout({
        _id: newId,
        Name: req.body.Name,
        Description: req.body.Description,
        Days: req.body.Days
    });

    data.save(function(err, doc){
        if(err ){res.json(err);}
        else if(!doc){throw 'Error';}
        else{res.json(doc);}
    });
}
