
myControllers.controller('WeightLiftingCtrl', ['$scope', 'WeightWorkout', 'Exercise', 'PersonalRecord', 'ExerciseType',
    function($scope, WeightWorkout, Exercise, PersonalRecord, ExerciseType) {
        'use strict';

        $scope.exerciseList = [];
        $scope.valuePlaceholder= 'Value';
        $scope.personalRecords = [];
        $scope.unitsList = [];
        $scope.exerciseTypeList = [];

        $scope.Workout = {
            Weeks: [
                {Name: 'Week ' + 1, Number: 1, Days: [
                        {Name: 'Day ' + 1, DayNumber: 1, Exercises: [
                                {ExerciseId: 1, Sets:[
                                        {NumberOf: 1, Reps: 5, Value: 150, IsMaxEffort: false},
                                        {NumberOf: 2, Reps: 3, Value: 160, IsMaxEffort: false},
                                        {NumberOf: 3, Reps: 1, Value: 170, IsMaxEffort: true}
                                    ]
                                }
                            ]
                        },
                        {Name: 'Day ' + 2, DayNumber: 2, Exercises: [
                                    {ExerciseId: 1, Sets:[
                                        {NumberOf: 1, Reps: 5, Value: 250, IsMaxEffort: false},
                                        {NumberOf: 2, Reps: 3, Value: 260, IsMaxEffort: false},
                                        {NumberOf: 3, Reps: 1, Value: 270, IsMaxEffort: true}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {Name: 'Week ' + 2, Number: 2, Days: [
                        {Name: 'Day ' + 1, DayNumber: 1, Exercises: [
                                {ExerciseId: 1, Sets:[
                                        {NumberOf: 1, Reps: 5, Value: 100, IsMaxEffort: false},
                                        {NumberOf: 2, Reps: 3, Value: 110, IsMaxEffort: false},
                                        {NumberOf: 3, Reps: 1, Value: 120, IsMaxEffort: true}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            Name: "Test",
            Description: "This is a Test"
        };

        Exercise.query().then(function (data){
            $scope.exerciseList = data;
        });
    }
]);
