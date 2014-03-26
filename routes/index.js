

module.exports = function(app, mongoose, db, schema, passport){

    //controller and repository files. repo files are only those that are created for exceptions to the rule
    var controller              = require('../controllers/controller.js');
    var prRepo                  = require('../data_access/repositories/personalRecordRepository.js')(mongoose, db, "personalRecords", schema.PersonalRecord);
    var userRepo                = require('../data_access/repositories/userRepository.js')(mongoose, db, "users", schema.User);

    var exercise                = controller(mongoose, db, "exercises", schema.Exercise);
    var user                    = controller(null, null, null, null, userRepo);
    var personalRecords         = controller(null, null, null, null, prRepo);
    var weightWorkouts          = controller(mongoose, db, "weightWorkouts", schema.WeightWorkout);
    var wendlerWorkouts         = controller(mongoose, db, "wendlerWorkouts", schema.WendlerWorkout);
    var exerciseTypes           = controller(mongoose, db, "exerciseTypes", schema.ExerciseType);
    var unitOfMeasures          = controller(mongoose, db, "unitOfMeasures", schema.UnitOfMeasure);

    //login/logout
    app.post('/login', function(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                if(info) {return res.json({error: info.message});}
                else{ return res.json({error:'Invalid email or password'});}
            }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json({user: user});
            });

        })(req, res, next);
    });

   app.get('/logout',function(req, res, next){
       req.logout();
   });

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
        res.json({message: 'user not logged in'});
    }
};



