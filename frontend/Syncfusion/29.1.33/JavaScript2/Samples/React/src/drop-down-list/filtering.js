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
exports.Filtering = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
require("./filtering.css");
var data = require("./dataSource.json");
var Filtering = /** @class */ (function (_super) {
    __extends(Filtering, _super);
    function Filtering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //define the filtering data
        _this.temp = 'countries';
        _this.searchData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Name', value: 'Code' };
        // filtering event handler to filter a Country
        _this.onFiltering = function (e) {
            var query = new ej2_data_1.Query();
            //frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            //pass the filter data source, filter query to updateData method.
            e.updateData(_this.searchData, query);
        };
        return _this;
    }
    Filtering.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'filtering' },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "country", ref: function (dropdownlist) { _this.listObj = dropdownlist; }, dataSource: this.searchData, filtering: this.onFiltering.bind(this), filterBarPlaceholder: 'Search a country', allowFiltering: true, fields: this.fields, placeholder: "Select a country", popupHeight: "220px" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the filtering functionalities of the DropDownList. Click the DropDownList element and then type a character in the search box. It will display the filtered list items based on the typed characters.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The DropDownList has built-in support to filter the data source, when ",
                    React.createElement("code", null, "allowFiltering"),
                    " is enabled. It performs when characters are typed in the search box. In the ",
                    React.createElement("code", null, "filtering"),
                    " event, you can filter down the data source and return the resulted data to DropDownList via ",
                    React.createElement("code", null, "updateData"),
                    " method to display its list items."),
                React.createElement("p", null,
                    "This sample illustrates that, query the data source and pass the resulted data to DropDownList through the ",
                    React.createElement("code", null, "updateData"),
                    " method in ",
                    React.createElement("code", null, "filtering"),
                    " event."),
                React.createElement("p", null,
                    "More information on the filtering feature configuration can be found in the",
                    React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/drop-down-list/filtering.html", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Filtering;
}(sample_base_1.SampleBase));
exports.Filtering = Filtering;
