"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
require("./highlight.css");
var data = require("./dataSource.json");
var Highlight = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'countries';
    // define the JSON of data
    var countries = data[temp];
    // maps the appropriate column to fields property
    var fields = { value: 'Name' };
    // define the array of data
    var filterData = ['Contains', 'StartsWith', 'EndsWith'];
    var _a = (0, react_1.useState)('Contains'), filterType = _a[0], setFilterType = _a[1];
    // bind change event to modify the filter type of AutoComplete.
    var onChange = function (args) {
        setFilterType(args.itemData.value);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8 control-wrappers' },
                React.createElement("div", { id: 'highlight' },
                    React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "country", filterType: filterType, dataSource: countries, fields: fields, placeholder: "e.g. Australia", highlight: true }))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "filter-property" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: "100%", marginTop: "15px" } },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null),
                                React.createElement("th", null))),
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } }, "FilterType :"),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "filter-type", dataSource: filterData, change: onChange.bind(_this), placeholder: "Select a type", text: 'Contains' })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the highlight functionalities of the AutoComplete. Type a character(s) in the autocomplete element and the typed characters are highlighted in the suggestion list. By default, ",
                React.createElement("code", null, "Contains"),
                " filter type is set in this sample and provided with the options to choose different filter type in the property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The AutoComplete has built-in support to highlight the searched characters on the suggested list items when ",
                React.createElement("code", null, "highlight"),
                " is enabled."),
            React.createElement("p", null, "This sample illustrates that, the searched characters on the country suggestion list items are highlighted."),
            React.createElement("p", null,
                " More information on the highlight search feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/auto-complete/how-to.html#custom-highlight-search", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Highlight;
