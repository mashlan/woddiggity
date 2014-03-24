
exports.record = function(mongoose, db, schema){
    var User =  db.model("users", schema.UserSchema);

    return {
        list: function(req, res){
            var sortValue = req.query.sortName;
            var sortDirection = req.query.sortDirection;
            if(!sortDirection) sortDirection = "";
            if(!sortValue) sortValue = "";

            var query = User.find({}).sort(sortDirection + sortValue);
            query.exec(function(error, exercises){
                res.json(exercises);
            });
        },
        findByEmail: function(email,callback){
            User.findOne({Email: email}).exec(callback);
        },
        logIn: function(email, password, done){
            User.findOne({Email: email} ,function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + username });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            });
        },
        findById: function(id){
            User.findById(id, function(err, user) {
                    return user;
                }
            );
        },
        findOne: function(email, password){
            User.findOne({Email: email}, function(err, user) {
                if(err) return{error: err.message};
                if(!user)return {error: "Incorrect username."};
                if (user.authenticate(password)) {
                    return user;
                } else {
                    return {error: "Incorrect password"};
                }
            });
        },
        logout: function(req, res){
            req.session.user_id = null;
        },
        get: function(req, res){
            var id = req.params.id;
            User.find({_id: mongoose.Types.ObjectId(id)}, function(err, data){
                if(data.length > 0){res.json(data[0]); }
                else res.json(err);
            })
        },
        insertNew: function(user, callback) {
            var newUser = new User(user);
            newUser.save(callback);
        },
        create: function(req, res){
            var ObjectId = mongoose.Types.ObjectId;
            var data = new User(req.body);
            data._id = ObjectId();

            data.save(function(err, doc){
                if(err ){res.json(err);}
                else if(!doc){throw 'Error';}
                else{res.json(doc);}
            });
        },
        update: function(req, res){
            var id = mongoose.Types.ObjectId(req.body._id);
            var query = {_id: id};
            delete req.body._id;

            User.update(query, req.body, function(err, doc){
                if(err ){res.json({error: err.message});}
                else if(!doc){throw 'Error';}
                else{res.json({success: true});}
            });
        },
        remove: function(id,callback){
          User.remove({_id: mongoose.Types.ObjectId(id)}, callback);
        },
        removeAll : function(callback){
            User.remove(callback);
        },
        delete: function(req, res){
            User.remove({_id: mongoose.Types.ObjectId(req.params.id)}, function(err){
                if(err ){res.json(err);}
                else{res.json({success: true});}
            });
        }
    };
};