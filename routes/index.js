var mongoose                = require('mongoose');
var db                      = mongoose.createConnection('localhost', 'woddoTest');
var userRoutes              = require('./user.js');
var prRoutes                = require('./personalRecord.js');

var activeRecord            = require('./ActiveRecord.js');
var schema                  = require('../models/schema.js').schema;

exports.index = function(req, res){
    res.sendfile('./public/index.html');
}

//export routes
exports.exercise        = activeRecord.record(mongoose, db, "exercises", schema.ExerciseSchema);
exports.user            = userRoutes.record(mongoose, db, schema, activeRecord);
exports.personalRecords = prRoutes.record(mongoose, db, schema, activeRecord);
exports.weightWorkouts  = activeRecord.record(mongoose, db, "weightWorkouts", schema.WeightWorkoutSchema);
exports.wendlerWorkouts = activeRecord.record(mongoose, db, "wendlerWorkouts", schema.WendlerWorkoutSchema);
exports.exerciseTypes   = activeRecord.record(mongoose, db, "exerciseTypes", schema.ExerciseTypeSchema);
exports.unitOfMeasures  = activeRecord.record(mongoose, db, "unitOfMeasures", schema.UnitOfMeasureSchema);