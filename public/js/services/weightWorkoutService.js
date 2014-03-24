
services.factory("WeightWorkout", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('workout/weight/:wwId/:id/', {}, {
            query: {method: 'GET', params: {wwId: 'all', id: 0, sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(userId, sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({wwId: 'all', id: userId, sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({id: id },
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
                resource.remove({id: id },
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
        };

        return factory;
    }
]);