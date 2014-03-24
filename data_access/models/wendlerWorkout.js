exports.WendlerWorkoutSchema = function(mongoose){
    var WendlerWorkoutSet = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        NumberOf: Number,
        Reps: Number,
        IsMaxReps: Boolean,
        PercentMax: Number,
        Note: String
    });

    var WendlerWorkoutExercise = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        ExerciseId: String,
        ExerciseName: { type: String, required: true },
        Sets: [WendlerWorkoutSet]
    });

    var WendlerWorkoutDay = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true },
        Exercises: [WendlerWorkoutExercise]
    });

    var WendlerWorkout = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String },
        Description: String,
        Days: [WendlerWorkoutDay]
    });

    return WendlerWorkout;
};
