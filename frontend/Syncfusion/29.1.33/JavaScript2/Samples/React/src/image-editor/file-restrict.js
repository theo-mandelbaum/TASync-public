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
exports.FileRestrict = void 0;
var React = require("react");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./file-restrict.css");
ej2_react_dropdowns_1.MultiSelectComponent.Inject(ej2_react_dropdowns_1.CheckBoxSelection);
var FileRestrict = /** @class */ (function (_super) {
    __extends(FileRestrict, _super);
    function FileRestrict() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minFileSize = 1;
        _this.maxFileSize = 100;
        _this.allowedExtensions = ".jpeg, .jpg, .png, .svg, .webp";
        _this.fileSizeUnit = 'MB';
        _this.fileExtensionsList = [
            { Name: "JPEG", Value: ".jpeg" },
            { Name: "JPG", Value: ".jpg" },
            { Name: "PNG", Value: ".png" },
            { Name: "SVG", Value: ".svg" },
            { Name: "WebP", Value: ".webp" }
        ];
        _this.units = [
            { text: "MB" },
            { text: "KB" },
        ];
        _this.updateUploadSettings = function () {
            if (_this.imgObj) {
                _this.imgObj.uploadSettings = {
                    minFileSize: _this.convertToBytes(_this.minFileSize),
                    maxFileSize: _this.convertToBytes(_this.maxFileSize),
                    allowedExtensions: _this.allowedExtensions
                };
                _this.imgObj.dataBind();
            }
        };
        _this.onSelect = function (e) {
            _this.fileSizeUnit = e.item.text;
            _this.updateUploadSettings();
        };
        _this.beforeItemRender = function (e) {
            if (e.itemData.text === _this.fileSizeUnit) {
                e.element.classList.add('e-selected');
            }
        };
        _this.onCreated = function () {
            _this.updateUploadSettings();
        };
        return _this;
    }
    FileRestrict.prototype.convertToBytes = function (value) {
        return value * (this.fileSizeUnit === "MB" ? 1024 * 1024 : 1024);
    };
    FileRestrict.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-12 control-section" },
                        React.createElement("div", { style: { textAlign: 'center' } },
                            React.createElement("div", { className: "e-img-editor-dropdown-container" },
                                React.createElement("label", null, "Size As"),
                                React.createElement("br", null),
                                React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "dropdownbtn", items: this.units, content: this.fileSizeUnit, select: this.onSelect, beforeItemRender: this.beforeItemRender })),
                            React.createElement("div", { className: "e-img-editor-numeric-textbox-container" },
                                React.createElement("label", null, "Minimum Size"),
                                React.createElement("br", null),
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.minFileSize, min: this.minFileSize, width: "180px", change: function (e) {
                                        _this.minFileSize = e.value;
                                        _this.updateUploadSettings();
                                    } })),
                            React.createElement("div", { className: "e-img-editor-numeric-textbox-container" },
                                React.createElement("label", null, "Maximum Size"),
                                React.createElement("span", null, " (in Bytes)"),
                                React.createElement("br", null),
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: this.maxFileSize, min: this.minFileSize, width: "180px", change: function (e) {
                                        _this.maxFileSize = e.value;
                                        _this.updateUploadSettings();
                                    } })),
                            React.createElement("div", { className: "e-img-editor-dropdown-container" },
                                React.createElement("label", null, "Allowed File Extensions"),
                                React.createElement("br", null),
                                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { dataSource: this.fileExtensionsList, fields: { text: 'Name', value: 'Value' }, mode: "CheckBox", showSelectAll: true, value: this.allowedExtensions.split(', '), change: function (e) {
                                        if (e.value.length === 0) {
                                            _this.allowedExtensions = ".jpeg, .jpg, .png, .svg, .webp";
                                        }
                                        else {
                                            _this.allowedExtensions = e.value.join(', ');
                                        }
                                        _this.updateUploadSettings();
                                    } }))),
                        React.createElement("div", { className: "e-img-editor-sample" },
                            React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { id: "image-editor", ref: function (img) { _this.imgObj = img; }, uploadSettings: {
                                    minFileSize: this.convertToBytes(this.minFileSize),
                                    maxFileSize: this.convertToBytes(this.maxFileSize),
                                    allowedExtensions: this.allowedExtensions
                                }, created: this.onCreated }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the file restriction feature in the Image Editor component, allowing customization of file extensions, minimum and maximum file sizes, and drag-and-drop functionality.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample highlights the enhanced configuration capabilities of the Image Editor component through the ",
                    React.createElement("b", null, "uploadSettings"),
                    " property. The following features are included:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "File Extensions"),
                        ": Use a multi-select dropdown with checkboxes to dynamically choose the allowed file extensions. Supported values include ",
                        React.createElement("code", null, "jpeg"),
                        ", ",
                        React.createElement("code", null, "jpg"),
                        ", ",
                        React.createElement("code", null, "png"),
                        ", ",
                        React.createElement("code", null, "svg"),
                        ", and ",
                        React.createElement("code", null, "webp"),
                        "."),
                    React.createElement("li", null,
                        React.createElement("b", null, "File Size"),
                        ": Numeric textboxes to set minimum and maximum file sizes dynamically."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Dynamic Updates"),
                        ": Changes made to the numeric textboxes or the dropdown options immediately reflect in the component's ",
                        React.createElement("code", null, "uploadSettings"),
                        "."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Upload Settings"),
                        ": Predefined settings include:",
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("b", null, "Allowed Extensions"),
                                ": ",
                                React.createElement("code", null, ".jpeg"),
                                ", ",
                                React.createElement("code", null, ".png"),
                                ", ",
                                React.createElement("code", null, ".svg"),
                                ", ",
                                React.createElement("code", null, ".webp")),
                            React.createElement("li", null,
                                React.createElement("b", null, "Minimum File Size"),
                                ": 1 KB"),
                            React.createElement("li", null,
                                React.createElement("b", null, "Maximum File Size"),
                                ": 100 KB")))))));
    };
    return FileRestrict;
}(sample_base_1.SampleBase));
exports.FileRestrict = FileRestrict;
