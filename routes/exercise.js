var mongoose        = null;
var ExerciseSchema  = require('../models/exercise.js').ExerciseSchema;
var Exercise        = null;

exports.init = function(mg, db){
    Exercise =  db.model("exercises", ExerciseSchema);
    mongoose = mg;
};

//JSON API for list of exercises
exports.list = function(req, res){
    var sortValue = req.query.sortName;
    var sortDirection = req.query.sortDirection;
    if(!sortDirection) sortDirection = "";
    if(!sortValue) sortValue = "";

    var query = Exercise.find({}).sort(sortDirection + sortValue);
    query.exec(function(error, exercises){
        res.json(exercises);
    });
};

//JSON API for getting a single exercise
exports.get = function(req, res){
    var id = req.params.id;
    Exercise.find({_id: mongoose.Types.ObjectId(id)}, function(err, exercise){
        if(exercise.length > 0){res.json(exercise[0]); }
        else res.json(err);
    })
}

//JSON API for creating a new exercise
exports.create = function(req, res){
    var ObjectId = mongoose.Types.ObjectId;
    var newId = ObjectId();

    var ex = new Exercise({
        _id: newId,
        Name: req.body.Name,
        Description: req.body.Description,
        Type: req.body.Type
    });

    ex.save(function(err, doc){
        if(err ){res.json(err);}
        else if(!doc){throw 'Error';}
        else{res.json(doc);}
    });
}

//JSON API for updating a new exercise
exports.update = function(req, res){
    var query = {_id: mongoose.Types.ObjectId(req.body._id)};
    var ex ={ Name: req.body.Name, Description: req.body.Description, Type: req.body.Type };

    Exercise.findOneAndUpdate(query, ex, function(err){
        if(err){res.json(err);}
        else{res.json({success: true});}
    });
}

//JSON API for deleting an exercise
exports.delete = function(req, res){
    Exercise.remove({_id: mongoose.Types.ObjectId(req.params.id)}, function(err){
        if(err ){res.json(err);}
        else{res.json({success: true});}
    });
}
//
//module.exports = function(){
//    //private vars
//
//    return{
//        update: function()
//    }
//}();


