
exports.ExerciseTypeRecord = function(mongoose){
    return new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true, unique: true },
        Description: String,
        UnitOfMeasureIds: [String]
    });
};