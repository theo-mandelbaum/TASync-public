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
exports.Remote = void 0;
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./remote-databinding.css");
var ej2_data_1 = require("@syncfusion/ej2-data");
var Remote = /** @class */ (function (_super) {
    __extends(Remote, _super);
    function Remote() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        _this.fields = { text: 'FirstName', value: 'EmployeeID' };
        _this.query = new ej2_data_1.Query().select(['FirstName', 'EmployeeID', 'Designation', 'Country']).take(10).requiresCount();
        return _this;
    }
    Remote.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper remote-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '60px' } },
                        React.createElement("label", null, "Select an employee"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { dataSource: this.dataSource, fields: this.fields, query: this.query, placeholder: 'eg. Andrew', popupHeight: '230px', popupWidth: '500px', allowSorting: false },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'EmployeeID', header: 'Employee ID', width: 120 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'FirstName', header: 'Name', width: 130 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Designation', header: 'Designation', width: 120 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Country', header: 'Country', width: 90 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the remote data-binding supported in the MultiColumn ComboBox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiColumn ComboBox loads the remote data services through the ",
                    React.createElement("code", null, "dataSource"),
                    " property. It supports data types such as ",
                    React.createElement("code", null, "JavaScript object arrays"),
                    " or ",
                    React.createElement("code", null, "DataManager"),
                    "."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DataManager"),
                    ", act as an interface between service endpoint and MultiColumn ComboBox will require the following minimal information to interact with the service endpoint properly."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null,
                            "DataManager",
                            '->',
                            "url"),
                        " - Defines the service endpoint to fetch data."),
                    React.createElement("li", null,
                        React.createElement("code", null,
                            "DataManager",
                            '->',
                            "adaptor"),
                        " - Defines the adaptor option. By default, ",
                        React.createElement("code", null, "ODataAdaptor"),
                        " is used for remote binding.")),
                React.createElement("p", null,
                    "The adaptor is responsible for processing response and request from/to the service endpoint.",
                    React.createElement("code", null, "@syncfusion/ej2-data"),
                    " package provides some predefined adaptors which are designed to interact with particular service endpoints. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "UrlAdaptor"),
                        " - Use this to interact any remote services."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ODataAdaptor"),
                        " - Use this to interact with OData endpoints."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ODataV4Adaptor"),
                        " - Use this to interact with OData V4 endpoints."),
                    React.createElement("li", null,
                        React.createElement("code", null, "WebApiAdaptor"),
                        " - Use this to interact with Web API created under OData standards."),
                    React.createElement("li", null,
                        React.createElement("code", null, "WebMethodAdaptor"),
                        " - Use this to interact with web methods.")),
                React.createElement("p", null,
                    "In this sample, remote data is bound to a collection of employees data as an instance of ",
                    React.createElement("code", null, "DataManager"),
                    " and ",
                    React.createElement("code", null, "WebApiAdaptor"),
                    "."))));
    };
    return Remote;
}(sample_base_1.SampleBase));
exports.Remote = Remote;
