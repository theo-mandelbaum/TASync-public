"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./filtering.css");
var dataSource = require("./filtering-data.json");
var Filtering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.filterData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section dropdowntree-filtering' },
            React.createElement("div", { className: 'control_wapper' },
                React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "filter", filterBarPlaceholder: 'Search', allowFiltering: true, fields: fields, placeholder: "Select an item", popupHeight: "220px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the filtering functionalities of the Dropdown Tree. Click the Dropdown Tree element, and then type a character in the search box. It will display the filtered list items based on the typed characters.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Dropdown Tree has the built-in support to filter the data source when the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#allowfiltering" }, "allowFiltering"),
                " is enabled. It performs when the characters are typed in the search box."))));
};
exports.default = Filtering;
