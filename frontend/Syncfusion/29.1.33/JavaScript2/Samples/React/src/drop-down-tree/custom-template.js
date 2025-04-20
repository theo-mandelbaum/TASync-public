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
exports.CustomTemplate = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./custom-template.css");
var dataSource = require("./customTemplate-data.json");
var CustomTemplate = /** @class */ (function (_super) {
    __extends(CustomTemplate, _super);
    function CustomTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.customTemplateData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
        _this.showCheckBox = true;
        _this.treeSettings = { autoCheck: true };
        _this.customTemplate = "${value.length} item(s) selected";
        return _this;
    }
    CustomTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section dropdowntree-custom' },
                React.createElement("div", { className: 'control_wapper' },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: this.fields, treeSettings: this.treeSettings, customTemplate: this.customTemplate, showCheckBox: this.showCheckBox, mode: "Custom", placeholder: "Select items", popupHeight: "200px" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains you about the custom template support of the Dropdown Tree. When you click the checkbox, the selected items will be visualized based on the given custom template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Dropdown Tree"),
                    " component allows the user to select more than one value while enabling the checkbox or multi selection support."),
                React.createElement("p", null,
                    "The user can visualize the custom template instead of the selected item texts in the Dropdown Tree by enabling the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#mode" }, "mode"),
                    " type as ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#customTemplate" }, "Custom"),
                    ". User can also customize the given template by using the ",
                    React.createElement("code", null, "customTemplate"),
                    " property."),
                React.createElement("p", null, "In this demo, the Dropdown Tree is populated with the checkbox and custom template feature."))));
    };
    return CustomTemplate;
}(sample_base_1.SampleBase));
exports.CustomTemplate = CustomTemplate;
