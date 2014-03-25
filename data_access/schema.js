
module.exports = function(mongoose){
    var exRecord                = require('./models/exercise.js');
    var prRecord                = require('./models/personalRecord.js');
    var unitRecord              = require('./models/unitOfMeasure.js');
    var userRecord              = require('./models/user.js');
    var weightWorkoutRecord     = require('./models/weightWorkout.js');
    var wendlerWorkoutRecord    = require('./models/wendlerWorkout.js');
    var exTypeRecord            = require('./models/exerciseType.js');

    return {
        Exercise: exRecord.ExerciseRecord(mongoose),
        ExerciseType: exTypeRecord.ExerciseTypeRecord(mongoose),
        PersonalRecord: prRecord.PrSchemas(mongoose),
        UnitOfMeasure: unitRecord.UnitOfMeasureSchema(mongoose),
        User: userRecord.UserSchema(mongoose),
        WeightWorkout: weightWorkoutRecord.WeightWorkoutSchema(mongoose),
        WendlerWorkout: wendlerWorkoutRecord.WendlerWorkoutSchema(mongoose)
    };
};