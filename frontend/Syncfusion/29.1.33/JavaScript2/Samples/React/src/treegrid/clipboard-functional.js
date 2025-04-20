"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Clipboard = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toolbarOptions = [
        { text: "Copy", tooltipText: "Copy", prefixIcon: "e-copy", id: "copy" },
        {
            text: "Copy With Header",
            tooltipText: "Copy With Header",
            prefixIcon: "e-copy",
            id: "copyHeader",
        },
    ];
    var treegridInstance = (0, react_1.useRef)(null);
    var visible = false;
    var modes = [
        { text: "Parent", value: "Parent" },
        { text: "Child", value: "Child" },
        { text: "Both", value: "Both" },
        { text: "None", value: "None" },
    ];
    var onChange = function (sel) {
        var mode = sel.value.toString();
        treegridInstance.current.copyHierarchyMode = mode;
    };
    var animationSettings = { effect: "None" };
    var alertDialogInstance = (0, react_1.useRef)(null);
    var alertButtons = [
        {
            // Click the footer buttons to hide the Dialog
            click: function () {
                alertDialogInstance.current.hide();
            },
            buttonModel: { content: "OK", isPrimary: true },
        },
    ];
    var toolbarClick = function (args) {
        if (treegridInstance.current.getSelectedRecords().length > 0) {
            var withHeader = false;
            if (args.item.id === "copyHeader") {
                withHeader = true;
            }
            treegridInstance.current.copy(withHeader);
        }
        else {
            alertDialogInstance.current.show();
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: treegridInstance, height: "350", treeColumnIndex: 1, childMapping: "subtasks", allowPaging: true, allowSelection: true, selectionSettings: { type: "Multiple" }, pageSettings: { pageSize: 10 }, toolbar: toolbarOptions, toolbarClick: toolbarClick.bind(_this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "70", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "80", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.Selection, ej2_react_treegrid_1.Page] }))),
            React.createElement("div", null,
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: "Copy with Header", visible: visible, animationSettings: animationSettings, width: "300px", content: "Atleast one row should be selected to copy with header", ref: alertDialogInstance, target: ".control-section", buttons: alertButtons })),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "30%" } },
                                    React.createElement("div", { style: { paddingTop: "7px" } }, " Hierarchy Mode ")),
                                React.createElement("td", { style: { width: "70%", paddingTop: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "99px", id: "selmode", change: onChange.bind(_this), dataSource: modes, value: "Parent" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates copy to clipboard functionality of the Tree Grid component. Select rows and click Copy button from toolbar to copy content. To copy with header click Copy with header button from toolbar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Selected rows or cells data in the Tree Grid can be copied into the clipboard using the Keyboard shortcuts and",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/treegrid/#copy" }, "copy")),
                " ",
                "method."),
            React.createElement("p", null, "In this demo, selected rows data can be copied into the clipboard using the below Keyboard shortcuts or toolbar interactions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Ctrl + C"),
                    " - Selected rows or cells data without header."),
                React.createElement("li", null,
                    React.createElement("code", null, "Ctrl + Shift + H"),
                    " - Selected rows or cells data with header.")),
            React.createElement("p", null,
                "Tree Grid provides support for a set of copy modes with",
                " ",
                React.createElement("code", null, "copyHierarchyMode"),
                " property. The below are the type of copy mode available in Tree Grid.",
                " "),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Parent"),
                    " - This is the default copy hierarchy mode in Tree Grid. Clipboard value have the selected records with its parent records, if the selected records not have any parent record then the selected record will be in clipboard."),
                React.createElement("li", null,
                    React.createElement("code", null, "Child"),
                    " - Clipboard value have the selected records with its child record, if the selected records do not have any child record then the selected records will be in clipboard."),
                React.createElement("li", null,
                    React.createElement("code", null, "Both"),
                    " - Clipboard value have the selected records with its both parent and child record. If the selected records do not have any parent and child record then the selected records will be in clipboard."),
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - Only the Selected records will be in clipboard.")),
            React.createElement("p", null, "While using the Tree Grid in a touch device environment, there is an option for multi-selection through single tap on the row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single tap and click for the toolbar to copy the selected records into clipboard."),
            React.createElement("p", null,
                "More information on the Clipboard feature can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/clipboard/" }, "documentation section"),
                "."))));
};
exports.default = Clipboard;
