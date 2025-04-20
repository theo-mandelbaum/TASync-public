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
exports.Resize = void 0;
/**
 * DropDownList Resize Sample
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //define the resize data
        _this.temp = 'countries';
        _this.searchData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { text: 'Name', value: 'Code' };
        return _this;
    }
    Resize.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'resize' },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "country", ref: function (dropdownlist) { _this.listObj = dropdownlist; }, dataSource: this.searchData, allowResize: true, fields: this.fields, placeholder: "Select a country", popupHeight: "220px" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the custom resizing functionality of the DropDownList component. You can adjust the popup size based on your preferences, providing more control over its appearance.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Enable the resize feature of the DropDownList popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management."))));
    };
    return Resize;
}(sample_base_1.SampleBase));
exports.Resize = Resize;
