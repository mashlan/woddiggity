'use strict';

myControllers.controller('ExerciseCtrl', ['$scope', 'Exercise', 'angularGridService','ExerciseType',
    function($scope, Exercise, angularGridService, ExerciseType) {
        $scope.exercise = {};
        $scope.exerciseList = [];
        $scope.hasFormError = false;
        $scope.typeList = [];

        ExerciseType.query().then(function(data){
            $scope.typeList = data;
        });

        $scope.getListRecords = function(defaultSort){
            angularGridService.sortByColumn(Exercise, $scope, "exerciseList", "exercise", defaultSort);
        };

        $scope.sortByColumn = function(sortName){
            angularGridService.sortByColumn(Exercise, $scope, "exerciseList","exercise", sortName);
            $("#exercise_form").hide();
        };

        $scope.setExerciseTypeIdsString = function(scope){
            scope.exercise.ExerciseTypeIdsString = getExerciseTypeName(scope.exercise.ExerciseTypeId);
        };

        function getExerciseTypeName(id){
            var name = "";

            $.each($scope.typeList, function(i, v){
                if(v._id == id){
                    name = v.Name;
                    return false;
                }else{
                    return true;
                }
            });

            return name;
        }

        $scope.getExercise = function(id){
            Exercise.get(id).then(function(data){
                $scope.exercise = data;
            });
        };

        $scope.newExercise = function(){
            $scope.exercise = Exercise.getNew();
            $("#exercise_form").show();
        };

        $scope.editRecord = function(scope){
            $scope.setActiveRow(scope);
            $scope.editExercise();
        };

        $scope.editExercise = function(){
            var selectRow = $("#exerciseTable").find("tr.info");
            if(selectRow.length == 0){
                alert("please select a row to edit");
            }
            else{
                var id = selectRow.attr("id").split("_")[1];
                $scope.getExercise(id);
                $("#exercise_form").show();
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
            var selectRow = $("#exerciseTable").find("tr.info");
            if(selectRow.length == 0){
                alert("please select a row to edit");
            }
            else{
                var id = selectRow.attr("id").split("_")[1];
                Exercise.remove(id).then(function(d){
                    if(d.success){
                        $scope.sortByColumn("Name", "-");
                    }else{
                        alert(d);
                    }
                });
            }
        };

        $scope.saveExercise = function(){
            var isNew = $scope.exercise._id == null;
            if($scope.exerciseForm.$invalid){
                $scope.hasFormError = true;
            }
            else {
                if (isNew) {
                    Exercise.insert($scope.exercise).then(function (p, resp) {
                        if (!p.message) {
                            $scope.sortByColumn("Name", "-");
                        }
                        else {
                            alert(p.message);
                        }
                    });
                } else {
                    Exercise.update($scope.exercise).then(function (data) {
                        if (data.success) {
                            $scope.sortByColumn("Name", "-");
                        }
                        else {
                            alert(data.message);
                        }
                    });
                }

                $("#exercise_form").hide();
                $scope.hasFormError = false;
            }
        };

        $scope.cancelExercise = function(){
          $("#exercise_form").hide();
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