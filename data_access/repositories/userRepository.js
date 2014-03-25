module.exports = function(mongoose, db, modelName, schema){
    var activeRecord    = require('./repository.js');
    var User            = activeRecord(mongoose, db, modelName, schema);

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

    User.updatePassword = function(user, newPassword, callback){
        var updateUser = new User.model(user);
        updateUser.password = newPassword;

        var data = {
            _id: user._id,
            HashedPassword: updateUser.HashedPassword,
            Salt: updateUser.Salt
        };

        User.update(data, callback);
    };

    return User;
};