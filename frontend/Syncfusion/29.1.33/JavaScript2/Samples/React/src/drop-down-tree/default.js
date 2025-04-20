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
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./default.css");
var dataSource = require("./default-data.json");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.defaultData, value: 'id', text: 'name', child: 'subChild' };
        return _this;
    }
    Default.prototype.onChange = function () {
        var value = document.getElementById('value');
        var text = document.getElementById('text');
        // update the text and value property values in property panel based on selected item in Dropdown Tree
        value.innerHTML = this.ddTree.value && this.ddTree.value.length > 0 ? this.ddTree.value[0] : '';
        text.innerHTML = this.ddTree.text;
    };
    // call the change event's function after initialized the component.
    Default.prototype.rendereComplete = function () {
        this.onChange();
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane dropdowntree-default' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { id: "default" },
                        React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { ref: function (dropdowntree) { _this.ddTree = dropdowntree; }, fields: this.fields, change: this.onChange.bind(this), changeOnBlur: false, placeholder: "Select a folder or file", popupHeight: "200px" }))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', style: { width: '100%', margin: '10px' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '25%' } }, "Value"),
                                    React.createElement("td", null,
                                        ":",
                                        React.createElement("span", { id: 'value', style: { paddingLeft: '10px' } }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '25%' } }, "Text"),
                                    React.createElement("td", null,
                                        ":",
                                        React.createElement("span", { id: 'text', style: { paddingLeft: '10px' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample explains you about the default functionalities of the Dropdown Tree component. Click the Dropdown Tree element, and then select an item from the hierarchical structure ",
                    React.createElement("code", null, "options"),
                    "list. The selected item's ",
                    React.createElement("code", null, "value"),
                    " and ",
                    React.createElement("code", null, "text"),
                    " property values will be shown in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Dropdown Tree"),
                    " component contains a hierarchical structure list of pre-defined values from that the user can choose a single value."),
                React.createElement("p", null,
                    "The default sample explains you about the use of Dropdown Tree that allows the end-users to select an item from the hierarchical structure ",
                    React.createElement("code", null, "options"),
                    " list. The selected item's ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#value" }, "value"),
                    " and",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#text" }, "text"),
                    " property values will be displayed in the property panel."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
