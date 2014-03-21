services.factory('Exercise', ['$resource', '$q', function($resource, $q){
    var resource = $resource('exercise/:exerciseId', {}, {
        query: {method:'GET', params:{exerciseId:'exercise', sortName: null}, isArray:true},
        get: {method: 'GET', params: {exerciseId: 0 }},
        remove: {method: 'DELETE'},
        insert: {method: 'POST'},
        update: {method: 'PUT'}
    });

    var factory = {
        query: function(sortByName, sortDir){
            var deferred = $q.defer();
            resource.query({exerciseId: 'exercise', sortName:sortByName, sortDirection: sortDir},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        get: function (id) {
            var deferred = $q.defer();
            resource.get({exerciseId: id },
                function (resp) {
                    deferred.resolve(resp);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        },
        getNew: function(){
            return {
                _id: null,
                Name: "",
                Abbreviation: "",
                Description: "",
                ExerciseTypeId: ""
            };
        },
        remove: function (id) {
            var deferred = $q.defer();
            resource.remove({exerciseId: id },
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
}]);