module.exports = function(){
    var mongoose        = require('mongoose');
    var db              = mongoose.createConnection('localhost', 'woddiggityTest');
    var schema          = require('../data_access/schema.js')(mongoose);

    return{
        mongoose: mongoose,
        db: db,
        schema: schema
    };
}();