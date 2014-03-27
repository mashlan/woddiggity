services.factory('Authentication', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {
    var resource = $resource('authentication/:method/:userId', {}, {
        get: {method: 'GET'},
        login: {method: 'POST'},
        changePassword: {method: 'PUT'},
        logout: {method: 'GET', params: {method: 'logout', userId: ""}}
    });

    var factory = {
        isLoggedIn: function(){
            var deferred = $q.defer();
            resource.get({},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        hasRole: function(userId, roleId){
            var deferred = $q.defer();
            resource.get({userId: userId},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        login: function(data){
            var deferred = $q.defer();
            resource.login({username: data.username, password: data.password},
                function(resp){
                    deferred.resolve(resp);
                    if(resp.user){
                        $rootScope.ActiveUser = resp.user;
                        $rootScope.isAuthenticated = true;
                    }
                },
                function(error){
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        },
        logout: function(){
            var deferred = $q.defer();
            resource.logout({method: 'logout'},
                function(resp){ deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        changePassword: function(){

        }
    };

    return factory;

}]);