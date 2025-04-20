"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./style.css");
var data = require("./dataSource.json");
var Filtering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'countries';
    //define the filtering data
    var dataLocal;
    dataLocal = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Name', value: 'Code' };
    // filtering event handler to filter a country
    var onFiltering = (0, react_1.useCallback)((0, ej2_base_1.debounce)(function (e) {
        var query = new ej2_data_1.Query();
        //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where("Name", "startswith", e.text, true) : query;
        //pass the filter data source, filter query to updateData method.
        e.updateData(dataLocal, query);
    }, 400), [dataLocal]);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'multifilter', className: "control-styles" },
                React.createElement("label", { className: "h4" }, "Filtering"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "comboelement", dataSource: dataLocal, filtering: onFiltering.bind(_this), allowFiltering: true, fields: fields, placeholder: "Select countries" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the filtering functionalities of the MultiSelect. Type a character in the MultiSelect element and choose one or more items from the ",
                React.createElement("code", null, "filtered"),
                " list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect has built-in support to filter the data source when ",
                React.createElement("code", null, "allowFiltering"),
                " is enabled. It performs when characters are typed in the component. In ",
                React.createElement("code", null, "filtering"),
                " event, you can filter down the data source and return the resulted data to MultiSelect via ",
                React.createElement("code", null, "updateData"),
                " method to display its list items."),
            React.createElement("p", null,
                "This sample illustrates that, query the data source and pass the resulted data to MultiSelect through the ",
                React.createElement("code", null, "updateData"),
                " method in ",
                React.createElement("code", null, "filtering"),
                " event."),
            React.createElement("p", null,
                "More information on the filtering feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/filtering.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Filtering;
