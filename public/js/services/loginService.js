
services.factory("Login", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('login', {}, {
            login: {method: 'POST'},
            changePassword: {method: 'PUT'}
        });

        var factory = {
            login: function(data){
                var deferred = $q.defer();
                resource.login({email: data.email, password: data.password},
                    function(resp){
                        deferred.resolve(resp);
                        if(resp.user){
                            window.sessionStorage.setItem("woddo_user", JSON.stringify(resp.user));
                        }
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            changePassword: function(data){

            }
        };

        return factory;
    }
]);