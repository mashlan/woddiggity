
module.exports = function(mongoose){

    var unitOfMeasure =  new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true, unique: true },
        Description: String
    });

    var exerciseType = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true, unique: true },
        Description: String,
        UnitOfMeasures: [unitOfMeasure]
    });

    var exercise = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        Name: { type: String, required: true, unique: true },
        Abbreviation: String,
        Description: String,
        ExerciseType: {
            _id: {type: mongoose.Schema.ObjectId },
            Name: { type: String, required: true, unique: true },
            Description: String,
            UnitOfMeasures: [unitOfMeasure]
        }
    });

    return {
        ExerciseRecord: exercise,
        ExerciseTypeRecord: exerciseType,
        UnitOfMeasureRecord: unitOfMeasure
    };

};