"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var data_1 = require("./data");
require("./empty-record-template.css");
function EmptyRecordTemplate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function emptyMessageTemplate() {
        var src = '';
        if (document.body.classList.value.indexOf('dark') > -1 || document.body.classList.value.indexOf('highcontrast') > -1) {
            src = "src/grid/images/emptyRecordTemplate_dark.svg";
        }
        else {
            src = "src/grid/images/emptyRecordTemplate_light.svg";
        }
        return (React.createElement("div", { className: 'emptyRecordTemplate' },
            React.createElement("img", { src: src, className: "e-emptyRecord", alt: "No record" }),
            React.createElement("span", null, "There is no data available to display at the moment.")));
    }
    var data = [];
    var template = emptyMessageTemplate;
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var orderidRules = { required: true, number: true };
    var editparams = { params: { dataSource: new ej2_data_1.DataManager(data_1.orderDataSource), fields: { text: "ShipCountry", value: "ShipCountry" }, } };
    var validationRule = { required: true };
    var pageSettings = { pageCount: 5 };
    var format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data, emptyRecordTemplate: template.bind(this), toolbar: toolbarOptions, allowPaging: true, editSettings: editSettings, pageSettings: pageSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: validationRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', format: format, width: '160' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: editparams })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of the empty record template in the DataGrid. In this sample, we show a custom image in the place of the default no-record message typically shown by the DataGrid.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The DataGrid provides a way to use a custom content when it has no data to present. The ",
                React.createElement("code", null, "emptyRecordTemplate"),
                " property accepts either a string or an HTML element ID value, which will be used as the template when there's no data."),
            React.createElement("p", null,
                "More information on the dataBinding feature configuration can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/data-binding/data-binding' }, " documentation section"),
                "."))));
}
exports.default = EmptyRecordTemplate;
