

module.exports = function(app, mongoose, db, schema, passport){
    var userRoutes              = require('./user.js');
    var prRoutes                = require('./personalRecord.js');
    var path                    = require('path');
    var activeRecord            = require('./ActiveRecord.js');


    var exercise        = activeRecord.record(mongoose, db, "exercises", schema.ExerciseSchema);
    var user            = userRoutes.record(mongoose, db, schema);
    var personalRecords = prRoutes.record(mongoose, db, schema, activeRecord);
    var weightWorkouts  = activeRecord.record(mongoose, db, "weightWorkouts", schema.WeightWorkoutSchema);
    var wendlerWorkouts = activeRecord.record(mongoose, db, "wendlerWorkouts", schema.WendlerWorkoutSchema);
    var exerciseTypes   = activeRecord.record(mongoose, db, "exerciseTypes", schema.ExerciseTypeSchema);
    var unitOfMeasures  = activeRecord.record(mongoose, db, "unitOfMeasures", schema.UnitOfMeasureSchema);


    //login/logout
    app.post('/login', function(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.json({error:'Invalid email or password'})}

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json({user: user});
            });

        })(req, res, next);
    });

//    app.get('/logout', routes.user.logout);

    //exercise schema
    app.get('/exercise/exercise', exercise.list);
    app.get('/exercise/:id', ensureAuthenticated, exercise.get);
    app.post('/exercise', ensureAuthenticated, exercise.create);
    app.delete('/exercise/:id', ensureAuthenticated, exercise.delete);
    app.put('/exercise', ensureAuthenticated, exercise.update);

    //exercise type schema
    app.get('/exerciseType/all', ensureAuthenticated, exerciseTypes.list);
    app.get('/exerciseType/:id', ensureAuthenticated, exerciseTypes.get);
    app.post('/exerciseType', ensureAuthenticated, exerciseTypes.create);
    app.delete('/exerciseType/:id', ensureAuthenticated, exerciseTypes.delete);
    app.put('/exerciseType', ensureAuthenticated, exerciseTypes.update);

    //unit of measure schema
    app.get('/unitOfMeasure/all', ensureAuthenticated, unitOfMeasures.list);
    app.get('/unitOfMeasure/:id', ensureAuthenticated, unitOfMeasures.get);
    app.post('/unitOfMeasure', ensureAuthenticated, unitOfMeasures.create);
    app.delete('/unitOfMeasure/:id', ensureAuthenticated, unitOfMeasures.delete);
    app.put('/unitOfMeasure', ensureAuthenticated, unitOfMeasures.update);

    //user schema
    app.get('/user/users', ensureAuthenticated, user.list);
    app.get('/user/:id', ensureAuthenticated, user.get);
    app.post('/user', user.create);
    app.delete('/user/:id', ensureAuthenticated, user.delete);
    app.put('/user', ensureAuthenticated, user.update);

    //pr schema
    app.get('/pr/records/:id', ensureAuthenticated, personalRecords.list);
    app.get('/pr/:id', ensureAuthenticated, personalRecords.get);
    app.post('/pr', ensureAuthenticated, personalRecords.create);
    app.delete('/pr/:id', ensureAuthenticated, personalRecords.delete);
    app.put('/pr', ensureAuthenticated, personalRecords.update);

    //weight workout schema
    app.get('/workout/weight/all/:id', ensureAuthenticated, weightWorkouts.list);
    app.get('/workout/weight/:id', ensureAuthenticated, weightWorkouts.get);
    app.post('/workout/weight', ensureAuthenticated, weightWorkouts.create);

    //wendler workout schema
    app.get('/wendler/all', ensureAuthenticated, wendlerWorkouts.list);
    app.get('/wendler/:id', ensureAuthenticated, wendlerWorkouts.get);
    app.post('/wendler', ensureAuthenticated, wendlerWorkouts.create);

    app.get('');

    function ensureAuthenticated(req, res, next) {
        if (req.user) {return next();}
        res.redirect('/');
    }
};



