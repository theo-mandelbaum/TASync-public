"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function Source() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var grid;
    var destGrid;
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var data = data_1.orderDetails;
    var destData = [];
    var rowDropSettings = { targetID: 'DestGrid' };
    var srcSelectionSettings = { type: 'Multiple' };
    var destSelectionSettings = { type: 'Multiple' };
    var rowDropSettings2 = { targetID: 'Grid' };
    var rowDragStart = function () {
        if (destGrid.isEdit) {
            if (destGrid.editModule.formObj.validate()) {
                destGrid.endEdit();
            }
            else {
                destGrid.closeEdit();
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("p", null, "Drag and Drop Rows between two Grids"),
            React.createElement("div", { style: { display: 'inline-block' } },
                React.createElement("div", { style: { float: 'left', width: '49%' } },
                    React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { grid = g; }, id: "Grid", dataSource: data, allowPaging: true, pageSettings: { pageCount: 1 }, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar, allowRowDragAndDrop: true, rowDropSettings: rowDropSettings, selectionSettings: srcSelectionSettings, rowDragStart: rowDragStart },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true, type: 'number' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '130', validationRules: customeridRule, type: 'string' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit', type: 'number' })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.RowDD, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
                React.createElement("div", { style: { float: 'right', width: '49%' } },
                    React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { destGrid = g; }, dataSource: destData, id: "DestGrid", allowPaging: true, pageSettings: { pageCount: 2 }, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar, allowRowDragAndDrop: true, rowDropSettings: rowDropSettings2, selectionSettings: destSelectionSettings },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true, type: 'number' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '130', validationRules: customeridRule, type: 'string' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit', type: 'number' })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.RowDD, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid component with the row drag and drop feature. Drag and drop rows between Grids to move rows.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Grid rows can be dragged and dropped to another Grid or custom controlled by enabling ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#allowrowdraganddrop" }, "allowRowDragAndDrop")),
                " property. The target control on which the Grid rows has to be dropped can be set by using ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#rowdropsettings" }, "rowDropSettings->targetID")),
                " property."),
            React.createElement("p", null, "The Selection feature should be enabled to select the rows. Multiple rows can be selected by simply clicking and dragging inside the Grid."),
            React.createElement("p", null, "In this demo, we have demonstrated how to drag and drop the rows between Grids. Row drag and drop feature is enabled in both the Grids. To drag and drop rows between Grids select rows, drag and drop them in the adjacent Grid."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject",
                React.createElement("code", null, "RowDD"),
                " module into the ",
                React.createElement("code", null, "services"),
                ". Since the selection feature is required to select rows, we also need to inject the ",
                React.createElement("code", null, "Selection"),
                " module."),
            React.createElement("p", null,
                "More information on the row drag and drop can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/row/row-drag-and-drop" }, "documentation section"),
                "."))));
}
exports.default = Source;
