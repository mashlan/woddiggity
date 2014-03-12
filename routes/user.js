var mongoose            = null;
var UserSchema          = require('../models/user.js').UserSchema;
var User                = null;

exports.init = function(mg, db){
    User =  db.model("users", UserSchema);
    mongoose = mg;
};

exports.list = function(req, res){
    var sortValue = req.query.sortName;
    var sortDirection = req.query.sortDirection;
    if(!sortDirection) sortDirection = "";
    if(!sortValue) sortValue = "";

    var query = User.find({}).sort(sortDirection + sortValue);
    query.exec(function(error, exercises){
        res.json(exercises);
    });
};

exports.logIn = function(req, res){
    User.findOne({Email: req.body.email}, function(err, user) {
        if (user && user.authenticate(req.body.password)) {
            res.json({user: user});
        } else {
            res.json({error: 'Invalid email or password'});
        }
    });
};

exports.logout = function(req, res){
    req.session.user_id = null;
};

exports.get = function(req, res){
    var id = req.params.id;
    User.find({_id: mongoose.Types.ObjectId(id)}, function(err, data){
        if(data.length > 0){res.json(data[0]); }
        else res.json(err);
    })
};

exports.create = function(req, res){
    var ObjectId = mongoose.Types.ObjectId;
    var data = new User(res.body);
    data._id = ObjectId();

    data.save(function(err, doc){
        if(err ){res.json(err);}
        else if(!doc){throw 'Error';}
        else{res.json(doc);}
    });
};

exports.update = function(req, res){
    var id = mongoose.Types.ObjectId(req.body._id);
    var query = {_id: id};
    delete req.body._id;

    User.update(query, req.body, function(err, doc){
        if(err ){res.json({error: err.message});}
        else if(!doc){throw 'Error';}
        else{res.json({success: true});}
    });
};

exports.delete = function(req, res){
    User.remove({_id: mongoose.Types.ObjectId(req.params.id)}, function(err){
        if(err ){res.json(err);}
        else{res.json({success: true});}
    });
};


