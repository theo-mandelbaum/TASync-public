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
var sample_base_1 = require("../common/sample-base");
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
    // call the change event's function after initialized the component.
    Default.prototype.rendereComplete = function () {
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { id: "dropdowndefault", className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "local" },
                        React.createElement("h4", null, " Local Data"),
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "localdata", dataSource: this.records, placeholder: "e.g. Item 1", allowFiltering: false, enableVirtualization: true, fields: this.fields, popupHeight: "200px" },
                            React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] })))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "remote" },
                        React.createElement("h4", null, "Remote Data"),
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "remotedata", dataSource: this.customerData, placeholder: "OrderId", allowFiltering: true, enableVirtualization: true, fields: this.customerField, popupHeight: "200px" },
                            React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] })))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "remote" },
                        React.createElement("h4", null, "Grouping"),
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "groupdata", dataSource: this.records, placeholder: "e.g. Item 1", allowFiltering: true, enableVirtualization: true, fields: this.groupField, popupHeight: "200px" },
                            React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the virtualization support of the DropDownList. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DropDownList"),
                    " component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the ",
                    React.createElement("code", null, "enableVirtualization"),
                    " property to true. When virtualization is enabled, DropDownList doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling. Virtualization works with both local and remote data."),
                React.createElement("p", null,
                    "To perform the virtualization feature in the DropDownList, the ",
                    React.createElement("code", null, "VirtualScroll"),
                    " module has to be injected at the application level."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
