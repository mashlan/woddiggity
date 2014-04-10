
myControllers.controller('LoginCtrl', ['$scope', 'Authentication', '$location',
    function ($scope, Authentication, $location) {
        'use strict';

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
                Authentication.login($scope).then(function (data) {
                    $scope.err = data.error ? data.error + '' : null;
                    if (data.user) {
                        $location.path('/account');
                    }
                });
            }
        };
    }
]);