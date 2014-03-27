
module.exports = function(mongoose, db, modelName, schema, repository){
    if(!repository){
        repository = require('../data_access/repositories/repository.js')(mongoose, db, modelName, schema);
    }

    var dataRepository  = repository;

    return {
        list: function(req, res){
            dataRepository.sort(req.query, req.params, function(err, data){
                res.json(data);
            });
        },
        get: function(req, res){
            var id = req.params.id;
            dataRepository.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, data){
                if(data){res.json(data); }
                else res.json(err);
            });
        },
        create: function(req, res){
            dataRepository.create(req.body, function(err, doc){
                if(err){res.json(err);}
                else if(!doc){res.json({message: "unknown error"});}
                else{res.json(doc);}
            });
        },
        update: function(req, res){
            dataRepository.update(req.body, function(err){
                if(err){res.json(err);}
                else{res.json({success: true});}
            });
        },
        delete: function(req, res){
            dataRepository.delete(req.params.id, function(err){
                if(err ){res.json(err);}
                else{res.json({success: true});}
            });
        }
    };
};