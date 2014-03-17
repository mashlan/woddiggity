'use strict';

myControllers.controller('ExerciseCtrl', ['$scope', 'Exercise', 'angularGridService',
    function($scope, Exercise, angularGridService) {
        $scope.exercise = {
            _id: null,
            Name: "",
            Description: ""
        }

        $scope.gridId = "test";

        $scope.exerciseList = [];

        $scope.getListRecords = function(defaultSort){
            angularGridService.sortByColumn(Exercise, $scope, "exerciseList", "exercise", defaultSort);
        };

        $scope.sortByColumn = function(sortName){
            angularGridService.sortByColumn(Exercise, $scope, "exerciseList","exercise", sortName);
        };

        $scope.getExercise = function(id){
            Exercise.get(id).then(function(data){
                $scope.exercise = data;
            });
        };

        $scope.newExercise = function(){
            $scope.exercise = {
                _id: null,
                Name: "",
                Description: ""
            }
        };

        $scope.editRecord = function(scope){
            $scope.setActiveRow(scope);
            $scope.editExercise();
        };

        $scope.editExercise = function(){
            var selectRow = $("#exerciseTable").find("tr.success");
            if(selectRow.length == 0){
                alert("please select a row to edit");
            }
            else{
                var id = selectRow.attr("id").split("_")[1];
                $scope.getExercise(id)
                $("#myModal").modal('show');
            }
        };

        function getExerciseObject(id){
            $.each($scope.exerciseList, function(i, v){
                if(v._id == id){
                    $scope.exercise = v;
                }
            })
        };

        $scope.deleteExercise = function(){
            var selectRow = $("#exerciseTable").find("tr.success");
            if(selectRow.length == 0){
                alert("please select a row to edit");
            }
            else{
                Exercise.remove(selectRow.attr("id")).then(function(d){
                    if(d.success){
                        $scope.sortByColumn($scope.sortValues.name, $scope.sortValues.direction);
                    }else{
                        alert(d);
                    }
                });
            }
        }

        $scope.saveExercise = function(){
            var isNew = $scope.exercise._id == null;

            if(isNew){
                Exercise.insert($scope.exercise).then(function(p, resp){
                    if(!p.message) {
                        $scope.sortByColumn($scope.sortValues.name, $scope.sortValues.direction);
                    }
                    else{alert(p.message);}
                });
            }else{
                Exercise.update($scope.exercise).then(function(data){
                    if(data.success) {
                        $scope.sortByColumn($scope.sortValues.name, $scope.sortValues.direction);
                    }
                    else{alert(data.message);}
                });
            }

            $("#myModal").modal('hide');
        };

        $scope.setActiveRow = function(scope){
            $("#exerciseTable").find("tr").removeClass("info");
            $("#exercise_" + scope.exercise._id).addClass("info");
        };

        function getIndexOfExercise(exerciseId){
            var index = null;
            $.each($scope.exerciseList, function(i, v){
                if(v._id == exerciseId){
                    index = i;
                    return false;
                }else{
                    return true;
                }
            })

            return index;
        }
    }
]);