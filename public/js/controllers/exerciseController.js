'use strict';

myControllers.controller('ExerciseCtrl', ['$scope', 'Exercise',
    function($scope, Exercise) {
        $scope.exercise = {
            _id: null,
            Name: "",
            Description: ""
        }

        $scope.sortValues = {
            name: '',
            direction: '',
            text: ''
        };

        $scope.exerciseList = [];

        $scope.getListRecords = function(defaultSort){
            $scope.sortByColumn(defaultSort);
        };

        $scope.sortByColumn = function(columnName, sortOrder){
            var icon = '';
            var appendUp = "<span class='float-right'><i class='glyphicon glyphicon-chevron-up'></i></span>";
            var appendDown = "<span class='float-right'><i class='glyphicon glyphicon-chevron-down'></i></span>";
            var header = $("#th_" + columnName);

            if($scope.sortValues.name == columnName){
                if(sortOrder || sortOrder == ''){
                    if(sortOrder == ''){icon= appendUp;}
                    else{icon = appendDown;}
                }else{
                    if($scope.sortValues.direction == ''){
                        $scope.sortValues.direction = '-';
                        icon = appendDown;
                    }else{
                        $scope.sortValues.direction = '';
                        icon = appendUp;
                    }
                }
            }else{
                $("#th_" + $scope.sortValues.name).text( $scope.sortValues.text);
                $scope.sortValues.name = columnName;
                $scope.sortValues.direction = '';
                $scope.sortValues.text = $("#th_" + columnName).text();
                icon = appendUp;
            }

            header.html($scope.sortValues.text + icon);

            Exercise.query(columnName, $scope.sortValues.direction).then(function (data){
                $scope.exerciseList = data;
            });
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
                $scope.getExercise(selectRow.attr("id"))
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
            // var ex = new Exercise($scope.exercise);
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
            $("#exerciseTable").find("tr").removeClass("success");
            $("#" + scope.exercise._id).addClass("success");
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