
var angularGrid = angular.module('diggity.angularGrid', []);

angularGrid.directive("angularGrid", ['$compile', function($compile){
    return {
        restrict: 'E',
        link: function(scope, elm, attrs) {
            var id = elm.attr('id');
            var tableHeader = $("<table class='table table-condensed table-hover editTable' style='margin-bottom: 0;'><thead><tr></tr></thead></table>");
            var tableContainer = $("<div class='table-container'></div>");
            var tableBody = $("<table class='table table-condensed table-hover editTable' style='margin-bottom: 0'><tbody></tbody></table>");
            var tableFooter = $("<table class='table table-condensed table-footer' style='margin-top: 0;'></table>");

            $(tableHeader).attr('id', 'agHead_' + id);
            $(tableBody).attr('id', 'agTable_' + id);
            $(tableFooter).attr('id', 'agPager_' + id);

            elm.attr("ng-controller", "angularGridCtrl");
            elm.append(tableHeader);
            tableContainer.append(tableBody);
            elm.append(tableContainer);
            elm.append(tableFooter);

           // elm[0].outerHTML = elm.html();
            $compile(elm.contents())(scope);
        }
    };
}]);

angularGrid.directive("angularColumn", ['$compile', function($compile){

    return{
        restrict: 'E',
        link: function(scope, elm, attrs){
            var table = $("#agTable_" + attrs.for).find('tbody').first();
            var headerTable = $("#agHead_" + attrs.for).find('tr').first();
            var row = $("<tr></tr>")

            $.each(elm.children(), function(i, v){
                if(headerTable.children().length < elm.children().length){
                    var text = $(v).attr("name");
                    var head = $("<th ng-click='sortByColumn(" + text + ")'></th>");
                    head.text(text);
                    if($(v).attr('width')){head.css("width", $(v).attr('width'))}
                    if($(v).attr('display')){head.css('display', $(v).attr('display'))}

                    headerTable.append(head);
                }
                var data = $(v).attr('text');
                var text = data.split(".")[1];
                var record = data.split(".")[0];
                var rowData = $("<td></td>");
                rowData.text(scope[record][text]);
                if($(v).attr('width')){rowData.css("width", $(v).attr('width'))}
                if($(v).attr('display')){rowData.css('display', $(v).attr('display'))}

                row.append(rowData);
            });

            table.append(row);
            $compile(table.contents())(scope);
        }
    }
}]);

angularGrid.factory("angularGridService", ['$resource','$compile',
    function($resource, $compile) {
        var sortValues = {
            name: '',
            direction: '',
            text: ''
        };

        var factory = {
            init: function(scope, id, data) {
                var divContainer = $("#" + id);
                var tableId = 'agTable_' + id;
                var headerId = 'agHead_' + id;

                //add header to header table
                var header = $("<thead></thead>");
                var headerRow = $("<tr></tr>");
                var mainTable = $("#" + tableId);

                //add row to body
                $.each(data.headers, function(index, value){
                    var columnHead = $("<th name='" + value.Name + "' >" + value.Name + "</th>");
                    columnHead.attr('ng-click', "sortByColumn('" + value.Name + "')");
                    if(value.Width){columnHead.css('width', value.Width + 'px');}
                    if(value.Display){columnHead.css('display', value.Display);}
                    headerRow.append(columnHead);
                });


                $.each(data.rows, function(rowIndex, rowValue){
                    var rowId = rowValue._id;
                    var tableRow = $("<tr id='" + tableId + "_" + rowId + "'></tr>");
                    tableRow.attr('ng-click', "setActiveRow(this)");
                    tableRow.attr('ng-dblclick', "editRecord(this)");

                    $.each(data.headers, function(i, v){
                        if(rowValue[v.Name]){
                            var tableData = $("<td>" + rowValue[v.Name] +"</td>");
                            if(v.Width){tableData.css('width', v.Width + 'px');}
                            if(v.Display){tableData.css('display', v.Display);}
                            tableRow.append(tableData);
                        }
                    });

                    mainTable.find('tbody').append(tableRow);
                });

                header.append(headerRow);
                $("#" + headerId).append(header);

                divContainer.append($("#" + headerId));
                divContainer.append(mainTable);

                divContainer[0].outerHTML = divContainer.html()
                $compile(divContainer.contents())(scope);
            },
            setActiveRow: function(){
                alert('row clicked');
            },
            sortByColumn: function(service, scope, list, tableId, columnName){
                var icon = '';
                var appendUp = "<span class=''>&nbsp;&nbsp;<i class='glyphicon glyphicon-chevron-up'></i></span>";
                var appendDown = "<span class=''>&nbsp;&nbsp;<i class='glyphicon glyphicon-chevron-down'></i></span>";
                var header = $("#" + tableId + "_th_" + columnName);

                if(sortValues.name == columnName){
                    if(sortValues.direction == ''){
                        sortValues.direction = '-';
                        icon = appendDown;
                    }else{
                        sortValues.direction = '';
                        icon = appendUp;
                    }
                }else{
                    $("#" + tableId + "_th_" + sortValues.name).text( sortValues.text);
                    sortValues.name = columnName;
                    sortValues.direction = '';
                    sortValues.text = $("#" + tableId + "_th_" + columnName).text();
                    icon = appendUp;
                }

                header.html(sortValues.text + icon);
                service.query(columnName, sortValues.direction).then(function (data){
                    scope[list]  = data;
                });
            }
        };

        return factory;
    }
]);
