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
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./remote.css");
/**
 * PivotView sample for Remote data source.
 */
var Remote = /** @class */ (function (_super) {
    __extends(Remote, _super);
    function Remote() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'value' };
        _this.contentTypes = [
            { 'value': 'JSON', 'text': 'JSON' },
            { 'value': 'CSV', 'text': 'CSV' }
        ];
        _this.remoteData = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/order',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        _this.jsonReport = {
            url: '',
            dataSource: _this.remoteData,
            type: 'JSON',
            expandAll: true,
            filters: [],
            columns: [{ name: 'ProductName', caption: 'Product Name' }],
            rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
            formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
            values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
        };
        _this.csvReport = {
            url: 'https://ej2services.syncfusion.com/production/web-services/api/product',
            type: 'CSV',
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Total Cost', format: 'C0' }, { name: 'Total Revenue', format: 'C0' }, { name: 'Total Profit', format: 'C0' }],
            drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
            rows: [
                { name: 'Region' },
                { name: 'Country' }
            ],
            columns: [
                { name: 'Item Type' },
                { name: 'Sales Channel' }
            ],
            values: [
                { name: 'Total Cost' },
                { name: 'Total Revenue' },
                { name: 'Total Profit' }
            ],
            filters: []
        };
        return _this;
    }
    Remote.prototype.ddlOnChange = function (args) {
        if (args.value === 'JSON') {
            this.pivotObj.dataSourceSettings = this.jsonReport;
        }
        else if (args.value === 'CSV') {
            this.pivotObj.dataSourceSettings = this.csvReport;
        }
    };
    Remote.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section component-section' },
                React.createElement("div", { id: 'dropdown-control', style: { marginBottom: '5px' } },
                    React.createElement("table", { style: { maxWidth: '330px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Content Type:"))),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '5px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { placeholder: 'Content Type', fields: this.fields, change: this.ddlOnChange.bind(this), id: "contenttype", index: 0, enabled: true, dataSource: this.contentTypes })))))))),
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, dataSourceSettings: this.jsonReport, width: '100%', height: '300', gridSettings: { columnWidth: 120 } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates basic rendering of the pivot table bound to JSON or CSV data pulled from a remote server.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The pivot table supports JSON and CSV data source. The",
                    React.createElement("code", null, "dataSourceSettings->dataSource"),
                    " property can be assigned with the result of DataManager to bind remote data."),
                "The",
                React.createElement("code", null, "DataManager"),
                ", which will act as an interface between the service endpoint and the pivot table, will require the below minimal information to interact with service endpoint properly.",
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->url"),
                        " - Defines the service endpoint to fetch data."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->adaptor"),
                        " - Defines the adaptor option. Here,",
                        React.createElement("code", null, "WebApiAdaptor"),
                        " is used for remote binding.")),
                "In this demo, remote data is bound by assigning service data as an instance of",
                React.createElement("code", null, "DataManager"),
                " to the",
                React.createElement("code", null, "dataSourceSettings->dataSource"),
                " property. But for CSV, the service URL is directly set to ",
                React.createElement("code", null, "url"),
                " for remote data consumption.",
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the Essential",
                    React.createElement("sup", null, "\u00AE"),
                    " JS2 Pivot Table can be found in these ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/data-binding#binding-json-data-via-remote" }, "JSON"),
                    " & ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/data-binding#binding-csv-data-via-remote" }, "CSV"),
                    " documentation section."))));
    };
    return Remote;
}(sample_base_1.SampleBase));
exports.Remote = Remote;
