"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transX = void 0;
/**
 * Sample for Range Navigator Customization
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.transX = 'translateX(10%)';
var divStyle = {
    transform: exports.transX
};
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px;\n     }\n     #days {\n         font-size: 15px;\n         font-style: normal;\n         font-family: \"Segoe UI\";\n         font-weight: 500;\n         text-anchor: middle;\n         transform: none;\n         opacity: 1;\n     }\n     ";
function Customization() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var grid1;
    var rangenavigator1;
    var gridRender;
    var gridData = data_source_1.employeeData.filter(function (data) {
        return (data.HireDate >= new Date(1992, 5, 1) && data.HireDate <= new Date(1993, 4, 1));
    });
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row", style: { textAlign: "center" } },
                React.createElement("div", { id: "days" }, "Filter From Hire Date")),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, height: '75', valueType: 'DateTime', intervalType: 'Quarter', load: load.bind(this), changed: changed.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', enableGrouping: true, allowSnapping: true, groupBy: 'Years', enableDeferredUpdate: true, value: [new Date('1992-06-01'), new Date('1993-05-01')], dataSource: data_source_1.employeeData, xName: 'HireDate', yName: 'yValue' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime] }))),
            React.createElement("div", { className: "row", style: divStyle },
                React.createElement(ej2_react_grids_1.GridComponent, { id: "grid", ref: function (grid) { return grid1 = grid; }, dataSource: gridData, created: gridCreated.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime] }),
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Center' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', textAlign: 'Center' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', textAlign: 'Center' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', format: { skeleton: 'yMd', type: 'date' }, textAlign: 'Center' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample filters the data by hire date using date-time axis.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to bind the value of the range navigator to the grid control using the ",
                    React.createElement("code", null, "changed"),
                    " event."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                    React.createElement("code", null, "DateTime"),
                    " module using the ",
                    React.createElement("code", null, "RangeNavigator.Inject(DateTime)"),
                    " method.")))));
    function changed(args) {
        if (grid1 && gridRender) {
            grid1.dataSource = data_source_1.employeeData.filter(function (data) {
                return (data.HireDate >= new Date(+args.start) && data.HireDate <= new Date(+args.end));
            });
            grid1.refresh();
        }
    }
    ;
    function load(args) {
        (0, theme_color_1.loadRangeNavigatorTheme)(args);
    }
    ;
    function gridCreated(args) {
        gridRender = true;
    }
}
exports.default = Customization;
