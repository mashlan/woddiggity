'use strict';

myControllers.controller('ExerciseTypeCtrl', ['$scope', 'ExerciseType',
    function($scope, ExerciseType) {
        $scope.exercisTypeList = [];
        $scope.sortValues = {
            name: '',
            direction: '',
            text: ''
        };
        $scope.exerciseType = {
            _id: '',
            Name: ''
        };

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

            ExerciseType.query(columnName, $scope.sortValues.direction).then(function (data){
                $scope.exerciseList = data;
            });
        };

        $scope.sortByColumn = function(){

        };

        $scope.saveExerciseType = function(){

        };

        $scope.newExerciseType = function(){
            $scope.exerciseType = {
                _id: '',
                Name: ''
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