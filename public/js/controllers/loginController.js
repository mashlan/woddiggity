'use strict';

myControllers.controller('LoginCtrl', ['$scope', 'Login', '$location',
    function ($scope, Login, $location) {
        $scope.username = null;
        $scope.password = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.login = function (cb) {
            $scope.err = null;
            if (!$scope.username) {
                $scope.err = 'Please enter an email address';
            }
            else if (!$scope.password) {
                $scope.err = 'Please enter a password';
            }
            else {
                Login.login($scope).then(function (data) {
                    $scope.err = data.error ? data.error + '' : null;
                    if (data.user) {
                        $location.path('/home');
                    }
                });
            }
        };
    }
]);