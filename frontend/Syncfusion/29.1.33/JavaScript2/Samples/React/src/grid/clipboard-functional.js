"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
function Clipboard() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var selectionsettings = { type: 'Multiple' };
    var filterSettings = { type: 'Excel' };
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', { text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    var gridInstance;
    var visible = false;
    var animationSettings = { effect: 'None' };
    var alertDialogInstance;
    var alertButtons = [{
            // Click the footer buttons to hide the Dialog
            click: function () {
                alertDialogInstance.hide();
            },
            buttonModel: { content: 'OK', isPrimary: true }
        }];
    function clickHandler(args) {
        if (args.item.id === 'copy' || args.item.id === 'copyHeader') {
            if (gridInstance.getSelectedRecords().length > 0) {
                var withHeader = args.item.id === 'copyHeader' ? true : false;
                gridInstance.copy(withHeader);
            }
            else {
                alertDialogInstance.show();
            }
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, ref: function (grid) { return gridInstance = grid; }, enableHover: false, toolbar: toolbarOptions, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, allowPaging: true, pageSettings: { pageCount: 5 }, selectionSettings: selectionsettings, toolbarClick: clickHandler.bind(this) },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: '170', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '130', editType: 'dropdownedit' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Filter] }))),
        React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Copy with Header', visible: visible, animationSettings: animationSettings, width: '300px', content: 'Atleast one row should be selected to copy with header', ref: function (alertdialog) { return alertDialogInstance = alertdialog; }, target: '.control-section', buttons: alertButtons }),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates copy to clipboard functionality of the Grid component. Select rows and click Copy button from toolbar to copy content. To copy with header click Copy with header button from toolbar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Selected rows or cells data in the Grid can be copied into the clipboard using the Keyboard shortcuts and ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#copy" }, "copy")),
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
                "More information on the Clipboard feature can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/clipboard.html" }, "documentation section"),
                "."))));
}
exports.default = Clipboard;
