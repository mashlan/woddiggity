
myControllers.controller('PersonalCtrl', ['$scope', '$rootScope', '$compile', 'Exercise', 'PersonalRecord', 'User', 'ExerciseType',
    function($scope,$rootScope, $compile, Exercise, PersonalRecord, User, ExerciseType) {
        'use strict';

        $scope.exerciseList = null;
        $scope.valuePlaceholder= 'Value';
        $scope.personalRecords = [];
        $scope.unitsList = [];
        $scope.exerciseTypeList = [];

        ExerciseType.query("Name").then(function(data){
            var index = 0;
            $.each(data, function(i, v){
                if(v.IsUserPreference){
                    $scope.exerciseTypeList.push(v);
                    $scope.getSelectedPreference(index);
                    index++;
                }
            });
        });

        $scope.exerciseHistory = null;
        $scope.help = {title: ''};
        $scope.savePrError = '';
        $scope.changePasswordError = "";

        Exercise.query().then(function (data){
            $scope.exerciseList = data;
        });

        $scope.getPersonalRecords  = function(){
            PersonalRecord.query($rootScope.ActiveUser._id, "ExerciseName").then(function(data){
                $.each(data, function(i, v){
                    sortByHistoryRecordDate(false, data[i].History);

                    //set local time stamp
                    $.each(data[i].History, function(hi, hv){
                        hv.LocalFormat = (new Date(hv.RecordDate)).toLocaleDateString();
                    });

                    var exercise = $.grep($scope.exerciseList, function(e){return e._id === data[i].ExerciseId});
                    if(exercise.length > 0){
                        data[i].ExerciseName = exercise[0].Name;
                    }
                });
                $scope.personalRecords = data;
            });
        };

        $scope.getNew = function(){
            $scope.getPersonalRecords();
            $scope.newPR = PersonalRecord.getNew();
        };

        $scope.onUnitSelected = function(scope){
            $scope.newPR.Units = scope.newPR.Unit.name;
        };

        $scope.onExerciseSelect = function(scope){
            var exercise = scope.newPR.Exercise;
            $scope.newPR.ExerciseId = exercise._id;
            $scope.newPR.ExerciseName = exercise.Name;
            $scope.valuePlaceholder = exercise.ExerciseType.Name;
            $scope.unitsList = exercise.ExerciseType.UnitOfMeasures;

            //default unit list to user preference;
            var unitPref = $.grep($rootScope.ActiveUser.Preferences, function(e){ return e.ExerciseTypeId === exercise.ExerciseType._id});
            if(unitPref.length > 0){
                $scope.newPR.Unit = $.grep($scope.unitsList, function(e){return e._id === unitPref[0].UnitOfMeasureId})[0];
            }else{
                $scope.newPR.Unit = $scope.unitsList[0];
            }

            $scope.newPR.Units = $scope.newPR.Unit.Name;
        };

        $scope.savePR = function(){
            if($scope.newPrForm.$invalid){
                $scope.prInvalid = true;
            }
            else{
                PersonalRecord.insert($scope.newPR).then(function(data){
                    $scope.getNew();
                    $scope.prInvalid = false;
                    $scope.prInvalidDate = false;
                });
            }
        };

        $scope.showAllPrs = function(scope){
            $(".pr-history").hide();
            $(".pr-summary").show();
            $("#records_" + scope.pr._id).toggle();
            $("#history_" + scope.pr._id).hide();
        };

        $scope.hidePrHistoryRecords = function(){
            $(".pr-history").hide();
            $(".pr-summary").show();
        };

        $scope.hidePrChart = function(){
            $(".pr-chart").hide();
            $(".pr-summary").show();
        };

        $scope.showHistory = function(scope){
            $scope.exerciseHistory = scope.pr;

            var graph = $("#exerciseGraph_" + scope.pr._id);
            $(".pr-history").hide();
            $(".pr-summary").show();
            $(".pr-chart").hide();
            $("#chart_" + scope.pr._id).show();
            $("#history_" + scope.pr._id).hide();

            var width = graph.width();

            var getExerciseDates = function (history){
                var data = [];
                sortByHistoryRecordDate(true, history);
                $.each(history, function(i, v){
                    var date = new Date(v.RecordDate);
                    data.push((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                });
                return data;
            };

            var getExerciseData = function (history){
                var data = [];
                sortByHistoryRecordDate(true, history);
                $.each(history, function(i, v){
                    data.push(parseFloat(v.Value));
                });
                return data;
            };

            graph.highcharts({
                chart: {
                    width: width
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

            //set the array back to original sort
            sortByHistoryRecordDate(false, $scope.exerciseHistory.History);

        };

        $scope.setActiveRow = function(scope){
            $(".diggity-table").find("tr").removeClass("info");
            $("#history_" + scope.pr._id).addClass("info");
        };

        $scope.editHistory = function(scope){
            $scope.exerciseHistory = scope.pr;
            $("#exerciseGraph").html($('<edit-pr-records></edit-pr-records>'));
            $compile($("#exerciseGraph").contents())($scope);
            $("#myModal").modal("show");
        };

        $scope.showPrHelp = function(){
            $scope.help.title = "Personal Records Help";
            $("#helpForm").html($('<pr-help></pr-help>'));
            $compile($("#helpForm").contents())($scope);
            $("#helpModal").modal("show");
        };

        $scope.calculateOneRepMax = function(){
            var weight = parseFloat($("#weight_lifted").val());
            var reps = parseFloat($("#max_reps").val());
            var estimatedLift = weight * (1 + (reps /30));
            var roundedToFive = (Math.round(estimatedLift/5) * 5);
            $("#estimated_max").val(roundedToFive);
        };

        $scope.closeOneRepMaxForm = function(){
            $("#oneRepMaxEstimation_form").hide();
            $("#oneRepMaxEstimation_text").show();
        };

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

        //editing personal information
        $scope.editAccountInfo = function(){
            resetEditForms();
            $scope.user = { };
            $.extend($scope.user, $rootScope.ActiveUser);
            $("#account_info").toggle();
            $("#account_info_text").toggle();
        };

        $scope.saveAccountInfo = function(){
            User.update($scope.user).then(function(data){
                if(data.error){
                    $scope.accountInfoError = data.error;
                }else{
                    $rootScope.ActiveUser = $scope.user;
                    $("#account_info_text").show();
                    $("#account_info").hide();
                }
            });
        };

        $scope.cancelAccountInfo = function(){
            $("#account_info_text").show();
            $("#account_info").hide();
            console.log("cancel edit account info");
        };

        $scope.showChangePassword = function(){
            resetEditForms();
            $scope.changePasswordError = "";
            $scope.changePassword = { };
            $.extend($scope.user, $rootScope.ActiveUser);
            $("#change_password_text").toggle();
            $("#change_password").toggle();
        };

        $scope.showEstimationFormForm = function(){
            resetEditForms();
            $("#oneRepMaxEstimation_text").toggle();
            $("#oneRepMaxEstimation_form").toggle();
        };

        $scope.showPreferencesForm = function(){
            resetEditForms();
            $("#preferences_form_text").toggle();
            $("#preferences_form").toggle();
        };

        $scope.setPreference = function(scope){
            var user = $rootScope.ActiveUser;
            var prefer = $.grep(user.Preferences, function(e){ return e.ExerciseTypeId === scope.exType._id; });
            if(prefer.length > 0){
                prefer[0].UnitOfMeasureId = scope.exType.unitPreference._id;
            }else{
                user.Preferences.push({
                    UnitOfMeasureId: scope.exType.unitPreference._id,
                    ExerciseTypeId: scope.exType._id
                });
            }
        };

        $scope.getSelectedPreference = function(index){
            var preferences = $rootScope.ActiveUser.Preferences;
            var scope = $scope.exerciseTypeList[index];
            if(preferences){
                if(scope && scope._id){
                    var pref = $.grep(preferences, function(e) {return e.ExerciseTypeId === scope._id});
                    if(pref.length > 0){
                        var selectedPref = getUnitOfMeasure(scope, pref[0].UnitOfMeasureId);
                        scope.unitPreference = selectedPref;
                    }
                }
            }
        };

        function getUnitOfMeasure(scope, id){
            var unit = null;
            $.each(scope.UnitOfMeasures, function(i, v){
                if(v._id === id){
                    unit = v;
                    return false;
                }else{
                    return true;
                }
            });

            return unit;
        }

        $scope.savePreferences = function(){
            var pref = {
                _id: $rootScope.ActiveUser._id,
                preferences: $scope.ActiveUser.Preferences
            };
            User.updatePreferences(pref);
        };

        $scope.cancelPreferences = function(){
            $("#preferences_form").hide();
            $("#preferences_form_text").show();
        };

        $scope.showBoxInfo = function(){
            resetEditForms();
            $("#box_info_text").toggle();
            $("#box_info").toggle();
        };

        function resetEditForms(){
            $("#account_info_text").show();
            $("#account_info").hide();
            $("#change_password_text").show();
            $("#change_password").hide();
            $("#preferences_form_text").show();
            $("#preferences_form").hide();
            $("#box_info_text").show();
            $("#box_info").hide();
            $("#oneRepMaxEstimation_text").show();
            $("#oneRepMaxEstimation_form").hide();
        }
    }
]);