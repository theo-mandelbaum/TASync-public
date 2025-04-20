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
exports.Checkbox = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
require("./checkbox.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var dataSource = require("./checkbox-data.json");
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.checkboxData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
        _this.showCheckBox = true;
        return _this;
    }
    Checkbox.prototype.onChange = function (args) {
        this.ddtreeObj.treeSettings.autoCheck = args.checked;
    };
    Checkbox.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section dropdowntree-check' },
                React.createElement("div", { className: 'control_wapper' },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: this.fields, ref: function (scope) { _this.ddtreeObj = scope; }, showCheckBox: this.showCheckBox, mode: "Delimiter", placeholder: "Select items", popupHeight: "200px" }))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "check", label: 'Auto Check', change: this.onChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains you about the CheckBox functionalities of the Dropdown Tree. Click on any parent item's CheckBox to check or uncheck the item and its child items. The parent item's checked state will be determined by its child item\u2019s checked state.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Dropdown Tree"),
                    " component can be rendered with the checkbox on the left side of each tree item. This allows the user to check more than one item, and this can be enabled by the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#showcheckbox" }, "showCheckBox"),
                    "property."),
                React.createElement("p", null, "In this demo, the Dropdown Tree is populated with the checkbox enabled feature."))));
    };
    return Checkbox;
}(sample_base_1.SampleBase));
exports.Checkbox = Checkbox;
