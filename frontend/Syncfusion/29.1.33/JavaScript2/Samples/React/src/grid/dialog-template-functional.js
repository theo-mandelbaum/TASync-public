"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./dialog-temp.css");
function DialogTemplate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbarOptions = ['Add', 'Edit', 'Delete'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: dialogTemplate };
    var validationRules = { required: true };
    var orderidRules = { required: true, number: true };
    var pageSettings = { pageCount: 5 };
    function dialogTemplate(props) {
        return (React.createElement(DialogFormTemplate, __assign({}, props)));
    }
    function actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (ej2_base_1.Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();
            }
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, toolbar: toolbarOptions, allowSorting: true, allowFiltering: true, filterSettings: filterSettings, allowPaging: true, editSettings: editSettings, pageSettings: pageSettings, actionComplete: actionComplete.bind(this) },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: validationRules }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates CRUD operations in Grid with ",
                    React.createElement("code", null, "Dialog Template"),
                    " feature. You can perform CRUD operations as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " -  To add new record, click Add toolbar button "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a row or click toolbar Edit button after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete record, click toolbar Delete button after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        ",",
                        React.createElement("code", null, "Cancel"),
                        " - You can save or discard changes by click toolbar Update and cancel button respectively"))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " The Grid supports CRUD operations. This CRUD operations can be configured in Grid using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/" }, "editSettings")),
                    "."),
                React.createElement("p", null,
                    "In this demo, Dialog template is enabled for editing by defining ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/#mode" }, "editSettings.mode")),
                    " as ",
                    React.createElement("code", null, "Dialog"),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/#template" }, "editSettingsTemplate ")),
                    " as a React template. You can start editing by double clicking a row or clicking on toolbar's ",
                    React.createElement("code", null, "Edit"),
                    " button, then the currently selected row will be shown on a dialog with custom elements and you can change the row values and save edited data to the datasource."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/edit/" }, "Edit")),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    ".")))));
}
function DialogFormTemplate(props) {
    React.useEffect(function () {
        var states = val;
        // Set initail Focus
        states.isAdd ? orderID.focus() : customerName.focus();
    }, []);
    var shipCityDistinctData = ej2_data_1.DataUtil.distinct(data_1.data, 'ShipCity', true);
    var shipCountryDistinctData = ej2_data_1.DataUtil.distinct(data_1.data, 'ShipCountry', true);
    var orderID;
    var customerName;
    var _a = React.useState((0, ej2_base_1.extend)({}, {}, props, true)), val = _a[0], setval = _a[1];
    function onChange(args) {
        var key = args.target.name;
        var value = args.target.value;
        setval(function (prevVal) {
            var _a;
            return (__assign(__assign({}, prevVal), (_a = {}, _a[key] = value, _a)));
        });
    }
    var data = val;
    // react warning error purpose
    if (data.isAdd) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            if (data[keys[i]] !== 'isAdd' && (0, ej2_base_1.isNullOrUndefined)(data[keys[i]])) {
                data[keys[i]] = '';
            }
        }
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "form-row" },
            React.createElement("div", { className: "form-group col-md-6" },
                React.createElement("div", { className: "e-float-input e-control-wrapper" },
                    React.createElement("input", { ref: function (input) { return orderID = input; }, id: "OrderID", name: "OrderID", type: "text", disabled: !data.isAdd, value: data.OrderID, onChange: onChange.bind(this) }),
                    React.createElement("span", { className: "e-float-line" }),
                    React.createElement("label", { className: "e-float-text e-label-top" }, " Order ID"))),
            React.createElement("div", { className: "form-group col-md-6" },
                React.createElement("div", { className: "e-float-input e-control-wrapper" },
                    React.createElement("input", { ref: function (input) { return customerName = input; }, value: data.CustomerName, id: "CustomerName", name: "CustomerName", type: "text", onChange: onChange.bind(this) }),
                    React.createElement("span", { className: "e-float-line" }),
                    React.createElement("label", { className: "e-float-text e-label-top" }, "Customer Name")))),
        React.createElement("div", { className: "form-row" },
            React.createElement("div", { className: "form-group col-md-6" },
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "Freight", format: 'C2', value: data.Freight, placeholder: "Freight", floatLabelType: 'Always' })),
            React.createElement("div", { className: "form-group col-md-6" },
                React.createElement(ej2_react_calendars_1.DatePickerComponent, { id: "OrderDate", value: data.OrderDate, placeholder: "Order Date", floatLabelType: 'Always' }))),
        React.createElement("div", { className: "form-row" },
            React.createElement("div", { className: "form-group col-md-6" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ShipCountry", value: data.ShipCountry, dataSource: shipCountryDistinctData, fields: { text: 'ShipCountry', value: 'ShipCountry' }, placeholder: "Ship Country", popupHeight: '300px', floatLabelType: 'Always' })),
            React.createElement("div", { className: "form-group col-md-6" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ShipCity", value: data.ShipCity, dataSource: shipCityDistinctData, fields: { text: 'ShipCity', value: 'ShipCity' }, placeholder: "Ship City", popupHeight: '300px', floatLabelType: 'Always' }))),
        React.createElement("div", { className: "form-row" },
            React.createElement("div", { className: "form-group col-md-12" },
                React.createElement("div", { className: "e-float-input e-control-wrapper" },
                    React.createElement("textarea", { id: "ShipAddress", name: "ShipAddress", value: data.ShipAddress, onChange: onChange.bind(this) }),
                    React.createElement("span", { className: "e-float-line" }),
                    React.createElement("label", { className: "e-float-text e-label-top" }, "Ship Address"))))));
}
exports.default = DialogTemplate;
