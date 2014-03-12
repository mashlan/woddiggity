
services.factory("User", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('user/:userId', {}, {
            query: {method: 'GET', params: {userId: 'users', sortName: null}, isArray:true},
            get: {method: 'GET', params: {userId: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({userId: 'users', sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({userId: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({userId: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        }

        return factory;
    }
]);