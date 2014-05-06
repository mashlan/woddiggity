
myControllers.controller('WendlerCtrl', ['$scope', 'WendlerWorkout', 'Exercise',
    function($scope, WendlerWorkout, Exercise) {
        'use strict';
        $scope.startDate = null;

        $scope.wendlerRecord = {
            Weeks: [],
            ProgramType: '',
            Name: '',
            Description: '',
            Option: 0
        };

        $scope.existingWorkouts = [];
        $scope.exercises = [];
        $scope.workoutDays = [
            {name: 2},
            {name: 3},
            {name: 4}
        ];

        $scope.options = [
            {name: 'Standard', id: 0},
            {name: 'Heavier', id: 1}
        ];

        $scope.programTypes = [
            {name: 'Four Weeks', number: 4},
            {name: 'Six Weeks', number: 6}
        ];

        Exercise.query().then(function(data){
            $scope.exercises = data;
        });

        WendlerWorkout.query().then(function(data){
            $scope.existingWorkouts = data;
        });

        $scope.sortByColumn = function(columnName){
            WendlerWorkout.query(columnName).then(function(data){
                $scope.existingWorkouts = data;
            });
        };

        $scope.setProgramType = function(scope){
            $scope.wendlerRecord.ProgramType = scope.ProgramType.name;

            var weeks = [];
            for(var i = 1; i < scope.ProgramType.number + 1; i++){
                weeks.push({Name: 'Week ' + i, Number: i, Days: null});
            }

            $scope.wendlerRecord.Weeks = weeks;
            $("#days").removeAttr('disabled');
        };

        $scope.setPercentOption = function(scope){
          $scope.wendlerRecord.Option = scope.Option.id;
        };

        $scope.setWorkoutDay = function(scope){
            $.each($scope.wendlerRecord.Weeks, function(index, value){
                var days = [];
                for(var i = 1; i < scope.NumberOfDays.name + 1; i++){
                    var day = {Name: 'Day ' + i, DayNumber: i, Exercises: [{ExerciseId: '', Sets: startingSets(index) }]};
                    days.push(day);
                }
                $scope.wendlerRecord.Weeks[index].Days = days;
            });
        };

        function startingSets(weekNumber){
            var sets = [];
            var option = $scope.wendlerRecord.Option;

            //add six sets
            for(var i = 1; i < 7; i++){
                sets.push(getNewSet(i, weekNumber, option));
            }

            return sets;
        }

        function getNewSet(setNumber, weekNumber, option){
            var percent = getPercent(weekNumber, setNumber, option);
            var repititions = getReps(weekNumber, setNumber);
            return {NumberOf: setNumber, Reps: repititions, PercentMax: percent, IsMaxEffort: (setNumber == 6)};
        }

        function getReps(weekNumber, setNumber){
            //warm up sets
            if(setNumber == 1) return 5;
            if(setNumber == 2) return 5;
            if(setNumber == 3) return 3;

            switch(weekNumber){
                case 0:
                    if(setNumber == 4) return 5;
                    if(setNumber == 5) return 5;
                    if(setNumber == 6) return 5;
                case 1:
                    if(setNumber == 4) return 3;
                    if(setNumber == 5) return 3;
                    if(setNumber == 6) return 3;
                case 2:
                    if(setNumber == 4) return 5;
                    if(setNumber == 5) return 3;
                    if(setNumber == 6) return 1;
                case 3:
                case 4:
                case 5:
                    return 5;
            }
        };

        function getPercent(weekNumber, setNumber, option){
            //warm up sets
            if(setNumber == 1) return 40;
            if(setNumber == 2) return 50;
            if(setNumber == 3) return 60;

            switch(weekNumber){
                case 0:
                    if(setNumber == 4) return option == 0 ? 65: 75;
                    if(setNumber == 5) return option == 0 ? 75: 80;
                    if(setNumber == 6) return 85;
                case 1:
                    if(setNumber == 4) return option == 0 ? 70: 80;
                    if(setNumber == 5) return option == 0 ? 80: 85;
                    if(setNumber == 6) return 90;
                case 2:
                    if(setNumber == 4) return 75;
                    if(setNumber == 5) return 85;
                    if(setNumber == 6) return 95;
                case 3:
                    if(setNumber == 4) return 40;
                    if(setNumber == 5) return 50;
                    if(setNumber == 6) return 60;
                case 4:
                case 5:
                    return 0;
            }
        }

        $scope.setMaxError = function(scope){
            scope.set.IsMaxEffort = !scope.set.IsMaxEffort;
        };

        $scope.moveExerciseUp = function(scope, index){
            moveObjectInArray(scope.$parent.day.Exercises, index, true);
        };

        $scope.moveExerciseDown = function(scope, index){
            moveObjectInArray(scope.$parent.day.Exercises, index, false);
        };

        $scope.addExercise = function(scope){
            scope.$parent.day.Exercises.push({ExerciseId: '', Sets: startingSets() });
        };

        $scope.removeExercise = function(scope, index){
            if(scope.day.Exercises.length > 1){
                scope.$parent.day.Exercises.splice(index,1);
            }
        };

        $scope.moveSetUp = function(scope, index){
            moveObjectInArray(scope.$parent.exercise.Sets, index, true);
            reNumberSets(scope);
        };

        $scope.moveSetDown = function(scope, index){
            moveObjectInArray(scope.$parent.exercise.Sets, index, false);
            reNumberSets(scope);
        };

        function reNumberSets(scope){
            $.each(scope.$parent.exercise.Sets, function(i, v){
                scope.$parent.exercise.Sets[i].NumberOf= i+ 1;
            });
        }

        //Moves the object at the given index up or down in the array position
        function moveObjectInArray(array, index, moveUp){
            var data = {};
            $.extend(data, array[index]);

            if(moveUp){
                if(index > 0){
                    array.splice(index, 1);
                    array.splice(index - 1, 0, data);
                }
            }else{
                if(index < array.length - 1){
                    array.splice(index, 1);
                    array.splice(index + 1, 0, data);
                }
            }
        }

        $scope.addSet = function(scope){
            var setNumber = scope.$parent.exercise.Sets.length + 1;
            scope.$parent.exercise.Sets.push(getNewSet(setNumber));
        };

        $scope.removeSet = function(scope, index){
            if(scope.$parent.exercise.Sets.length > 1){
                scope.$parent.exercise.Sets.splice(index, 1);
                reNumberSets(scope);
            }
        };

        $scope.onExerciseSelect = function(scope){
            var ex = scope.exercise.SelectedExercise;
            scope.exercise.ExerciseId = ex._id;
        };

        $scope.setActiveRow = function(scope){

        };

        $scope.newWendler = function(){

        };

        $scope.editWendler = function(){

        };

        $scope.deleteWendler = function(){

        };
    }
]);