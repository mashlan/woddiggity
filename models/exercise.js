var mongoose = require('mongoose');

exports.ExerciseSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId },
    Name: { type: String, required: true },
    Description: String,
    Type: String
});