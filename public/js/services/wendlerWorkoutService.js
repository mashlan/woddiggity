
services.factory("WendlerWorkout", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('wendler/:wId/:id/', {}, {
            query: {method: 'GET', params: {wId: 'all', sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({wId: 'all', sortName:sortByName, sortDirection: sortDir},
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