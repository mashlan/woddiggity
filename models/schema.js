
var mongoose                = require('mongoose');
var exRecord                = require('./exercise.js');
var prRecord                = require('./personalRecord.js');
var unitRecord              = require('./unitOfMeasure.js');
var userRecord              = require('./user.js');
var weightWorkoutRecord     = require('./weightWorkout.js');
var wendlerWorkoutRecord    = require('./wendlerWorkout.js');
var exTypeRecord            = require('./exerciseType.js');

exports.schema = {
    ExerciseSchema: exRecord.ExerciseRecord(mongoose),
    ExerciseTypeSchema: exTypeRecord.ExerciseTypeRecord(mongoose),
    PersonalRecordSchema: prRecord.PrSchemas(mongoose).PR,
    PersonalHistorySchema: prRecord.PrSchemas(mongoose).PrHistory,
    UnitOfMeasureSchema: unitRecord.UnitOfMeasureSchema(mongoose),
    UserSchema: userRecord.UserSchema(mongoose),
    WeightWorkoutSchema: weightWorkoutRecord.WeightWorkoutSchema(mongoose),
    WendlerWorkoutSchema: wendlerWorkoutRecord.WendlerWorkoutSchema(mongoose)
};