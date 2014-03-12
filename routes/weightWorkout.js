var mongoose            = null;
var WeightWorkoutSchema = require('../models/weightWorkout.js').WeightWorkoutSchema;
var WeightWorkout       = null;

exports.init = function(mg, db){
    WeightWorkout =  db.model("weightWorkouts", WeightWorkoutSchema);
    mongoose = mg;
};

exports.list = function(req, res){
    var userId  = req.params.id;

    var sortValue = req.query.sortName;
    var sortDirection = req.query.sortDirection;
    if(!sortDirection) sortDirection = "";
    if(!sortValue) sortValue = "";

    var query = WeightWorkout.find({UserId: userId}).sort(sortDirection + sortValue);
    query.exec(function(error, doc){
        res.json(doc);
    });
};


exports.get = function(req, res){
    var id = req.params.id;
    WeightWorkout.find({_id: mongoose.Types.ObjectId(id)}, function(err, data){
        if(data.length > 0){res.json(data[0]); }
        else res.json(err);
    })
};

exports.create = function(req, res){
    var ObjectId = mongoose.Types.ObjectId;
    var data = new WeightWorkout(req.body);
    data._id = ObjectId();

    data.save(function(err, doc){
        if(err ){res.json(err);}
        else if(!doc){throw 'Error';}
        else{res.json(doc);}
    });
}



