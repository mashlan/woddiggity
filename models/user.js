
exports.UserSchema = function(mongoose){
    var crypto = require('crypto');

    function validatePresenceOf(value) {
        return value && value.length;
    }

    var UserPreferences = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId},
        WeightUnitId: String,
        RowUnitId: String,
        RunUnitId: String
    });

    var User = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId },
        FirstName: { type: String, required: true },
        LastName: String,
        Email: { type: String, validate: [validatePresenceOf, 'an email is required'], index: { unique: true } },
        HashedPassword: String,
        Salt: String,
        IsAdmin: Boolean
    });

    User.virtual('id').get(function(){
        return this._id.toHexString();
    });

    User.virtual('password')
        .set(function(password) {
            this._password = password;
            this.Salt = this.makeSalt();
            this.HashedPassword = this.encryptPassword(password);
        })
        .get(function() {
            return this._password;
        }
    );

    User.method('authenticate', function(plainText) {
        var encryptedPass = this.encryptPassword(plainText);
        return encryptedPass === this.HashedPassword;
    });

    User.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

    User.method('encryptPassword', function(password) {
        return crypto.createHmac('sha1', this.Salt).update(password).digest('hex');
    });

    User.pre('save', function(next) {
        if (!validatePresenceOf(this.password)) {
            next(new Error('Invalid password'));
        } else {
            next();
        }
    });

    return User;
};