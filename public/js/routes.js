"use strict";

angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//        $locationProvider.html5Mode(true);

        $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeCtrl' });
        $routeProvider.when('/WOD', { authenticate: true, templateUrl: 'partials/WOD.html', controller: 'WodCtrl' });

        //Workout templates
        $routeProvider.when('/workouts', { authenticate: true, templateUrl: 'partials/workouts/index.html', controller: 'WodCtrl' });
        $routeProvider.when('/workouts/weight', { authenticate: true, templateUrl: 'partials/workouts/wendler.html', controller: 'WeightWorkoutCtrl' });

        $routeProvider.when('/admin/exercises', {authenticate: true, templateUrl: 'partials/admin/manageExercises.html', controller: 'ExerciseCtrl' });
        $routeProvider.when('/admin/girls', {authenticate: true, templateUrl: 'partials/admin/manageGirls.html', controller: 'ExerciseCtrl' });
        $routeProvider.when('/admin/heroes', {authenticate: true, templateUrl: 'partials/admin/manageHeroes.html', controller: 'ExerciseCtrl' });
        $routeProvider.when('/admin/exerciseTypes', {authenticate: true, templateUrl: 'partials/admin/manageExerciseTypes.html', controller: 'ExerciseTypeCtrl' });
        $routeProvider.when('/admin/unitsOfMeasure', {authenticate: true, templateUrl: 'partials/admin/manageUnitOfMeasures.html', controller: 'UnitOfMeasureCtrl' });
        $routeProvider.when('/admin/wendler', {authenticate: true, templateUrl: 'partials/admin/wendler.html', controller: 'WendlerCtrl' });

        $routeProvider.when('/coach/recordWod', {authenticate: true, templateUrl: 'partials/coach/recordWod.html', controller: 'ExerciseCtrl' });
        $routeProvider.when('/coach/createWod', {authenticate: true, templateUrl: 'partials/coach/createWod.html', controller: 'ExerciseCtrl' });
        $routeProvider.when('/coach/createLifting', {authenticate: true, templateUrl: 'partials/coach/createLiftingWorkout.html', controller: 'ExerciseCtrl' });

        $routeProvider.when('/account', {authenticate: true, templateUrl: 'partials/account/index.html', controller: 'PersonalCtrl' });
        $routeProvider.when('/login', { templateUrl: 'partials/login.html',  controller: 'LoginCtrl' });
        $routeProvider.when('/logout', { logout: true});
        $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'UserCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .run(function($rootScope, $location, Authentication){
        // register listener to watch for route changes
        // this event will fire every time the route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if(next.authenticate){
                Authentication.isLoggedIn().then(function(resp){
                    if(resp.user){
                        $rootScope.ActiveUser = resp.user;
                        $rootScope.isAuthenticated = true;
                    }else{
                        $rootScope.ActiveUser = null;
                        $rootScope.isAuthenticated = false;
                        $location.path("/login");
                    }
                });
            }

            if(next.logout){
                Authentication.logout().then(function(resp){
                    clearActiveUser();
                });
            }

            function clearActiveUser(){
                $rootScope.ActiveUser = null;
                $rootScope.isAuthenticated = false;
                $location.path("/login");
            }
        });
    });
