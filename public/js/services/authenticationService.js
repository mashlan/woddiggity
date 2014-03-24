services.factory('Authentication', ['$resource', '$q', function($resource, $q) {
    var resource = $resource('authentication/:userId', {}, {
        getUser: {method: 'GET', params: {userId: "" }}
    });

    var factory = {
        isLoggedIn: function(userId){
            var deferred = $q.defer();
            resource.get({userId: userId},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );
        },
        hasRole: function(userId, roleId){
            var deferred = $q.defer();
            resource.get({userId: userId},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );
        }
    };

    return factory;

}]);