"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_2 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./virtual-scroll.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // define the array of string
    var records = [];
    for (var i = 1; i <= 150; i++) {
        var item = {};
        item.id = 'id' + i;
        item.text = "Item ".concat(i);
        // Generate a random number between 1 and 4 to determine the group
        var randomGroup = Math.floor(Math.random() * 4) + 1;
        switch (randomGroup) {
            case 1:
                item.group = 'Group A';
                break;
            case 2:
                item.group = 'Group B';
                break;
            case 3:
                item.group = 'Group C';
                break;
            case 4:
                item.group = 'Group D';
                break;
            default:
                break;
        }
        records.push(item);
    }
    var headerTemplate = (0, react_2.useCallback)(function () {
        return (React.createElement("div", { className: "header" },
            React.createElement("span", { style: { marginLeft: '17px' } }, "Items Info")));
    }, []);
    //set the value to item template
    var itemTemplate = (0, react_2.useCallback)(function (data) {
        return (React.createElement("div", { className: "ename", style: { height: '40px' } },
            " ",
            data.text,
            " "));
    }, []);
    //set the value to value template
    var valueTemplate = (0, react_2.useCallback)(function (data) {
        return (React.createElement("div", { className: "name" },
            " ",
            data.text,
            " "));
    }, []);
    var _a = (0, react_1.useState)(true), allowFiltering = _a[0], setAllowFiltering = _a[1];
    var _b = (0, react_1.useState)(true), allowCustomValue = _b[0], setAllowCustomValue = _b[1];
    var _c = (0, react_1.useState)(true), hideSelectedItem = _c[0], setHideSelectedItem = _c[1];
    var _d = (0, react_1.useState)(true), closePopupOnSelect = _d[0], setClosePopupOnSelect = _d[1];
    // bind the DataManager instance to dataSource property
    var customerData = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/VirtualDropdownData',
        adaptor: new ej2_data_1.UrlAdaptor,
        crossDomain: true
    });
    var onChange = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setAllowFiltering(args.checked);
    };
    var onChangeHide = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setHideSelectedItem(args.checked);
    };
    var onChangeClose = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setClosePopupOnSelect(args.checked);
    };
    var onChangeCustom = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setAllowCustomValue(args.checked);
    };
    // maps the appropriate column to fields property
    var fields = { text: 'text', value: 'id' };
    var value = ['id10', 'id50', 'id100', "custom"];
    var customerField = { text: 'OrderID', value: 'OrderID' };
    var groupField = { groupBy: 'group', text: 'text', value: 'id' };
    return (React.createElement("div", { id: "dropdowndefault", className: 'control-pane' },
        React.createElement("div", { className: "control-section col-lg-8" },
            React.createElement("div", { className: "multi-control-wrapper" },
                React.createElement("label", { className: "h4" }, "Local Data"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "local", dataSource: records, placeholder: "e.g. Item 1", mode: "Box", allowFiltering: allowFiltering, enableVirtualization: true, allowCustomValue: allowCustomValue, showDropDownIcon: true, hideSelectedItem: hideSelectedItem, closePopupOnSelect: closePopupOnSelect, fields: fields, popupHeight: "200px" },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))),
            React.createElement("div", { className: "multi-control-wrapper" },
                React.createElement("label", { className: "h4" }, "Remote Data"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "remote", dataSource: customerData, placeholder: "e.g. OrderID", mode: "Delimiter", allowFiltering: allowFiltering, enableVirtualization: true, allowCustomValue: allowCustomValue, showDropDownIcon: true, hideSelectedItem: hideSelectedItem, closePopupOnSelect: closePopupOnSelect, fields: customerField, popupHeight: "200px" },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))),
            React.createElement("div", { className: "multi-control-wrapper" },
                React.createElement("label", { className: "h4" }, "Default Values"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "databind", value: value, dataSource: records, placeholder: "e.g. Item 1", mode: "Default", allowFiltering: allowFiltering, enableVirtualization: true, allowCustomValue: allowCustomValue, showDropDownIcon: true, hideSelectedItem: hideSelectedItem, closePopupOnSelect: closePopupOnSelect, fields: fields, popupHeight: "200px" },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))),
            React.createElement("div", { className: "multi-control-wrapper" },
                React.createElement("label", { className: "h4" }, "Grouping"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "group", dataSource: records, placeholder: "e.g. Item 1", mode: "CheckBox", allowFiltering: allowFiltering, enableSelectionOrder: false, enableVirtualization: true, allowCustomValue: allowCustomValue, showDropDownIcon: true, fields: groupField, popupHeight: "200px" },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll, ej2_react_dropdowns_1.CheckBoxSelection] }))),
            React.createElement("div", { className: "multi-control-wrapper" },
                React.createElement("label", { className: "h4" }, "Template"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "Template", dataSource: records, placeholder: "e.g. Item 1", mode: "Default", allowFiltering: allowFiltering, enableVirtualization: true, allowCustomValue: allowCustomValue, showDropDownIcon: true, hideSelectedItem: hideSelectedItem, closePopupOnSelect: closePopupOnSelect, fields: fields, popupHeight: "200px", itemTemplate: itemTemplate, valueTemplate: valueTemplate, headerTemplate: headerTemplate },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] })))),
        React.createElement("div", { className: 'col-lg-4 property-section', style: { left: '0px', width: '250px' } },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'AllowFiltering', change: onChange.bind(_this) })))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'AllowCustomValue', change: onChangeCustom.bind(_this) })))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'HideSelectedItem', change: onChangeHide.bind(_this) })))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'ClosePopupOnSelect', change: onChangeClose.bind(_this) }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the virtualization support of the MultiSelect. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "MultiSelect"),
                " component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the ",
                React.createElement("code", null, "enableVirtualization"),
                " property to true. When virtualization is enabled, MultiSelect doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling. Virtualization works with both local and remote data."),
            React.createElement("p", null,
                "To perform the virtualization feature in the MultiSelect, the ",
                React.createElement("code", null, "VirtualScroll"),
                " module has to be injected at the application level."))));
};
exports.default = Default;
