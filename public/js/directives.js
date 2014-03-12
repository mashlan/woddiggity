'use strict';

/* Directives */
angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        }
    }])

    .directive('initTooltip', [ function(){
        return {
            link: function($scope, element) {
                $(element).tooltip();
            }
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

    .directive('prHelp', [function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/help/prHelp.html"
        };
    }]);