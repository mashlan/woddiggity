
exports.PrSchemas = function (mongoose) {
    var PrHistory = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        RecordDate: Date,
        Value: Number,
        Units: String
    });

    return new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        UserId: String,
        ExerciseId: String,
        History: [PrHistory]
    });

};