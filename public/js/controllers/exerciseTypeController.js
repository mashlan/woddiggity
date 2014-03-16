'use strict';

myControllers.controller('ExerciseTypeCtrl', ['$scope', 'ExerciseType','angularGridService', 'UnitOfMeasure',
    function($scope, ExerciseType, angularGridService, UnitOfMeasure) {

        $scope.exercisTypeList = [];
        $scope.exerciseType = {
            _id: null,
            Name: "",
            Description: "",
            UnitOfMeasureIds: []
        };

        UnitOfMeasure.query().then(function(data){
            $scope.unitsList = data;
        });

        $scope.toggleUnit = function(scope){
            var index = $scope.exerciseType.UnitOfMeasureIds.indexOf(scope.unit._id);
            if(index  > -1){
                $scope.exerciseType.UnitOfMeasureIds.splice(index, 1);
                scope.unit.selected = false;
            }else{
                $scope.exerciseType.UnitOfMeasureIds.push(scope.unit._id);
                scope.unit.selected = true;
            }
        };

        $scope.getListRecords = function(defaultSort){
            angularGridService.sortByColumn(ExerciseType, $scope, "exerciseTypeList", "exerciseType", defaultSort);
        };

        $scope.sortByColumn = function(sortName){
            angularGridService.sortByColumn(ExerciseType, $scope, "exerciseTypeList", "exerciseType", sortName);
        };

        $scope.setUnitOfMeasureString = function(scope){
            scope.exerciseType.UnitOfMeasureIdString = "";
            $.each(scope.exerciseType.UnitOfMeasureIds, function(i, v){
                var comma = scope.exerciseType.UnitOfMeasureIdString.length > 0 ? ", ": "";
                scope.exerciseType.UnitOfMeasureIdString += comma + getUnitOfMeasureName(v);
            })
        }

        function getUnitOfMeasureName(id){
            var name = "";
            $.each($scope.unitsList, function(i, v){
                if(v._id == id){
                    name = v.Name;
                    return false;
                }else{
                    return true;
                }
            })

            return name;
        }

        $scope.saveExerciseType = function(){
            if($scope.exerciseTypeForm.$invalid){
                $scope.hasFormError = true;
            }
            else{
                var isNew = $scope.exerciseType._id == null;

                if(isNew){
                    ExerciseType.insert($scope.exerciseType).then(function(p, resp){
                        if(!p.message) {
                            $scope.sortByColumn("Name");
                        }
                        else{alert(p.message);}
                    });
                }else{
                    ExerciseType.update($scope.exerciseType).then(function(data){
                        if(data.success) {
                            $scope.sortByColumn("Name");
                        }
                        else{alert(data.message);}
                    });
                }

                $scope.hasFormError = false;
                $("#myModalTypes").modal('hide');
            }
        };

        $scope.newExerciseType = function(){
            $scope.exerciseType = {
                _id: null,
                Name: "",
                Description: "",
                UnitOfMeasureIds: []
            };
        };

        $scope.editRecord = function(){

        };

        $scope.editExerciseType = function(){

        };

        $scope.deleteExerciseType = function(){

        };
    }
]);