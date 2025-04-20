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
exports.Filtering = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./filtering.css");
var dataSource = require("./filtering-data.json");
var Filtering = /** @class */ (function (_super) {
    __extends(Filtering, _super);
    function Filtering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.filterData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
        return _this;
    }
    Filtering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section dropdowntree-filtering' },
                React.createElement("div", { className: 'control_wapper' },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "filter", filterBarPlaceholder: 'Search', allowFiltering: true, fields: this.fields, placeholder: "Select an item", popupHeight: "220px" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the filtering functionalities of the Dropdown Tree. Click the Dropdown Tree element, and then type a character in the search box. It will display the filtered list items based on the typed characters.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Dropdown Tree has the built-in support to filter the data source when the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#allowfiltering" }, "allowFiltering"),
                    " is enabled. It performs when the characters are typed in the search box."))));
    };
    return Filtering;
}(sample_base_1.SampleBase));
exports.Filtering = Filtering;
