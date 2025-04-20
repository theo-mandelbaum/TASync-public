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
exports.Icons = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./icons.css");
var dataSource = require("./icons-data.json");
var Icons = /** @class */ (function (_super) {
    __extends(Icons, _super);
    function Icons() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        _this.fields = { dataSource: _this.data.iconData, value: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };
        return _this;
    }
    Icons.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section dropdowntree-icons' },
                React.createElement("div", { className: 'control_wrapper' },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: this.fields, placeholder: "Select a folder or file", popupHeight: "200px", cssClass: "dropdowntree-icon" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains you about the Dropdown Tree item that can be configured by the icons or images. Click on the icon or double click on it to expand or collapse and to show the icons or images that are configured with the items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Dropdown Tree"),
                    " component has the built-in option to customize each item's appearance with the icons and images by mapping the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#iconcss" }, "iconCss"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#imageurl" }, "imageUrl"),
                    " fields."),
                React.createElement("p", null, "In this demo, the Dropdown Tree is showcased like a file system with custom icons and images."))));
    };
    return Icons;
}(sample_base_1.SampleBase));
exports.Icons = Icons;
