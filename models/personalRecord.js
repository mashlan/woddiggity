var mongoose = require('mongoose');

var PrHistory = new mongoose.Schema({
        RecordDate: Date,
        LocalFormat: String,
        Value: Number,
        Units: String
});

var PR = new mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId },
    UserId: String,
    ExerciseId: String,
    ExerciseName: String,
    History: [PrHistory]
});

exports.PersonalRecordSchema    = PR;
exports.PersonalHistorySchema   = PrHistory;