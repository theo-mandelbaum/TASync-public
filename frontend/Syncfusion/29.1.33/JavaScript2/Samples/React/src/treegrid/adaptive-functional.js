"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./adaptive.css");
var SAMPLE_CSS = "\n.e-bigger.e-responsive-dialog .e-dlg-content {\n  padding: 16px;\n}\n\n/* The device with borders */\n.e-mobile-layout {\n  position: relative;\n  width: 360px;\n  height: 640px;\n  margin: auto;\n  border: 16px #f4f4f4 solid;\n  border-top-width: 60px;\n  border-bottom-width: 60px;\n  border-radius: 36px;\n  box-shadow: 0 0px 2px rgb(144 144 144), 0 0px 10px rgb(0 0 0 / 16%);\n}\n\n.tailwind-dark .e-mobile-layout,\n.material-dark .e-mobile-layout,\n.fabric-dark .e-mobile-layout,\n.bootstrap-dark .e-mobile-layout,\n.bootstrap5-dark .e-mobile-layout {\n  border: 16px rgb(255 255 255 / 10%) solid;\n  border-top-width: 60px;\n  border-bottom-width: 60px;\n}\n\n/* The horizontal line on the top of the device */\n.e-mobile-layout:before {\n  content: '';\n  display: block;\n  width: 60px;\n  height: 5px;\n  position: absolute;\n  top: -30px;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: #ebebeb;\n  border-radius: 10px;\n}\n\n.tailwind-dark .e-mobile-layout::before,\n.tailwind-dark .e-mobile-layout::after,\n.material-dark .e-mobile-layout::before,\n.material-dark .e-mobile-layout::after,\n.fabric-dark .e-mobile-layout::before,\n.fabric-dark .e-mobile-layout::after,\n.bootstrap-dark .e-mobile-layout::before,\n.bootstrap-dark .e-mobile-layout::after,\n.bootstrap5-dark .e-mobile-layout::before,\n.bootstrap5-dark .e-mobile-layout::after {\n  background: rgb(255 255 255  / 20%);\n}\n\n/* The circle on the bottom of the device */\n.e-mobile-layout:after {\n  content: '';\n  display: block;\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  left: 50%;\n  bottom: -65px;\n  transform: translate(-50%, -50%);\n  background: #e8e8e8;\n  border-radius: 50%;\n}\n\n/* The screen (or content) of the device */\n.e-mobile-layout .e-mobile-content {\n  overflow: hidden;\n  width: 328px;\n  height: 100%;\n  background: transparent;\n  border: 0px solid #dddddd;\n}\n\n.highcontrast .e-mobile-layout {\n  border: 16px #000000 solid;\n  border-top-width: 60px;\n  border-bottom-width: 60px;\n  box-shadow: -1px 2px white, -2px -2px white, 2px -2px white, 2px 1px white;\n}";
var Adaptive = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridobj = (0, react_1.useRef)(null);
    var toolbarOptions = [
        "Add",
        "Edit",
        "Delete",
        "Update",
        "Cancel",
        "Search",
    ];
    var renderingMode = "Vertical";
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
    };
    var filterOptions = { type: "Excel" };
    var validationRule = { required: true };
    var validationRule1 = { required: true, number: true };
    var load = function () {
        this.grid.adaptiveDlgTarget = document.getElementsByClassName("e-mobile-content")[0];
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-md-9 e-bigger e-adaptive-demo" }, !ej2_base_1.Browser.isDevice ? (React.createElement("div", { className: "e-mobile-layout" },
                React.createElement("div", { className: "e-mobile-content" },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { id: "adaptivebrowser", dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "100%", ref: treegridobj, enableAdaptiveUI: true, allowFiltering: true, allowSorting: true, allowPaging: true, filterSettings: filterOptions, toolbar: toolbarOptions, editSettings: editSettings, load: load },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", isPrimaryKey: true, width: "135", textAlign: "Right", validationRules: validationRule1 }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "280", validationRules: validationRule }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "150", textAlign: "Right", validationRules: validationRule }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "145", textAlign: "Right" })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.Page] }))))) : (React.createElement(ej2_react_treegrid_1.TreeGridComponent, { id: "adaptivedevice", dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "100%", ref: treegridobj, enableAdaptiveUI: true, allowFiltering: true, allowSorting: true, allowPaging: true, filterSettings: filterOptions, toolbar: toolbarOptions, editSettings: editSettings, load: load },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", isPrimaryKey: true, width: "135", textAlign: "Right", validationRules: validationRule1 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "280", validationRules: validationRule }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "140", textAlign: "Right", validationRules: validationRule }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "145", textAlign: "Right" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.Page] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the adaptive rendering behavior of Tree Grid features such as Filtering, Paging, Searching and etc.,")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "enableAdaptiveUI"),
                    " property is set to true. The filtering, CRUD actions, paging and other various user interactions in tree grid will be adaptive to the smaller screens. For example, Filtering opens the UI for user in a pop-up occupying the entire screen.")))));
};
exports.default = Adaptive;
