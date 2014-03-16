'use strict';

myControllers.controller('UnitOfMeasureCtrl', ['$scope', 'UnitOfMeasure', 'angularGridService',
    function($scope, UnitOfMeasure, angularGridService) {
        $scope.hasFormError = false;
        $scope.unitOfMeasureList = [];
        $scope.unitOfMeasure = {
            _id: null,
            Name: '',
            Description: ''
        };

        $scope.getListRecords = function(defaultSort){
            angularGridService.sortByColumn(UnitOfMeasure, $scope, "unitOfMeasureList", "unitOfMeasure", defaultSort);
        };

        $scope.sortByColumn = function(sortName){
            angularGridService.sortByColumn(UnitOfMeasure, $scope, "unitOfMeasureList","unitOfMeasure", sortName);
        };

        $scope.saveUnitOfMeasure = function(){
            if($scope.measureForm.$invalid){
                $scope.hasFormError = true;
            }
            else{
                var isNew = $scope.unitOfMeasure._id == null;

                if(isNew){
                    UnitOfMeasure.insert($scope.unitOfMeasure).then(function(p, resp){
                        if(!p.message) {
                            $scope.sortByColumn("Name");
                        }
                        else{alert(p.message);}
                    });
                }else{
                    UnitOfMeasure.update($scope.unitOfMeasure).then(function(data){
                        if(data.success) {
                            $scope.sortByColumn($scope.sortValues.name, $scope.sortValues.direction);
                        }
                        else{alert(data.message);}
                    });
                }

                $scope.hasFormError = false;
                $("#myModalUnits").modal('hide');
            }
        };

        $scope.newUnitOfMeasure = function(){
            $scope.unitOfMeasure = {
                _id: null,
                Name: '',
                Description: ''
            };
        };

        $scope.editRecord = function(){

        };

        $scope.editUnitOfMeasure = function(){

        };

        $scope.deleteUnitOfMeasure = function(){

        };
    }
]);