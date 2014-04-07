'use strict';

/* Common Directives */
var myAppDirectives = angular.module('myApp.directives', []);

myAppDirectives
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

    .directive('setPreferenceOption', ['$timeout', '$rootScope', function($timeout, $rootScope){
        return{
            link: function($scope, element){
//                $timeout(function(){
                    var preferences = $rootScope.ActiveUser.Preferences;
                    if(preferences){
                        if($scope.exType && $scope.exType._id){
                            var pref = $.grep(preferences, function(e) {return e.ExerciseTypeId === $scope.exType._id});
                            if(pref.length > 0){
                                $scope.exType.unitPreference = pref[0];
//                                var index = getUnitIndex($scope, pref[0].UnitOfMeasureId);
//                                var elementId = element.attr("id");
//                                document.getElementById(elementId).selectedIndex = index;
//                                $("#" + elementId + " option[value='" + index + "']").attr("selected", "selected");
//                                element.val(index);
                            }
                        }
                    }
//                }, 0, false);

                function getUnitIndex(scope, id){
                    var index = null;
                    $.each(scope.exType.UnitOfMeasures, function(i, v){
                        if(v._id === id){
                            index = i;
                            return false;
                        }else{
                            return true;
                        }
                    });

                    return index;
                }
            }
        }
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

    .directive('unitOfMeasureForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/admin/manageUnitOfMeasures.html"
        };
    }])

    .directive('exerciseTypeForm', [ function(){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "./partials/admin/manageExerciseTypes.html"
        };
    }]);