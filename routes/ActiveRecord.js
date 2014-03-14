
exports.record = function(mongoose, db, modelName, schema){
    var activeRecord = db.model(modelName, schema);

    return {
        list: function(req, res){
            var sortValue = req.query.sortName;
            var sortDirection = req.query.sortDirection;
            if(!sortDirection) sortDirection = "";
            if(!sortValue) sortValue = "";

            var query = activeRecord.find({}).sort(sortDirection + sortValue);
            query.exec(function(error, exercises){
                res.json(exercises);
            });
        },
        get: function(req, res){
            var id = req.params.id;
            activeRecord.find({_id: mongoose.Types.ObjectId(id)}, function(err, exercise){
                if(exercise.length > 0){res.json(exercise[0]); }
                else res.json(err);
            })
        },
        create: function(req, res){
            var ObjectId = mongoose.Types.ObjectId;
            var ex = new activeRecord(res.body);
            ex._id = ObjectId();

            ex.save(function(err, doc){
                if(err ){res.json(err);}
                else if(!doc){throw 'Error';}
                else{res.json(doc);}
            });
        },
        update: function(req, res){
            var id = mongoose.Types.ObjectId(req.body._id);
            var query = {_id: id};
            delete req.body._id;

            activeRecord.update(query, req.body, function(err){
                if(err){res.json(err);}
                else{res.json({success: true});}
            });
        },
        delete: function(req, res){
            activeRecord.remove({_id: mongoose.Types.ObjectId(req.params.id)}, function(err){
                if(err ){res.json(err);}
                else{res.json({success: true});}
            });
        }
    };
};