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
exports.Default = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./virtual-scroll.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default(props) {
        var _this = _super.call(this, props) || this;
        // define the array of string
        _this.records = [];
        // bind the DataManager instance to dataSource property
        _this.customerData = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/VirtualDropdownData',
            adaptor: new ej2_data_1.UrlAdaptor,
            crossDomain: true
        });
        // maps the appropriate column to fields property
        _this.fields = { text: 'text', value: 'id' };
        _this.customerField = { text: 'OrderID', value: 'OrderID' };
        _this.groupField = { groupBy: 'group', text: 'text', value: 'id' };
        _this.value = ['id10', 'id50', 'id100', "custom"];
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
            _this.records.push(item);
        }
        return _this;
    }
    Default.prototype.headerTemplate = function (data) {
        return (React.createElement("div", { className: "header" },
            React.createElement("span", { style: { marginLeft: '17px' } }, "Items Info")));
    };
    //set the value to item template
    Default.prototype.itemTemplate = function (data) {
        return (React.createElement("div", { className: "ename", style: { height: '40px' } },
            " ",
            data.text,
            " "));
    };
    //set the value to value template
    Default.prototype.valueTemplate = function (data) {
        return (React.createElement("div", { className: "name" },
            " ",
            data.text,
            " "));
    };
    Default.prototype.onChange = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        this.localObj.allowFiltering = args.checked;
        this.remoteObj.allowFiltering = args.checked;
        this.databindObj.allowFiltering = args.checked;
        this.groupObj.allowFiltering = args.checked;
        this.templateObj.allowFiltering = args.checked;
    };
    Default.prototype.onChangeHide = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        this.localObj.hideSelectedItem = args.checked;
        this.remoteObj.hideSelectedItem = args.checked;
        this.databindObj.hideSelectedItem = args.checked;
        this.groupObj.hideSelectedItem = args.checked;
        this.templateObj.hideSelectedItem = args.checked;
    };
    Default.prototype.onChangeClose = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        this.localObj.closePopupOnSelect = args.checked;
        this.remoteObj.closePopupOnSelect = args.checked;
        this.databindObj.closePopupOnSelect = args.checked;
        this.groupObj.closePopupOnSelect = args.checked;
        this.templateObj.closePopupOnSelect = args.checked;
    };
    Default.prototype.onChangeCustom = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        this.localObj.allowCustomValue = args.checked;
        this.remoteObj.allowCustomValue = args.checked;
        this.databindObj.allowCustomValue = args.checked;
        this.templateObj.allowCustomValue = args.checked;
    };
    // call the change event's function after initialized the component.
    Default.prototype.rendereComplete = function () {
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section col-lg-8" },
                React.createElement("div", { className: "multi-control-wrapper" },
                    React.createElement("h4", null, "Local Data"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "local", ref: function (scope) { _this.localObj = scope; }, dataSource: this.records, placeholder: "e.g. Item 1", mode: "Box", allowFiltering: true, enableVirtualization: true, allowCustomValue: true, showDropDownIcon: true, hideSelectedItem: true, closePopupOnSelect: true, fields: this.fields, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))),
                React.createElement("div", { className: "multi-control-wrapper" },
                    React.createElement("h4", null, "Remote Data"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "remote", ref: function (scope) { _this.remoteObj = scope; }, dataSource: this.customerData, placeholder: "e.g. OrderID", mode: "Delimiter", allowFiltering: true, enableVirtualization: true, allowCustomValue: true, showDropDownIcon: true, hideSelectedItem: true, closePopupOnSelect: true, fields: this.customerField, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))),
                React.createElement("div", { className: "multi-control-wrapper" },
                    React.createElement("h4", null, "Default Values"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "databind", ref: function (scope) { _this.databindObj = scope; }, dataSource: this.records, placeholder: "e.g. Item 1", value: this.value, mode: "Default", allowFiltering: true, enableVirtualization: true, allowCustomValue: true, showDropDownIcon: true, hideSelectedItem: true, closePopupOnSelect: true, fields: this.fields, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))),
                React.createElement("div", { className: "multi-control-wrapper" },
                    React.createElement("h4", null, "Grouping"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "group", ref: function (scope) { _this.groupObj = scope; }, dataSource: this.records, placeholder: "e.g. Item 1", mode: "CheckBox", allowFiltering: true, enableVirtualization: true, enableSelectionOrder: false, allowCustomValue: true, showDropDownIcon: true, hideSelectedItem: true, closePopupOnSelect: true, fields: this.groupField, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll, ej2_react_dropdowns_1.CheckBoxSelection] }))),
                React.createElement("div", { className: "multi-control-wrapper" },
                    React.createElement("h4", null, "Template"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "Template", ref: function (scope) { _this.templateObj = scope; }, dataSource: this.records, placeholder: "e.g. Item 1", mode: "Default", allowFiltering: true, enableVirtualization: true, allowCustomValue: true, showDropDownIcon: true, hideSelectedItem: true, closePopupOnSelect: true, fields: this.fields, popupHeight: "200px", itemTemplate: this.itemTemplate, valueTemplate: this.valueTemplate, headerTemplate: this.headerTemplate },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] })))),
            React.createElement("div", { className: 'col-lg-4 property-section', style: { left: '0px', width: '250px' } },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'AllowFiltering', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'AllowCustomValue', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChangeCustom.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'HideSelectedItem', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChangeHide.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'ClosePopupOnSelect', ref: function (scope) { _this.checkboxObj = scope; }, change: this.onChangeClose.bind(this) }))))))),
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
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
