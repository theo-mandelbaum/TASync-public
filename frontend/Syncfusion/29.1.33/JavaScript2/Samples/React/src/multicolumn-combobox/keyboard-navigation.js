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
exports.Keyboard = void 0;
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./keyboard-navigation.css");
var data = require("./dataSource.json");
var Keyboard = /** @class */ (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Keyboard.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper keyboard-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '60px' } },
                        React.createElement("label", null, "Select a product"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: data.productDetails, fields: this.fields, placeholder: 'Select any product', popupHeight: '230px', popupWidth: '530px' },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'ProductID', header: 'Product ID', width: 100 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'ProductName', header: 'Product Name', width: 200 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'UnitPrice', header: 'UnitPrice', width: 90 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'UnitsInStock', header: 'Units In Stock', width: 120 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates keyboard navigations support in the MultiColumn Combobox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "To provide users with the ability to navigate, select, and interact with popup data in a MultiColumn ComboBox using keyboard shortcuts for improved accessibility."),
                React.createElement("p", null, "Keyboards Actions :"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Enter"),
                        "-  Select the focused item and close the popup."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Esc"),
                        "- Close the popup."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Alt + Down Arrow"),
                        "- Open the popup."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Alt + Up Arrow"),
                        "- Close the popup."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Up Arrow"),
                        "- Select the previous item."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Down Arrow"),
                        "- Select the next item."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Home"),
                        "- Select the first item."),
                    React.createElement("li", null,
                        React.createElement("code", null, "End"),
                        "- Select the last item."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Tab"),
                        "- Select the focused item, close the popup, and move to the next focusable element."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Shift + Tab"),
                        "- Select the focused item, close the popup, and move to the previous focusable element.")))));
    };
    return Keyboard;
}(sample_base_1.SampleBase));
exports.Keyboard = Keyboard;
