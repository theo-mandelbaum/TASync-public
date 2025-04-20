"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var refresh;
function Grouping() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbarOptions = ['Edit', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true };
    var editparams = { params: { popupHeight: '300px' } };
    var validationRule = { required: true };
    var orderidRules = { required: true, number: true };
    var format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    var groupOptions = { showGroupedColumn: false, columns: ['ShipCountry'] };
    var gridInstance;
    var visible = false;
    var animationSettings = { effect: 'None' };
    var alertDialogInstance;
    var alertButtons = [{
            click: function () {
                alertDialogInstance.hide();
            },
            buttonModel: { content: 'OK', isPrimary: true }
        }];
    function dataBound() {
        if (refresh) {
            gridInstance.groupColumn('ShipCountry');
            refresh = false;
        }
    }
    function load() {
        refresh = this.refreshing;
    }
    function columnDragStart(args) {
        if (args.column.field === 'OrderDate') {
            alertDialogInstance.show();
        }
    }
    function created() {
        gridInstance.on('columnDragStart', columnDragStart, this);
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDataSource, allowPaging: true, ref: function (grid) { return gridInstance = grid; }, toolbar: toolbarOptions, pageSettings: { pageCount: 5 }, allowFiltering: true, filterSettings: filterSettings, editSettings: editSettings, allowGrouping: true, groupSettings: groupOptions, allowSorting: true, height: "320", dataBound: dataBound.bind(this), load: load, created: created },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: validationRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', allowGrouping: false, editType: 'datetimepickeredit', format: format, width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: editparams })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter] })),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Grouping', visible: visible, animationSettings: animationSettings, width: '300px', content: 'Grouping is disabled for this column', ref: function (alertdialog) { return alertDialogInstance = alertdialog; }, target: '.control-section', buttons: alertButtons }),
            React.createElement("div", { className: "e-dsalign" },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_prolific_inventors", target: '_blank' }, "Wikipedia: List of Prolific inventors"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates grouping feature of the Grid component. In this sample, the Grid data is grouped against ShipCountry column. To group any other column simply drag the column header and drop on the group drop area.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The Grid control has options to group the records based on the required column. When grouping is applied, grouped records are organized into a hierarchical structure to facilitate easier expansion and collapse of records. To enable grouping, set ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping" }, "allowGrouping")),
                " property as true."),
            React.createElement("p", null, "Columns can be grouped by simply dragging the column header and drop on the group drop area."),
            React.createElement("p", null, "In this demo, to group a specify column, drag and drop the column in the group drop area."),
            React.createElement("p", null,
                "In this demo, editing options can be enabled by setting ",
                React.createElement("code", null, "editSettings.allowEditing"),
                " as ",
                React.createElement("code", null, "true"),
                ". You can start editing by double-clicking a row or the toolbar `Edit` button. Once in edit mode, you have the ability to modify the values of the selected row. When saving the record, the Grid will refresh the specific edited row without affecting the expanded group state."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use grouping and editing features, we need to inject",
                React.createElement("code", null, "Group"),
                ", ",
                React.createElement("code", null, "Edit"),
                " modules into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the grouping feature configuration can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#groupsettings" }, " documentation section"),
                "."))));
}
exports.default = Grouping;
