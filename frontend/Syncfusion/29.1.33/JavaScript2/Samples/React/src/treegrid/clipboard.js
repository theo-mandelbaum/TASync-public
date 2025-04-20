"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clipboard = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Clipboard = /** @class */ (function (_super) {
    __extends(Clipboard, _super);
    function Clipboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
        _this.visible = false;
        _this.modes = [
            { text: 'Parent', value: 'Parent' },
            { text: 'Child', value: 'Child' },
            { text: 'Both', value: 'Both' },
            { text: 'None', value: 'None' },
        ];
        _this.animationSettings = { effect: 'None' };
        _this.alertButtons = [{
                // Click the footer buttons to hide the Dialog
                click: function () {
                    _this.alertDialogInstance.hide();
                },
                buttonModel: { content: 'OK', isPrimary: true }
            }];
        return _this;
    }
    Clipboard.prototype.onChange = function (sel) {
        var mode = sel.value.toString();
        this.treegridInstance.copyHierarchyMode = mode;
    };
    Clipboard.prototype.toolbarClick = function (args) {
        if (this.treegridInstance.getSelectedRecords().length > 0) {
            var withHeader = false;
            if (args.item.id === 'copyHeader') {
                withHeader = true;
            }
            this.treegridInstance.copy(withHeader);
        }
        else {
            this.alertDialogInstance.show();
        }
    };
    Clipboard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: function (treegrid) { return _this.treegridInstance = treegrid; }, height: '350', treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: true, allowSelection: true, selectionSettings: { type: 'Multiple' }, pageSettings: { pageSize: 10 }, toolbar: this.toolbarOptions, toolbarClick: this.toolbarClick.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.Selection, ej2_react_treegrid_1.Page] }))),
                React.createElement("div", null,
                    React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Copy with Header', visible: this.visible, animationSettings: this.animationSettings, width: '300px', content: 'Atleast one row should be selected to copy with header', ref: function (alertdialog) { return _this.alertDialogInstance = alertdialog; }, target: '.control-section', buttons: this.alertButtons })),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '30%' } },
                                        React.createElement("div", { style: { paddingTop: '7px' } }, " Hierarchy Mode ")),
                                    React.createElement("td", { style: { width: '70%', paddingTop: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "99px", id: "selmode", change: this.onChange.bind(this), dataSource: this.modes, value: "Parent" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates copy to clipboard functionality of the Tree Grid component. Select rows and click Copy button from toolbar to copy content. To copy with header click Copy with header button from toolbar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Selected rows or cells data in the Tree Grid can be copied into the clipboard using the Keyboard shortcuts and",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/treegrid/#copy" }, "copy")),
                    " method."),
                React.createElement("p", null, "In this demo, selected rows data can be copied into the clipboard using the below Keyboard shortcuts or toolbar interactions."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Ctrl + C"),
                        " - Selected rows or cells data without header."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Ctrl + Shift + H"),
                        " - Selected rows or cells data with header.")),
                React.createElement("p", null,
                    "Tree Grid provides support for a set of copy modes with ",
                    React.createElement("code", null, "copyHierarchyMode"),
                    " property. The below are the type of copy mode available in Tree Grid. "),
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
    return Clipboard;
}(sample_base_1.SampleBase));
exports.Clipboard = Clipboard;
