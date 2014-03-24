
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