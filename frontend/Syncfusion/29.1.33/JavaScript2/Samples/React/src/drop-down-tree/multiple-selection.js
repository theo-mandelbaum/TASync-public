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
exports.MultiSelect = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./multiple-selection.css");
var dataSource = require("./multiSelect-data.json");
var MultiSelect = /** @class */ (function (_super) {
    __extends(MultiSelect, _super);
    function MultiSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.multiSelectData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
        _this.allowMultiSelection = true;
        return _this;
    }
    MultiSelect.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section dropdowntree-multi' },
                React.createElement("div", { className: 'control_wapper' },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: this.fields, allowMultiSelection: this.allowMultiSelection, placeholder: "Select items", popupHeight: "200px" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains you about the multiple item selection functionalities of the Dropdown Tree. To select multiple items, you may press and hold the CTRL key and then select the desired items; or select any item by selecting it and then press and hold the SHIFT key to select a range of items continuously.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Dropdown Tree"),
                    " component allows you to select multiple items by enabling the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#allowmultiselection" }, "allowMultiSelection"),
                    " property."),
                React.createElement("p", null, "In this demo, the Dropdown Tree is enabled with multiple selection."))));
    };
    return MultiSelect;
}(sample_base_1.SampleBase));
exports.MultiSelect = MultiSelect;
