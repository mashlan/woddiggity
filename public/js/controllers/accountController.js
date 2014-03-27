
myControllers.controller('AccountCtrl', ['$scope', '$rootScope', 'Authentication',
    function ($scope, $rootScope, Authentication) {
        'use strict';

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
            Authentication.changePassword(buildPwdParms());
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