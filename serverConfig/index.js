module.exports = function(app, process, dirname, express, path, passport) {

    app.use(express.static(dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: '1234599WODLOG' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);


    app.set('port',  process.env.PORT || 5000);
    app.use(express.favicon(dirname + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    //set routing config
    app.get('/', function(req, res){
        res.sendfile(path.join(dirname, 'public/index.html'));
    });

};