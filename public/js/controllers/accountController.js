
myControllers.controller('AccountCtrl', ['$scope', '$rootScope', 'Login',
    function ($scope, $rootScope, Login) {
        'use strict';

//        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

//        $scope.logout = function () {
//            loginService.logout();
//        };

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;

        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
        };

        $scope.cancelChangePassword = function(){
            $("#change_password_text").show();
            $("#change_password").hide();
        };

        $scope.updatePassword = function () {
            $scope.reset();
            Login.changePassword(buildPwdParms());
        };

        function buildPwdParms() {
            return {
                email: $rootScope.ActiveUser.Email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function (err) {
                    if (err) {
                        $scope.err = err;
                    }
                    else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            };
        }
    }
]);