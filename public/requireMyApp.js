require.config({
    paths:{
        jquery: '/lib/jquery/jquery',
        angular: '/lib/angular/angular',
        angularLocal: '/lib/angular/i18n/angular-locale_en',
        angularRoute: '/lib/angular/angular-route',
        angularResource: '/lib/angular/angular-resource',
        angularAnimate: '/lib/angular/angular-animate',
        myApp: '/js/app',
        myAppConfig: '/js/config',
        myAppRoutes: '/js/routes',
        myAppDirectives: '/js/directives',
        myAppFilters: '/js/filters',
        myAppServices: '/js/services/services',
        bootstrap: '/lib/bootstrap/bootstrap',
        highcharts: '/lib/highcharts/highcharts',
        uiBootstrap: '/lib/angular/ui-bootstrap-tpls-0.10.0',

        //angular controllers
        myAppController: '/js/controllers/controllers',
        accountController: '/js/controllers/accountController',
        personController: '/js/controllers/personController',
        userController: '/js/controllers/userController',
        exerciseController: '/js/controllers/exerciseController'
    },
    shim: {
        angular : {deps:['jquery']},
        bootstrap: {deps:['jquery']},
        highcharts: {deps: ['jquery']},
        angularRoute:{deps:['angular']},
        angularResource:{deps:['angular']},
        angularAnimate: {deps:['angular']},
        angularLocal:{deps:['angular']},

        myApp: { deps:['angular'] },
        myAppConfig:{deps: ['angular', 'myApp']},
        myAppDirectives:{deps:['angular', 'myApp']},
        myAppFilters:{deps:['angular', 'myApp']},
        myAppRoutes:{deps:['angular', 'myApp']},
        myAppServices:{deps:['angular', 'myApp']},
        uiBootstrap: {deps:['angular', 'myApp']},

        myAppController:{deps:['angular', 'myApp', 'myAppServices']},
        accountController:{deps:['angular', 'myApp', 'myAppController', 'myAppServices']},
        exerciseController: {deps:['angular', 'myApp', 'myAppController', 'myAppServices']},
        personController: {deps: ['angular', 'myApp','myAppController', 'myAppServices']},
        userController: {deps:['angular', 'myApp', 'myAppController', 'myAppServices']}
    }
});

require([
    'jquery',
    'angular',
    'myApp',
    'myAppConfig',
    'myAppRoutes',
    'myAppFilters',
    'myAppServices',
    'myAppDirectives',
    'myAppController',
    'accountController',
    'personController',
    'exerciseController',
    'bootstrap',
    'angularLocal',
    'angularRoute',
    'angularResource',
    'angularAnimate',
    'highcharts',
    'uiBootstrap']
);