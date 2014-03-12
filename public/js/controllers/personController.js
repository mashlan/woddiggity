'use strict';

myControllers.controller('PersonalCtrl', ['$scope', '$rootScope', '$compile', 'Exercise', 'PersonalRecord',
    function($scope,$rootScope, $compile, Exercise, PersonalRecord) {
        $scope.exerciseList = null;
        $scope.valuePlaceholder= 'Value';
        $scope.personalRecords = [];
        $scope.unitsList= [
            { name: 'Kg' },
            { name: 'Lbs' },
            { name: 'Miles' },
            { name: 'Meters' },
            { name: 'Time' }
        ];
        $scope.exerciseHistory = null;
        $scope.help = {title: ''};
        $scope.savePrError = '';

        Exercise.query().then(function (data){
            $scope.exerciseList = data;
        });

        $scope.getPersonalRecords  = function(){
            PersonalRecord.query($rootScope.ActiveUser._id, "ExerciseName").then(function(data){
                $.each(data, function(i, v){
                    sortByHistoryRecordDate(false, data[i].History);
                })
                $scope.personalRecords = data;
            })
        };

        $scope.getNew = function(){
            $scope.getPersonalRecords();

            $scope.newPR = {
                RecordDate: null,
                Value: "",
                Units: "",
                UserId: $rootScope.ActiveUser._id,
                ExerciseId: '',
                ExerciseName: ''
            };
        };

        $scope.onUnitSelected = function(scope){
            scope.newPR.Units = scope.newPR.Unit.name;
        };

        $scope.getSelectedUnit = function(scope){
            scope.Unit = $scope.unitsList[2];
        };

        $scope.onExerciseSelect = function(scope){
            var exercise = scope.newPR.Exercise;
            $scope.newPR.ExerciseId = exercise._id;
            $scope.newPR.ExerciseName = exercise.Name;

            if(exercise.Type == 'Weight'){
                $scope.valuePlaceholder = "Weight";
            }
            if(exercise.Type == 'Distance'){
                $scope.valuePlaceholder = "Distance";
            }
        }

        $scope.savePR = function(){
            if($scope.newPrForm.$invalid){
                $scope.prInvalid = true;
            }
            else{
                PersonalRecord.insert($scope.newPR).then(function(data){
                    $scope.getNew();
                    $scope.prInvalid = false;
                    $scope.prInvalidDate = false;
                })
            }
        };

        $scope.showHistory = function(scope){
            $scope.exerciseHistory = scope.pr;

            var graph = $("#exerciseGraph");

            graph.highcharts({
                chart: {
                    width: 850
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: getExerciseDates($scope.exerciseHistory.History)
                },
                yAxis: {
                    title: '',
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                series: [
                    {
                        name: $scope.exerciseHistory.ExerciseName,
                        data: getExerciseData($scope.exerciseHistory.History)
                    }
                ],
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            });

            function getExerciseDates(history){
                var data = [];
                sortByHistoryRecordDate(true, history);
                $.each(history, function(i, v){
                    var date = new Date(v.RecordDate);
                    data.push((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                });
                return data;
            }

            function getExerciseData(history){
                var data = [];
                sortByHistoryRecordDate(true, history);
                $.each(history, function(i, v){
                    data.push(parseFloat(v.Value));
                });
                return data;
            }

            //set the array back to original sort
            sortByHistoryRecordDate(false, $scope.exerciseHistory.History);

            $("#myModal").modal("show");
        }

        $scope.editHistory = function(scope){
            $scope.exerciseHistory = scope.pr
            $("#exerciseGraph").html($('<edit-pr-records></edit-pr-records>'));
            $compile($("#exerciseGraph").contents())($scope);
            $("#myModal").modal("show");
        };

        $scope.showPrHelp = function(){
            $scope.help.title = "Personal Records Help";
            $("#helpForm").html($('<pr-help></pr-help>'));
            $compile($("#helpForm").contents())($scope);
            $("#helpModal").modal("show");
        }

        $scope.calculateOneRepMax = function(){
            var weight = parseFloat($("#weight_lifted").val());
            var reps = parseFloat($("#max_reps").val());
            var estimatedLift = weight * (1 + (reps /30));
            var roundedToFive = (Math.round(estimatedLift/5) * 5);
            $("#estimated_max").val(roundedToFive);
        }

        function sortByHistoryRecordDate(asc, historyArray){
            if(asc){
                historyArray.sort(function(a, b) {
                    return new Date(b.RecordDate) < new Date(a.RecordDate);
                });
            }else{
                historyArray.sort(function(a, b) {
                    return new Date(a.RecordDate) < new Date(b.RecordDate);
                });
            }
        }
    }
]);