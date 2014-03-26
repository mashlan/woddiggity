
myControllers.controller('UserCtrl', ['$scope', '$rootScope', '$location', 'User',
    function($scope, $rootScope, $location, User) {
        'use strict';
        $scope.confirmPassword = '';

        $scope.user = {
            _id: null,
            FirstName: '',
            LastName: '',
            Email: '',
            password: ''
        };

        $scope.List = [];
        $scope.sortValues = {
            name: '',
            direction: '',
            text: ''
        };

        $scope.getListRecords = function(defaultSort){
            User.query(defaultSort);
        };

        $scope.createUser = function(){
            if($scope.user.FirstName === ""){
                $scope.err = "Please enter a First Name";
            }
            else if ($scope.user.LastName === ""){
                $scope.err = "Please enter a Last Name";
            }
            else if($scope.user.Email === ""){
                $scope.err = "Please enter an Email address";
            }
            else if($scope.user.password === ""){
                $scope.err = "Please enter a Password";
            }
            else if($scope.user.password !== $scope.confirmPassword){
                $scope.err = "Password does not match Confirm Password";
            }
            else{
                User.insert($scope.user).then(function(data){
                    if(data.errors){$scope.err = data.message;}
                    if(data.message){ $scope.err = data.message; }
                    else{
                        window.sessionStorage.setItem("woddo_user", JSON.stringify(data));
                        $rootScope.ActiveUser = data;
                        $rootScope.isAuthenticated = $rootScope.ActiveUser != null;
                        $location.path("/home");
                    }
                });
            }
        };
    }
]);