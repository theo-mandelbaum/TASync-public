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
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./sorting.css");
var data = require("./dataSource.json");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'Name', value: 'Category' };
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper sorting-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '60px' } },
                        React.createElement("label", null, "Select a product"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: data.products, fields: this.fields, placeholder: 'e.g. laptop', popupHeight: '230px', popupWidth: '600px', allowSorting: true, sortOrder: ej2_react_multicolumn_combobox_1.SortOrder.Ascending, sortType: 'MultiColumn' },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Name', header: 'Name', width: 110 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Price', header: 'Price', width: 70 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Availability', header: 'Availability', width: 98 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Category', header: 'Category', width: 95 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Rating', header: 'Rating', width: 70 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the sorting support in the MultiColumn ComboBox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, you can click the column header to sort/unsort the column. Any field can be selected from the Fields dropdown list and its order can be changed to display headers either in ascending or descending order. Sorting can be enabled using the ",
                    React.createElement("code", null, "allowSorting"),
                    " property and the sort order can be customized using the ",
                    React.createElement("code", null, "sortOrder"),
                    " property in the MultiColumn ComboBox."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
