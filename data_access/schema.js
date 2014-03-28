
module.exports = function(mongoose){
    var exRecord                = require('./models/exercise.js')(mongoose);
    var prRecord                = require('./models/personalRecord.js');
    var userRecord              = require('./models/user.js');
    var weightWorkoutRecord     = require('./models/weightWorkout.js');
    var wendlerWorkoutRecord    = require('./models/wendlerWorkout.js');

    return {
        Exercise: exRecord.ExerciseRecord,
        ExerciseType: exRecord.ExerciseTypeRecord,
        PersonalRecord: prRecord.PrSchemas(mongoose),
        UnitOfMeasure: exRecord.UnitOfMeasureRecord,
        User: userRecord.UserSchema(mongoose),
        WeightWorkout: weightWorkoutRecord.WeightWorkoutSchema(mongoose),
        WendlerWorkout: wendlerWorkoutRecord.WendlerWorkoutSchema(mongoose)
    };
};