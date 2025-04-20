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
 * AutoComplete Custom Resize Sample
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./resize.css");
var data = require("./dataSource.json");
var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'booksData';
        _this.booksData = data[_this.temp];
        // maps the appropriate column to fields property
        _this.fields = { value: 'BookName' };
        // set true for enable the resize property to autocomplete 
        _this.allowResize = true;
        return _this;
    }
    Resize.prototype.render = function () {
        return (React.createElement("div", { id: 'autocustom', className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'resize' },
                    React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "books", dataSource: this.booksData, allowResize: this.allowResize, fields: this.fields, placeholder: "e.g. Node.js Succinctly" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the custom resizing functionality of the AutoComplete component. You can adjust the popup size based on your preferences, providing more control over its appearance.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Enable the resize feature of the AutoComplete popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management."))));
    };
    return Resize;
}(sample_base_1.SampleBase));
exports.Resize = Resize;
