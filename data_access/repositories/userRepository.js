module.exports = function(mongoose, db, schema){
    var activeRecord    = require('./repository.js');
    var User            = activeRecord(mongoose, db, "users", schema.UserSchema);

    User.logIn = function(email, password, done){
        User.findOne({Email: email} ,function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user - ' + email });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user);
        });
    };

    User.findByEmail = function(email, callback){
        User.findOne({Email: email}, callback);
    };

    return User;
};