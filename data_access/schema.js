
module.exports = function(mongoose){
    var exRecord                = require('./models/exercise.js');
    var prRecord                = require('./models/personalRecord.js');
    var unitRecord              = require('./models/unitOfMeasure.js');
    var userRecord              = require('./models/user.js');
    var weightWorkoutRecord     = require('./models/weightWorkout.js');
    var wendlerWorkoutRecord    = require('./models/wendlerWorkout.js');
    var exTypeRecord            = require('./models/exerciseType.js');

    return {
        ExerciseSchema: exRecord.ExerciseRecord(mongoose),
        ExerciseTypeSchema: exTypeRecord.ExerciseTypeRecord(mongoose),
        PersonalRecordSchema: prRecord.PrSchemas(mongoose).PR,
        PersonalHistorySchema: prRecord.PrSchemas(mongoose).PrHistory,
        UnitOfMeasureSchema: unitRecord.UnitOfMeasureSchema(mongoose),
        UserSchema: userRecord.UserSchema(mongoose),
        WeightWorkoutSchema: weightWorkoutRecord.WeightWorkoutSchema(mongoose),
        WendlerWorkoutSchema: wendlerWorkoutRecord.WendlerWorkoutSchema(mongoose)
    };
};