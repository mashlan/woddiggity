
myControllers.controller('WeightLiftingCtrl', ['$scope', 'WeightWorkout', 'Exercise', 'PersonalRecord', 'ExerciseType',
    function($scope, WeightWorkout, Exercise, PersonalRecord, ExerciseType) {
        'use strict';

        $scope.exerciseList = [];
        $scope.valuePlaceholder= 'Value';
        $scope.personalRecords = [];
        $scope.unitsList = [];
        $scope.exerciseTypeList = [];

        Exercise.query().then(function (data){
            $scope.exerciseList = data;
        });
    }
]);
