var mongoose                = require('mongoose');
var db                      = mongoose.createConnection('localhost', 'woddoTest');
var exerciseRoutes          = require('./exercise.js');
var userRoutes              = require('./user.js');
var prRoutes                = require('./personalRecord.js');
var weightWorkoutRoutes     = require('./weightWorkout.js');
var wendlerWorkoutRoutes    = require('./wendlerWorkout.js');

exports.index = function(req, res){
    res.sendfile('./public/index.html')
}

//init routes
exerciseRoutes.init(mongoose, db);
userRoutes.init(mongoose, db);
prRoutes.init(mongoose, db);
weightWorkoutRoutes.init(mongoose, db);
wendlerWorkoutRoutes.init(mongoose, db);

//export routes
exports.exercise        = exerciseRoutes;
exports.user            = userRoutes;
exports.personalRecords = prRoutes;
exports.weightWorkouts  = weightWorkoutRoutes;
exports.wendlerWorkouts = wendlerWorkoutRoutes;