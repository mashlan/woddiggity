'use strict';

/* Directives */
angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        }
    }])

    .directive('oneRepMaxForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/account/estimatedOneRepMax.html"
        };
    }])

    .directive('boxInfoForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/account/boxInformation.html"
        };
    }])

    .directive('userPreferencesForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/account/userPreferences.html"
        };
    }])

    .directive('changePasswordForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/account/changePassword.html"
        };
    }])

    .directive('enterPrForm', [function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/account/enterPR.html"
        };
    }])

    .directive('editPrRecords', [function(){
        return{
            restrict: 'E',
            replace: false,
            templateUrl: './partials/account/prHistoryEdit.html'
        };
    }])

    .directive('editAccountInfo', [function(){
       return{
           restrict: 'E',
           replace: false,
           templateUrl: './partials/account/editAccountInfo.html'
       };
    }])

    .directive('prHelp', [function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/help/prHelp.html"
        };
    }])

    .directive('exerciseTypeForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/admin/manageExerciseTypes.html"
        };
    }]);