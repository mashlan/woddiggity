

exports.ExerciseRecord = function(mongoose){
    var exerciseType = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true },
        UnitOfMeasureIds: [String]
    });

    return new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true },
        Abbreviation: String,
        Description: String,
        ExerciseTypeId: String
    });
};