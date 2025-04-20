"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var LoadingAnimation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var filterType = [
        { text: 'Shimmer', value: 'Shimmer' },
        { text: 'Spinner', value: 'Spinner' }
    ];
    var onChange = function (sel) {
        var type = sel.value.toString();
        if (type === "Shimmer") {
            ganttInstance.current.loadingIndicator.indicatorType = "Shimmer";
            ganttInstance.current.enableVirtualMaskRow = true;
            ganttInstance.current.refresh();
        }
        else {
            ganttInstance.current.loadingIndicator.indicatorType = "Spinner";
            ganttInstance.current.enableVirtualMaskRow = false;
            ganttInstance.current.refresh();
        }
    };
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'parentID'
    };
    var splitterSettings = {
        columnIndex: 2
    };
    var loadingIndicator = {
        indicatorType: 'Shimmer'
    };
    var labelSettings = {
        taskLabel: 'Progress'
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-md-9' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Filtering', ref: ganttInstance, dataSource: data_1.virtualData, treeColumnIndex: 1, labelSettings: labelSettings, allowSelection: true, allowFiltering: true, allowSorting: true, highlightWeekends: true, enableVirtualization: true, taskFields: taskFields, splitterSettings: splitterSettings, height: '450px', loadingIndicator: loadingIndicator },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Filter, ej2_react_gantt_1.Selection, ej2_react_gantt_1.VirtualScroll, ej2_react_gantt_1.Sort] }))),
        React.createElement("div", { className: 'col-md-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%', paddingLeft: 0 } },
                                React.createElement("div", { style: { paddingTop: '10px', paddingLeft: 0 } }, " Indicator Type ")),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "113px", id: "seltype", change: onChange.bind(_this), dataSource: filterType, value: "Shimmer" })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the loading indicator while initial rendering, refreshing and all gantt action. In this sample, you can change the loading indicators from the properties panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Gantt has an option to show a loading indicator in-between the time of fetching the data and binding it to the gantt during initial rendering, refreshing or while performing action like sorting, filtering and more."),
            React.createElement("p", null, "The Gantt support the following loading indicator types"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Shimmer")),
                React.createElement("li", null,
                    React.createElement("code", null, "Spinner"))),
            React.createElement("p", null,
                "Use the loading indicator by setting the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/loadingIndicatorModel/#indicatortype" }, "loadingIndicator.indicatorType"),
                " property as Spinner or Shimmer. The default value of the indicatorType is Spinner."),
            React.createElement("p", null,
                "By default ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualmaskrow" }, "enableVirtualMaskRow"),
                " is set to true which renders Shimmer during virtual scrolling."))));
};
exports.default = LoadingAnimation;
