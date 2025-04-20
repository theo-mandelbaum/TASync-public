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
exports.Local = void 0;
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var csvData_1 = require("./pivot-data/csvData");
var localData = require("./pivot-data/rData.json");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./local.css");
/**
 * PivotView sample for Local data source.
 */
/* tslint:disable */
var data = localData.data;
var Local = /** @class */ (function (_super) {
    __extends(Local, _super);
    function Local() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'value' };
        _this.contentTypes = [
            { 'value': 'JSON', 'text': 'JSON' },
            { 'value': 'CSV', 'text': 'CSV' }
        ];
        _this.jsonReport = {
            dataSource: _this.groupDate(data),
            type: 'JSON',
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' },
                { name: 'Quarter', caption: 'Quarter' }
            ],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            values: [
                { name: 'PowUnits', caption: 'Units (GWh)' },
                { name: 'ProCost', caption: 'Cost (MM)' }
            ],
            filters: []
        };
        _this.csvReport = {
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
    Local.prototype.ddlOnChange = function (args) {
        if (args.value === 'JSON') {
            this.pivotObj.dataSourceSettings = this.jsonReport;
        }
        else if (args.value === 'CSV') {
            this.csvReport.dataSource = this.getCSVData();
            this.pivotObj.dataSourceSettings = this.csvReport;
        }
    };
    Local.prototype.getCSVData = function () {
        var dataSource = [];
        var jsonObject = csvData_1.csvdata.split(/\r?\n|\r/);
        for (var i = 0; i < jsonObject.length; i++) {
            if (!(0, ej2_base_1.isNullOrUndefined)(jsonObject[i]) && jsonObject[i] !== '') {
                dataSource.push(jsonObject[i].split(','));
            }
        }
        return dataSource;
    };
    Local.prototype.groupDate = function (data) {
        if (data[0].Year === undefined) {
            var date = void 0;
            for (var ln = 0, lt = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                var dtYr = date.getFullYear();
                var dtMn = date.getMonth();
                var dtdv = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        return data;
    };
    Local.prototype.onLoad = function (args) {
        if (args.dataSourceSettings.type === 'CSV') {
            args.dataSourceSettings.dataSource = this.getCSVData();
        }
    };
    Local.prototype.render = function () {
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
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, load: this.onLoad.bind(this), dataSourceSettings: this.jsonReport, width: '100%', height: '290', gridSettings: { columnWidth: 120 } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates basic rendering of the pivot table bound to JSON or CSV data extracted from a local file.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The pivot table supports JSON and CSV data source. The",
                    React.createElement("code", null, "dataSourceSettings->dataSource"),
                    " property can be assigned with the source data to populate the pivot table."),
                React.createElement("p", null, "In this demo, the JSON and CSV data is assigned from an external file."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the Essential",
                    React.createElement("sup", null, "\u00AE"),
                    " JS2 Pivot Table can be found in these ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/data-binding#binding-json-data-via-local" }, "JSON"),
                    " & ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/data-binding#binding-csv-data-via-local" }, "CSV"),
                    " documentation section."))));
    };
    return Local;
}(sample_base_1.SampleBase));
exports.Local = Local;
