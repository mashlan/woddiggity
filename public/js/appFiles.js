
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

myControllers.controller('AccountCtrl', ['$scope', '$rootScope', 'Authentication',
    function ($scope, $rootScope, Authentication) {
        'use strict';

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;

        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
        };

        $scope.cancelChangePassword = function(){
            $("#change_password_text").show();
            $("#change_password").hide();
        };

        $scope.updatePassword = function () {
            $scope.reset();
            Authentication.changePassword(buildPwdParms());
        };

        function buildPwdParms() {
            return {
                email: $rootScope.ActiveUser.Email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function (err) {
                    if (err) {
                        $scope.err = err;
                    }
                    else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            };
        }
    }
]);
myControllers.controller('ExerciseCtrl', ['$scope', 'Exercise', 'angularGridService','ExerciseType',
    function($scope, Exercise, angularGridService, ExerciseType) {
        'use strict';

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

        $scope.setSelectedExerciseType = function(scope){
            if(scope.exercise && scope.exercise.ExerciseType) {
                $("#Type").val(getExerciseTypeIndex(scope.exercise.ExerciseType._id));
            }
        };

        function getExerciseTypeIndex(id){
            var index = null;
            $.each($scope.typeList, function(i, v){
                if(v._id === id){
                    index = i;
                    return false;
                }else{
                    return true;
                }
            });

            return index;
        }

        $scope.editExercise = function(){
            var selectRow = $("#exerciseTable").find("tr.info");
            if(selectRow.length === 0){
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
                if(v._id === id){
                    $scope.exercise = v;
                }
            });
        }

        $scope.deleteExercise = function(){
            var selectRow = $("#exerciseTable").find("tr.info");
            if(selectRow.length === 0){
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
            var isNew = $scope.exercise._id === null;
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
                if(v._id === exerciseId){
                    index = i;
                    return false;
                }else{
                    return true;
                }
            });

            return index;
        }
    }
]);
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

myControllers.controller('HomeCtrl', ['$scope', function($scope) {
    'use strict';

}]);
myControllers.controller('LoginCtrl', ['$scope', 'Authentication', '$location',
    function ($scope, Authentication, $location) {
        'use strict';

        $scope.username = null;
        $scope.password = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.login = function (cb) {
            $scope.err = null;
            if (!$scope.username) {
                $scope.err = 'Please enter an email address';
            }
            else if (!$scope.password) {
                $scope.err = 'Please enter a password';
            }
            else {
                Authentication.login($scope).then(function (data) {
                    $scope.err = data.error ? data.error + '' : null;
                    if (data.user) {
                        $location.path('/account');
                    }
                });
            }
        };
    }
]);
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
myControllers.controller('UnitOfMeasureCtrl', ['$scope', 'UnitOfMeasure', 'angularGridService',
    function($scope, UnitOfMeasure, angularGridService) {
        'use strict';

        $scope.hasFormError = false;
        $scope.unitOfMeasureList = [];
        $scope.unitOfMeasure = {};

        $scope.getListRecords = function(defaultSort){
            angularGridService.sortByColumn(UnitOfMeasure, $scope, "unitOfMeasureList", "unitOfMeasure", defaultSort);
        };

        $scope.sortByColumn = function(sortName){
            angularGridService.sortByColumn(UnitOfMeasure, $scope, "unitOfMeasureList","unitOfMeasure", sortName);
        };

        $scope.saveUnitOfMeasure = function(){
            if($scope.measureForm.$invalid){
                $scope.hasFormError = true;
            }
            else{
                var isNew = $scope.unitOfMeasure._id === null;

                if(isNew){
                    UnitOfMeasure.insert($scope.unitOfMeasure).then(function(p, resp){
                        if(!p.message) {
                            $scope.sortByColumn("Name", "-");
                        }
                        else{alert(p.message);}
                    });
                }else{
                    UnitOfMeasure.update($scope.unitOfMeasure).then(function(data){
                        if(data.success) {
                            $scope.sortByColumn("Name", "-");
                        }
                        else{alert(data.message);}
                    });
                }

                $scope.hasFormError = false;
                $("#unit-of-measure-form").hide();
            }
        };

        $scope.newUnitOfMeasure = function(){
            $scope.unitOfMeasure = UnitOfMeasure.getNew();
            $("#unit-of-measure-form").show();
        };

        $scope.editRecord = function(scope){
            $scope.setActiveRow(scope);
            $scope.editUnitOfMeasure();
        };

        $scope.cancelUnitOfMeasure = function(){
            $("#unit-of-measure-form").hide();
        };

        $scope.getUnitOfMeasure = function(id){
            UnitOfMeasure.get(id).then(function(data){
                $scope.unitOfMeasure = data;
            });
        };

        $scope.editUnitOfMeasure = function(){
            var selectRow = $("#unitOfMeasureTable").find("tr.info");
            if(selectRow.length === 0){
                alert("please select a row to edit");
            }
            else{
                var id = selectRow.attr("id").split("_")[1];
                $scope.getUnitOfMeasure(id);
                $("#unit-of-measure-form").show();
            }
        };

        $scope.deleteUnitOfMeasure = function(){
            var selectRow = $("#unitOfMeasureTable").find("tr.info");
            if(selectRow.length === 0){
                alert("please select a row to delete");
            }
            else{
                var id = selectRow.attr("id").split("_")[1];
                UnitOfMeasure.remove(id).then(function(d){
                    if(d.success){
                        $scope.sortByColumn("Name", "-");
                    }else{
                        alert(d);
                    }
                });
            }
        };

        $scope.setActiveRow = function(scope){
            $("#unitOfMeasureTable").find("tr").removeClass("info");
            $("#unitOfMeasure_" + scope.unitOfMeasure._id).addClass("info");
        };
    }
]);
myControllers.controller('UserCtrl', ['$scope', '$rootScope', '$location', 'User',
    function($scope, $rootScope, $location, User) {
        'use strict';
        $scope.confirmPassword = '';

        $scope.user = {
            _id: null,
            FirstName: '',
            LastName: '',
            Email: '',
            password: '',
            IsCoach: false,
            IsAdmin: false
        };

        $scope.List = [];
        $scope.sortValues = {
            name: '',
            direction: '',
            text: ''
        };

        $scope.getListRecords = function(defaultSort){
            User.query(defaultSort);
        };

        $scope.createUser = function(){
            if($scope.user.FirstName === ""){
                $scope.err = "Please enter a First Name";
            }
            else if ($scope.user.LastName === ""){
                $scope.err = "Please enter a Last Name";
            }
            else if($scope.user.Email === ""){
                $scope.err = "Please enter an Email address";
            }
            else if($scope.user.password === ""){
                $scope.err = "Please enter a Password";
            }
            else if($scope.user.password !== $scope.confirmPassword){
                $scope.err = "Password does not match Confirm Password";
            }
            else{
                User.insert($scope.user).then(function(data){
                    if(data.errors){$scope.err = data.message;}
                    if(data.message){ $scope.err = data.message; }
                    else{
                        $location.path("/login");
                    }
                });
            }
        };
    }
]);
myControllers.controller('WendlerCtrl', ['$scope', 'WendlerWorkout', 'Exercise',
    function($scope, WendlerWorkout, Exercise) {
        'use strict';

        $scope.wendlerRecord = {
            Weeks: [],
            ProgramType: '',
            Name: '',
            Description: ''
        };

        $scope.existingWorkouts = [];
        $scope.exercises = [];
        $scope.workoutDays = [
            {name: 2},
            {name: 3},
            {name: 4}
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

        $scope.setWorkoutDay = function(scope){
            $.each($scope.wendlerRecord.Weeks, function(index, value){
                var days = [];
                for(var i = 1; i < scope.NumberOfDays.name + 1; i++){
                    var day = {Name: 'Day ' + i, DayNumber: i, Exercises: [{ExerciseId: '', Sets: startingSets() }]};
                    days.push(day);
                }
                $scope.wendlerRecord.Weeks[index].Days = days;
            });
        };

        function startingSets(){
            var sets = [];

            for(var i = 1; i < 4; i++){
                sets.push(getNewSet(i));
            }

            return sets;
        }

        function getNewSet(setNumber){
            return {NumberOf: setNumber, Reps: 5, PercentMax: 50, IsMaxEffort: false};
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
myControllers.controller('WodCtrl', ['$scope', 'Exercise',
    function($scope, Exercise) {
        'use strict';
    }
]);services.factory('Authentication', ['$resource', '$q', '$rootScope', function($resource, $q, $rootScope) {
    var resource = $resource('authentication/:method/:userId', {}, {
        get: {method: 'GET'},
        login: {method: 'POST'},
        changePassword: {method: 'PUT'},
        logout: {method: 'GET', params: {method: 'logout', userId: ""}}
    });

    var factory = {
        isLoggedIn: function(){
            var deferred = $q.defer();
            resource.get({},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        hasRole: function(userId, roleId){
            var deferred = $q.defer();
            resource.get({userId: userId},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        login: function(data){
            var deferred = $q.defer();
            resource.login({username: data.username, password: data.password},
                function(resp){
                    deferred.resolve(resp);
                    if(resp.user){
                        $rootScope.ActiveUser = resp.user;
                        $rootScope.isAuthenticated = true;
                    }
                },
                function(error){
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        },
        logout: function(){
            var deferred = $q.defer();
            resource.logout({method: 'logout'},
                function(resp){ deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        changePassword: function(){

        }
    };

    return factory;

}]);services.factory('Exercise', ['$resource', '$q', function($resource, $q){
    var resource = $resource('exercise/:exerciseId', {}, {
        query: {method:'GET', params:{exerciseId:'exercise', sortName: null}, isArray:true},
        get: {method: 'GET', params: {exerciseId: 0 }},
        remove: {method: 'DELETE'},
        insert: {method: 'POST'},
        update: {method: 'PUT'}
    });

    var factory = {
        query: function(sortByName, sortDir){
            var deferred = $q.defer();
            resource.query({exerciseId: 'exercise', sortName:sortByName, sortDirection: sortDir},
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        get: function (id) {
            var deferred = $q.defer();
            resource.get({exerciseId: id },
                function (resp) {
                    deferred.resolve(resp);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        },
        getNew: function(){
            return {
                _id: null,
                Name: "",
                Abbreviation: "",
                Description: "",
                ExerciseType: null
            };
        },
        remove: function (id) {
            var deferred = $q.defer();
            resource.remove({exerciseId: id },
                function (resp) {
                    deferred.resolve(resp);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        },
        insert: function(data){
            var deferred = $q.defer();
            resource.insert(data,
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        },
        update: function(data){
            var deferred = $q.defer();
            resource.update(data,
                function(resp){deferred.resolve(resp);},
                function(error){deferred.reject(error);}
            );

            return deferred.promise;
        }
    };

    return factory;
}]);
services.factory("ExerciseType", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('exerciseType/:exTypeId/:id/', {}, {
            query: {method: 'GET', params: {exTypeId: 'all', id: null, sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({exTypeId: 'all', sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            getNew: function(){
                return {
                    _id: null,
                    Name: "",
                    Description: "",
                    UnitOfMeasures: []
                };
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);
services.factory("PersonalRecord", ['$resource', '$q', '$rootScope',
    function($resource, $q, $rootScope){
        var resource = $resource('pr/:prId/:id/', {}, {
            query: {method: 'GET', params: {prId: 'records', id: 0, sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(userId, sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({prId: 'records', id: userId, sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            getNew: function(){
                return {
                    RecordDate: null,
                    Value: "",
                    Units: "",
                    UserId: $rootScope.ActiveUser._id,
                    ExerciseId: ''
                };
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);
services.factory("UnitOfMeasure", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('unitOfMeasure/:unitId/:id/', {}, {
            query: {method: 'GET', params: {unitId: 'all', id: null, sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({unitId: 'all', sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            getNew: function(){
                return{
                    _id: null,
                    Name: "",
                    Description: ""
                };
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);
services.factory("User", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('user/:userId', {}, {
            query: {method: 'GET', params: {userId: 'users', sortName: null}, isArray:true},
            get: {method: 'GET', params: {userId: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var prefResource = $resource('userPreferences', {}, {
            updatePref: {method: 'PUT'}
        });

        var factory = {
            query: function(sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({userId: 'users', sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({userId: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            updatePreferences: function(preferences){
                var deferred = $q.defer();

                prefResource.updatePref(preferences,
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({userId: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);
services.factory("WeightWorkout", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('workout/weight/:wwId/:id/', {}, {
            query: {method: 'GET', params: {wwId: 'all', id: 0, sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(userId, sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({wwId: 'all', id: userId, sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);
services.factory("WendlerWorkout", ['$resource', '$q',
    function($resource, $q){
        var resource = $resource('wendler/:wId/:id/', {}, {
            query: {method: 'GET', params: {wId: 'all', sortName: null}, isArray:true},
            get: {method: 'GET', params: {id: 0 }},
            remove: {method: 'DELETE'},
            insert: {method: 'POST'},
            update: {method: 'PUT'}
        });

        var factory = {
            query: function(sortByName, sortDir){
                var deferred = $q.defer();
                resource.query({wId: 'all', sortName:sortByName, sortDirection: sortDir},
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            remove: function (id) {
                var deferred = $q.defer();
                resource.remove({id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            insert: function(data){
                var deferred = $q.defer();
                resource.insert(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            },
            update: function(data){
                var deferred = $q.defer();
                resource.update(data,
                    function(resp){deferred.resolve(resp);},
                    function(error){deferred.reject(error);}
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);