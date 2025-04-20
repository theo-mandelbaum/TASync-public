"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
// custom code end
function Virtualization() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // custom code start
    var SAMPLE_CSS = "\n    .image {\n        position: absolute;\n        background-repeat: no-repeat;\n        background-image: url('src/grid/images/spinner.gif');\n        background-position: center;\n        width: 16px;\n        height: 28px;\n    }\n\n    .e-bigger .image {\n        height: 36px;\n    }\n    \n    #popup {\n        position: absolute;\n        background-color: transparent;\n        display: none;\n        z-index: 100;\n    }\n    .div-button{\n        margin: 5px 5px 5px 0;\n    }\n\n    #performanceTime {\n        float: right;\n        margin-top: 3px;\n    }\n\n    .e-bigger #performanceTime{\n        margin-top: 8px;\n    }";
    var grid;
    var date1;
    var date2;
    var flag = true;
    var data = [];
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowDeleting: true, newRowPosition: 'Top' };
    var validationSno = { required: true, digits: true };
    var validationRule = { required: true };
    function onclick() {
        if (!data.length) {
            show();
            (0, data_1.datasource)();
            date1 = new Date().getTime();
            grid.dataSource = data = data_1.virtualData;
            grid.editSettings.allowAdding = true;
        }
        else {
            flag = true;
            show();
            date1 = new Date().getTime();
            grid.refresh();
        }
    }
    function show() {
        document.getElementById('popup').style.display = 'inline-block';
    }
    function hide() {
        if (flag && date1) {
            date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
            flag = false;
        }
        document.getElementById('popup').style.display = 'none';
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'div-button' },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-info', onClick: onclick.bind(this) }, "Load 100K Data"),
                React.createElement("span", { id: "popup" },
                    React.createElement("span", { id: "gif", className: "image" })),
                React.createElement("span", { id: "performanceTime" }, "Time Taken: 0 ms")),
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: [], enableVirtualization: true, enableColumnVirtualization: true, height: 400, ref: function (g) { return grid = g; }, dataBound: hide.bind(this), toolbar: toolbarOptions, editSettings: editSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'SNo', headerText: 'S.No', width: '140', validationRules: validationSno, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD1', headerText: 'Player Name', width: '130' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD2', headerText: 'Year', width: '100' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD3', headerText: 'Sports', width: '160', validationRules: validationRule, editType: 'dropdownedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD4', headerText: 'Country', width: '160', editType: 'dropdownedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD5', headerText: 'LGID', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD6', headerText: 'GP', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD7', headerText: 'GS', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD8', headerText: 'Minutes', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD9', headerText: 'Points', width: '130' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD10', headerText: 'OREB', width: '140' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD11', headerText: 'DREB', width: '140' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD12', headerText: 'REB', width: '130' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD13', headerText: 'Assists', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD14', headerText: 'Steals', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD15', headerText: 'Blocks', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD16', headerText: 'Turnovers', width: '140' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD17', headerText: 'PF', width: '100' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD18', headerText: 'FGA', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD19', headerText: 'FGM', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD20', headerText: 'FTA', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD21', headerText: 'FTM', width: '140' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD22', headerText: 'Three Attempted', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD23', headerText: 'Three Made', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD24', headerText: 'Post GP', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD25', headerText: 'Post GS', width: '120' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD26', headerText: 'Post Minutes', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD27', headerText: 'Post Points', width: '140' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD28', headerText: 'Post OREB', width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD29', headerText: 'Post DREB', width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD30', headerText: 'Post REB', width: '160', editType: 'numericedit', validationRules: validationRule })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.VirtualScroll, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid component with the virtual scrolling feature. Click the button at the top of the Grid to load data source and scroll the Grid content vertically and horizontally to load rows and columns respectively.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The Grid UI virtualization allows you to render only rows and columns visible within the view-port without buffering the entire datasource. Grid supports row and column virtualization. To enable row virtualization, set ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enablevirtualization" }, "enableVirtualization ")),
                " property as true. For column virtualization, set ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enablecolumnvirtualization" }, "enableColumnVirtualization")),
                " property as true."),
            React.createElement("p", null,
                "Note: The ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#height" }, "height")),
                " property must be defined when enabling ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enablevirtualization" }, "enableVirtualization ")),
                "."),
            React.createElement("p", null, "In this demo, Grid enabled row and column virtualization. Click the Load 100K Data button to bind 100000 rows and 30 columns. You can also perform the Edit action in this sample."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use Virtualscrolling feature, we need to inject ",
                React.createElement("code", null, "VirtualScroll"),
                " modeule into the ",
                React.createElement("code", null, "services"),
                "."))));
}
exports.default = Virtualization;
