
module.exports = function(mongoose, db, modelName, schema){
    var ActiveRecord = db.model(modelName, schema);

    return {
        sort: function(sortValues, params, callback){
            var sortValue = sortValues.sortName;
            var sortDirection = sortValues.sortDirection;
            if(!sortDirection) sortDirection = "";
            if(!sortValue) sortValue = "";

            var query = ActiveRecord.find({}).sort(sortDirection + sortValue);
            query.exec(callback);
        },
        find: function(searchQuery, callback){
            if(!searchQuery){searchQuery = {};}
            ActiveRecord.find(searchQuery).exec(callback);
        },
        findOne: function(searchQuery, callback){
            ActiveRecord.findOne(searchQuery, callback);
        },
        findById: function(id, callback){
            var objectId = mongoose.Types.ObjectId(id);
            ActiveRecord.findById(objectId, callback);
        },
        create: function(data, callback){
            var ObjectId = mongoose.Types.ObjectId;
            data._id = ObjectId();
            var newData = new ActiveRecord(data);
            newData.save(callback);
        },
        update: function(data, callback){
            var id = mongoose.Types.ObjectId(data._id);
            var query = {_id: id};
            delete data._id;
            ActiveRecord.update(query, data, callback);
        },
        delete: function(id, callback){
            ActiveRecord.remove({_id: mongoose.Types.ObjectId(id)}, callback);
        },
        deleteAll: function(callback){
            ActiveRecord.remove(callback);
        },
        model: ActiveRecord
    };
};