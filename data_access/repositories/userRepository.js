module.exports = function(mongoose, db, modelName, schema){
    var activeRecord    = require('./repository.js')(mongoose, db, modelName, schema);
    var User            = activeRecord;

    User.create = function(user, callback){
        if(!validatePassword(user.password)){
            callback({message: "Invalid Password"}, null);
        }else{
            var ObjectId = mongoose.Types.ObjectId;
            user._id = ObjectId();
            var newData = new User.model(user);
            newData.save(callback);
        }
    };

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
        if(!validatePassword(newPassword)){ callback({message: "Invalid Password"}, null);}
        else {
            var updateUser = new User.model(user);
            updateUser.password = newPassword;

            var data = {
                _id: user._id,
                HashedPassword: updateUser.HashedPassword,
                Salt: updateUser.Salt
            };

            User.update(data, callback);
        }
    };

    function validatePassword(pass){
        return pass && pass.length > 5;
    }

    return User;
};