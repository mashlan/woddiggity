module.exports = function(app, process, dirname, express, path, routes) {
    app.use(express.cookieParser());
    app.use(express.session({secret: '1234599WODLOG'}));

    app.set('port',  process.env.PORT || 5000);
    app.use(express.favicon(dirname + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(dirname + '/public'));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    //set routing config
    app.get('/', routes.index);

    //login/logout
    app.post('/login', routes.user.logIn);
//    app.get('/logout', routes.user.logout);

    //exercise schema
    app.get('/exercise/exercise', routes.exercise.list);
    app.get('/exercise/:id', routes.exercise.get);
    app.post('/exercise', routes.exercise.create);
    app.delete('/exercise/:id', routes.exercise.delete);
    app.put('/exercise', routes.exercise.update);

    //exercise type schema
    app.get('/exerciseType/all', routes.exerciseTypes.list);
    app.get('/exerciseType/:id', routes.exerciseTypes.get);
    app.post('/exerciseType', routes.exerciseTypes.create);
    app.delete('/exerciseType/:id', routes.exerciseTypes.delete);
    app.put('/exerciseType', routes.exerciseTypes.update);

    //unit of measure schema
    app.get('/unitOfMeasure/all', routes.unitOfMeasures.list);
    app.get('/unitOfMeasure/:id', routes.unitOfMeasures.get);
    app.post('/unitOfMeasure', routes.unitOfMeasures.create);
    app.delete('/unitOfMeasure/:id', routes.unitOfMeasures.delete);
    app.put('/unitOfMeasure', routes.unitOfMeasures.update);

    //user schema
    app.get('/user/users', routes.user.list);
    app.get('/user/:id', routes.user.get);
    app.post('/user', routes.user.create);
    app.delete('/user/:id', routes.user.delete);
    app.put('/user', routes.user.update);

    //pr schema
    app.get('/pr/records/:id', routes.personalRecords.list);
    app.get('/pr/:id', routes.personalRecords.get);
    app.post('/pr', routes.personalRecords.create);
    app.delete('/pr/:id', routes.personalRecords.delete);
    app.put('/pr', routes.personalRecords.update);

    //weight workout schema
    app.get('/workout/weight/all/:id', routes.weightWorkouts.list);
    app.get('/workout/weight/:id', routes.weightWorkouts.get);
    app.post('/workout/weight', routes.weightWorkouts.create);

    //wendler workout schema
    app.get('/wendler/all', routes.wendlerWorkouts.list);
    app.get('/wendler/:id', routes.wendlerWorkouts.get);
    app.post('/wendler', routes.wendlerWorkouts.create);

    app.get('')
}