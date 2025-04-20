"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n  .fluent2,\n  .fluent2-dark,\n  .fluent2-highcontrast {\n    #selectiondd1 .e-input-group {\n      width: 120px !important;\n    }\n}";
var Selection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("none"), display = _a[0], setDisplay = _a[1];
    var typeDropdownObj = (0, react_1.useRef)(null);
    var modeDropdownObj = (0, react_1.useRef)(null);
    var treegridObj = (0, react_1.useRef)(null);
    var types = [
        { id: "Single", type: "Single" },
        { id: "Multiple", type: "Multiple" },
    ];
    var modes = [
        { id: "Row", mode: "Row" },
        { id: "Cell", mode: "Cell" },
    ];
    var cellmodes = [
        { id: "Flow", mode: "Flow" },
        { id: "Box", mode: "Box" },
    ];
    var typeChange = function (args) {
        var type = args.value;
        var mode = modeDropdownObj.current.value;
        treegridObj.current.selectionSettings.type = type;
        if (type === "Multiple" && mode === "Cell") {
            setDisplay("table-row");
        }
        else {
            setDisplay("none");
        }
    };
    var modeChange = function (args) {
        var mode = args.value;
        var type = typeDropdownObj.current.value;
        treegridObj.current.selectionSettings.mode = mode;
        if (type === "Multiple" && mode === "Cell") {
            setDisplay("table-row");
        }
        else {
            setDisplay("none");
        }
    };
    var cellmodeChange = function (args) {
        var cellmode = args.value;
        treegridObj.current.selectionSettings.cellSelectionMode = cellmode;
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, allowSelection: true, selectionSettings: { type: "Multiple" }, pageSettings: { pageSize: 10 }, ref: treegridObj },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "100", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: "7px", paddingLeft: "10px" } },
                                        " ",
                                        "Selection Type",
                                        " ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", { id: 'selectiondd1' },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "type", change: typeChange.bind(_this), dataSource: types, fields: { text: "type", value: "id" }, value: "Multiple", ref: typeDropdownObj })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: "10px" } }, " Selection Mode ")),
                                React.createElement("td", { style: { width: "70%" } },
                                    React.createElement("div", { style: { paddingRight: "10px" } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "mode", change: modeChange.bind(_this), dataSource: modes, fields: { text: "mode", value: "id" }, value: "Row", ref: modeDropdownObj })))),
                            React.createElement("tr", { id: "cellselection", style: { display: display } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: "10px" } }, " Cell Selection Mode ")),
                                React.createElement("td", { style: { width: "70%" } },
                                    React.createElement("div", { style: { paddingRight: "10px", paddingBottom: "10px" } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "cellmode", change: cellmodeChange.bind(_this), dataSource: cellmodes, fields: { text: "mode", value: "id" }, value: "Flow" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the selection feature in Grid, which allows you to select row or cell through simple mouse down or keyboard interaction.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Selection provides an interactive support to highlight the row or cell that you select. Selection can be done through a simple Mouse down or Keyboard interaction.To enable selection, set",
                    " ",
                    React.createElement("code", null, "allowSelection"),
                    " as true."),
                React.createElement("p", null,
                    "Tree Grid supports two types of selection which can be set using",
                    " ",
                    React.createElement("code", null, "selectionSettings->type"),
                    " property. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Single"),
                        " - Enabled by default. Allows the user to select single row/cell at a time."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Multiple"),
                        " - Allows the user to select more than one row/cell at a time.")),
                React.createElement("p", null,
                    "Also, supports three modes of selection which can be set using",
                    " ",
                    React.createElement("code", null, "selectionSettings->mode property"),
                    ". They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row"),
                        " - Enabled by default. Enables the row selection in Grid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell"),
                        " - Enables the cell selection in Grid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Enables both the row and cell selection in Grid. Clicking any cell will select both row and cell simultaneously")),
                React.createElement("p", null,
                    "The Tree Grid supports two types of cell selection mode that can be set by using the",
                    React.createElement("code", null, "selectionSettings.cellSelectionMode"),
                    ". They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "flow"),
                        " - The Flow value is set by default. The range of cells are selected between the start index and end index that includes in between cells of rows."),
                    React.createElement("li", null,
                        React.createElement("code", null, "box"),
                        " - Range of cells are selected from the start and end column indexes that includes in between cells of rows within the range.")),
                React.createElement("p", null, "To perform the multi-selection, hold CTRL key and click the desired rows/cells. To select range of rows/cells, hold SHIFT key and click the rows/cells."),
                React.createElement("p", null, "While using the Tree Grid in a touch device environment, there is an option for multi-selection through single tap on the row and it will show a popup with the multi-selection symbol.Tap the icon to enable multi-selection in a single tap."),
                React.createElement("p", null, "In this demo, select the selection type and selection mode from the properties panel to do the selection. The cell selection mode dropdown is enabled only when we select type as multiple and mode as cell in property panel."),
                React.createElement("p", null,
                    "More information on the selection configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/selection/selection" }, "documentation section"),
                    ".")))));
};
exports.default = Selection;
