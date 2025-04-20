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
exports.RTL = void 0;
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./rtl.css");
var data = require("./dataSource.json");
var RTL = /** @class */ (function (_super) {
    __extends(RTL, _super);
    function RTL() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'Title', value: 'Author' };
        return _this;
    }
    RTL.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper rtl-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '60px' } },
                        React.createElement("label", null, "Select a title"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: data.bookDetails, fields: this.fields, placeholder: 'e.g. The Hobbit', popupHeight: '230px', popupWidth: '680px', enableRtl: true },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Title', header: 'Title', width: 180 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Author', header: 'Author', width: 150 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Genre', header: 'Genre', width: 100 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'PublishedYear', header: 'Published Year', width: 125 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Price', header: 'Price', width: 80 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the RTL support in the MultiColumn ComboBox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiColumn ComboBox has the support to enable the right-to-left (RTL) text direction when the ",
                    React.createElement("code", null, "enableRtl"),
                    " property is enabled."))));
    };
    return RTL;
}(sample_base_1.SampleBase));
exports.RTL = RTL;
