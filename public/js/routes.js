"use strict";

angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {authenticate: false, templateUrl: 'partials/home.html', controller: 'HomeCtrl' });
        $routeProvider.when('/WOD', { authenticate: true, templateUrl: 'partials/WOD.html', controller: 'WodCtrl' });

        //Workout templates
        $routeProvider.when('/workouts', { authenticate: true, templateUrl: 'partials/workouts/index.html', controller: 'WodCtrl' });
        $routeProvider.when('/workouts/weight', { authenticate: true, templateUrl: 'partials/workouts/wendler.html', controller: 'WeightWorkoutCtrl' });

        $routeProvider.when('/admin/exercises', {authenticate: true, templateUrl: 'partials/admin/manageExercises.html', controller: 'ExerciseCtrl' });
        $routeProvider.when('/admin/wendler', {authenticate: true, templateUrl: 'partials/admin/wendler.html', controller: 'WendlerCtrl' });

        $routeProvider.when('/account', {authenticate: true, templateUrl: 'partials/account/index.html', controller: 'PersonalCtrl' });
        $routeProvider.when('/login', { templateUrl: 'partials/login.html',  controller: 'LoginCtrl' });
        $routeProvider.when('/logout', { templateUrl: 'partials/logout.html', controller: 'LoginCtrl'});
        $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'UserCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .run(function($rootScope, $location){
        $rootScope.ActiveUser = {};

        // register listener to watch for route changes
        // this event will fire every time the route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            var storage = window.sessionStorage.getItem("woddo_user");
            if(storage == 'null') {storage = null};
            if(next.authenticate){
                if (!storage) {
                    // no logged user, we should be going to the login route
                    if (next.templateUrl == "partials/login.html") {
                        // already going to the login route, no redirect needed
                    } else {
                        // not going to the login route, we should redirect now
                        $location.path("/login");
                    }
                    $rootScope.isAuthenticated = false;
                }
                else{
                    $rootScope.isAuthenticated = true;
                    $rootScope.ActiveUser = JSON.parse(storage);
                }
            }else{
                if(next.templateUrl == 'partials/logout.html'){
                    window.sessionStorage.setItem("woddo_user", null);
                    $rootScope.ActiveUser = null;
                    $rootScope.isAuthenticated = false;
                    $location.path('/login');
                }
                else{
                    $rootScope.ActiveUser = JSON.parse(storage);
                    $rootScope.isAuthenticated = $rootScope.ActiveUser != null;
                }
            }
        });
    });
