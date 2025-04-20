"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./disabled-items.css");
var data = require("./dataSource.json");
var DisabledItems = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'tag';
    //define the data with tag
    var tagData = data[temp];
    // map the groupBy field with tag
    var tagFields = { value: "ID", text: "Text", disabled: "State" };
    var tempData = 'vegetables';
    //define the data with groupong
    var vegetableData = data[tempData];
    // map the vegetable field with Class column
    var vegetableFields = { groupBy: 'Category', text: 'Vegetable', value: 'ID', disabled: 'State' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: 'dropIcon' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { id: "disabled-tag" },
                    React.createElement("label", { className: "h4" }, "Tags"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "tag", dataSource: tagData, fields: tagFields, placeholder: "Select Tags", allowFiltering: true }))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { id: "vegetable" },
                    React.createElement("label", { className: "h4" }, "Vegetables"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "vegetables", dataSource: vegetableData, fields: vegetableFields, placeholder: "Select Vegetables", mode: "CheckBox" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example showcases the disabled items of MultiSelect. When you click on the MultiSelect the popup will open, and you will notice that the disabled items are greyed out and cannot be selected.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be selected as a value for the component. To configure the disabled item columns, use the ",
                React.createElement("code", null, "fields.disabled"),
                " property."))));
};
exports.default = DisabledItems;
