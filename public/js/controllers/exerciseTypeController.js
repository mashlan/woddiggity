
myControllers.controller('ExerciseTypeCtrl', ['$scope', 'ExerciseType','angularGridService', 'UnitOfMeasure',
    function($scope, ExerciseType, angularGridService, UnitOfMeasure) {
        'use strict';

        $scope.hasFormError = false;
        $scope.exercisTypeList = [];
        $scope.exerciseType ={};

        UnitOfMeasure.query().then(function(data){
            $scope.unitsList = data;
        });

        $scope.toggleUnit = function(scope){
            var index = $scope.exerciseType.UnitOfMeasures.indexOf(scope.unit._id);
            if(index  > -1){
                $scope.exerciseType.UnitOfMeasures.splice(index, 1);
                scope.unit.selected = false;
            }else{
                $scope.exerciseType.UnitOfMeasures.push(scope.unit);
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
            scope.exerciseType.UnitOfMeasuresString = "";
            $.each(scope.exerciseType.UnitOfMeasures, function(i, v){
                var comma = scope.exerciseType.UnitOfMeasuresString.length > 0 ? ", ": "";
                scope.exerciseType.UnitOfMeasuresString += comma + v.Name;
            });
        };

        function getUnitOfMeasureName(id){
            var name = "";
            $.each($scope.unitsList, function(i, v){
                if(v._id === id){
                    name = v.Name;
                    return false;
                }else{
                    return true;
                }
            });

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
                            $scope.sortByColumn("Name", "-");
                        }
                        else{alert(p.message);}
                    });
                }else{
                    ExerciseType.update($scope.exerciseType).then(function(data){
                        if(data.success) {
                            $scope.sortByColumn("Name", "-");
                        }
                        else{alert(data.message);}
                    });
                }

                $scope.hasFormError = false;
                $("#exerciseType_form").hide();
            }
        };

        $scope.newExerciseType = function(){
            $scope.exerciseType = ExerciseType.getNew();
            setUnitOfMeasureButtons();
            $("#exerciseType_form").show();
        };

        $scope.setActiveRow = function(scope){
            $("#exerciseTypeTable").find("tr").removeClass("info");
            $("#exerciseType_" + scope.exerciseType._id).addClass("info");
        };

        $scope.getExerciseType =  function(id){
            ExerciseType.get(id).then(function(data){
               $scope.exerciseType = data;
                setUnitOfMeasureButtons();
            });
        };

        $scope.editRecord = function(scope){
            $scope.setActiveRow(scope);
            $scope.editExerciseType();
        };

        function setUnitOfMeasureButtons(){
            $.each($scope.unitsList, function(i, v){
                var unit = $.grep($scope.exerciseType.UnitOfMeasures, function(e){ return e._id === v._id; });
                if(unit.length > 0){
                    v.selected = true;
                }
                else{
                    v.selected = false;
                }
            });
        }

        $scope.cancelExerciseType = function(){
            $("#exerciseType_form").hide();
        };

        $scope.editExerciseType = function(){
            var selectRow = $("#exerciseTypeTable").find("tr.info");
            if(selectRow.length === 0){
                alert("please select a record to edit");
            }
            else{
                var id = selectRow.attr("id").split("_")[1];
                $scope.getExerciseType(id);
                $("#exerciseType_form").show();
            }
        };

        $scope.deleteExerciseType = function(){

        };
    }
]);