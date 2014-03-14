
exports.WeightWorkoutSchema = function(mongoose){

    var WorkoutSet = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        NumberOf: Number,
        PlanedReps: Number,
        ActualReps: Number,
        IsMaxReps: Boolean,
        PlanedWeight: Number,
        ActualWeight: Number,
        Note: String
    });

    var WorkoutExercise = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        ExerciseId: String,
        ExerciseName: { type: String, required: true },
        WorkoutMax: Number,
        Sets: [WorkoutSet]
    });

    var WorkoutDay = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true },
        Exercises: [WorkoutExercise]
    });

    var WeightWorkout = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        UserId: { type: String, required: true },
        Name: { type: String },
        Description: String,
        Type: String,
        PlanDate: Date,
        ActualDate: Date,
        Days: [WorkoutDay]
    });

    return WeightWorkout;
};