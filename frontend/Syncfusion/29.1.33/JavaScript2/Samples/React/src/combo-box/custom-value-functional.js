"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./custom.css");
var data = require("./dataSource.json");
var Custom = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var listObj = (0, react_1.useRef)(null);
    var temp = 'countries';
    // defined the JSON of data
    var searchData = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Name', value: 'Code' };
    // set the template content when the typed character(s) is not present in the list
    var template = '<div id="nodata"> No matched item, do you want to add it as new item in list?</div> <button id="btn" class="e-control e-btn">Add New Item</button>';
    // bind the filtering event
    var onFiltering = function (e) {
        var query = new ej2_data_1.Query();
        // frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        // pass the filter data source, filter query to updateData method.
        e.updateData(searchData, query);
        if (document.getElementById('nodata')) {
            // bind click event to button which is shown in popup element when the typed character(s) is not present in the list
            document.getElementById('btn').onclick = function () {
                // get the typed characters
                var customValue = document.getElementById('customvalue').value;
                // make new object based on typed characters
                var newItem = { 'Name': customValue, 'Code': customValue };
                // new object added to data source.
                listObj.current.dataSource.push(newItem);
                // close the popup element.
                listObj.current.hidePopup();
                // pass new object to addItem method.
                listObj.current.addItem(newItem);
                // select the newly added item.
                listObj.current.value = customValue;
            };
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'customvalues' },
                React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "customvalue", ref: listObj, dataSource: searchData, filtering: onFiltering.bind(_this), allowFiltering: true, fields: fields, noRecordsTemplate: template, placeholder: "Select a country", popupHeight: "270px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the custom value functionalities of the ComboBox. When the typed character(s) is not present in the list, a button will be shown in the popup list. By clicking on this button, the custom value character is added in the existing list as a new item.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ComboBox allows the user to give input as ",
                React.createElement("code", null, "custom value"),
                " which is not required to present in the predefined set of values. By default, this support is enabled by ",
                React.createElement("code", null, "allowCustom"),
                "property. In this case, both text field and value field are considered as same. The custom value will be sent to post back handler when a form is about to be submitted."),
            React.createElement("p", null,
                " More information about the Custom value feature can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/combo-box/getting-started.html#custom-values", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Custom;
