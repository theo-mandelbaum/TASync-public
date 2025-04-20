"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./filtering.css");
var data = require("./dataSource.json");
var Filtering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'countries';
    //define the filtering data
    var searchData = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Name', value: 'Code' };
    // filtering event handler to filter a Country
    var onFiltering = function (e) {
        var query = new ej2_data_1.Query();
        //frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        //pass the filter data source, filter query to updateData method.
        e.updateData(searchData, query);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'filtering' },
                React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "country", dataSource: searchData, filtering: onFiltering.bind(_this), allowFiltering: true, fields: fields, placeholder: "Select a country", popupHeight: "270px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the filtering functionalities of the ComboBox. Type a character in ComboBox element and choose an item from the filtered list based on the typed characters.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ComboBox has built-in support to filter the data source when ",
                React.createElement("code", null, "allowFiltering"),
                " is enabled. It performs when characters are typed in the search box. In ",
                React.createElement("code", null, "filtering"),
                " event, you can filter down the data source and return the resulted data to ComboBox via ",
                React.createElement("code", null, "updateData"),
                " method to display its list items."),
            React.createElement("p", null,
                "This sample illustrates that, query the data source and pass the resulted data to ComboBox through the ",
                React.createElement("code", null, "updateData"),
                " method in ",
                React.createElement("code", null, "filtering"),
                " event."),
            React.createElement("p", null,
                " More information on the filtering feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/combo-box/filtering.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Filtering;
