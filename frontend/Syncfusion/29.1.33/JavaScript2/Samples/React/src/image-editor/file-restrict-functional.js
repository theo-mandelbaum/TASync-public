"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./file-restrict.css");
ej2_react_dropdowns_1.MultiSelectComponent.Inject(ej2_react_dropdowns_1.CheckBoxSelection);
var FileRestrict = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var imgObj = (0, react_1.useRef)(null);
    // States for file restrictions
    var _a = (0, react_1.useState)(1), minFileSize = _a[0], setMinFileSize = _a[1];
    var _b = (0, react_1.useState)(100), maxFileSize = _b[0], setMaxFileSize = _b[1];
    var _c = (0, react_1.useState)([".jpeg", ".jpg", ".png", ".svg", ".webp"]), allowedExtensions = _c[0], setAllowedExtensions = _c[1];
    var _d = (0, react_1.useState)('KB'), fileSizeUnit = _d[0], setFileSizeUnit = _d[1];
    var fileExtensionsList = [
        { Name: "JPEG", Value: ".jpeg" },
        { Name: "JPG", Value: ".jpg" },
        { Name: "PNG", Value: ".png" },
        { Name: "SVG", Value: ".svg" },
        { Name: "WebP", Value: ".webp" }
    ];
    var units = [
        { text: "MB" },
        { text: "KB" },
    ];
    var convertToBytes = function (value) {
        return value * (fileSizeUnit === "MB" ? 1024 * 1024 : 1024);
    };
    // Update Image Editor upload settings
    var updateUploadSettings = function () {
        if (imgObj.current) {
            imgObj.current.uploadSettings = {
                minFileSize: convertToBytes(minFileSize),
                maxFileSize: convertToBytes(maxFileSize),
                allowedExtensions: allowedExtensions.join(', '),
            };
            imgObj.current.dataBind();
        }
    };
    var onSelect = function (e) {
        setFileSizeUnit(e.item.text);
        updateUploadSettings();
    };
    var beforeItemRender = function (args) {
        if (args.item.text === fileSizeUnit) {
            args.element.classList.add('e-selected');
        }
    };
    var onCreated = function () {
        updateUploadSettings();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 control-section" },
                    React.createElement("div", { style: { textAlign: 'center' } },
                        React.createElement("div", { className: "e-img-editor-dropdown-container" },
                            React.createElement("label", null, "Size As"),
                            React.createElement("br", null),
                            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "dropdownbtn", items: units, content: fileSizeUnit, select: onSelect, beforeItemRender: beforeItemRender })),
                        React.createElement("div", { className: "e-img-editor-numeric-textbox-container" },
                            React.createElement("label", null, "Minimum Size"),
                            React.createElement("br", null),
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: "180px", value: minFileSize, min: minFileSize, change: function (e) {
                                    setMinFileSize(e.value);
                                    updateUploadSettings();
                                } })),
                        React.createElement("div", { className: "e-img-editor-numeric-textbox-container" },
                            React.createElement("label", null, "Maximum Size"),
                            React.createElement("br", null),
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: "180px", value: maxFileSize, min: minFileSize, change: function (e) {
                                    setMaxFileSize(e.value);
                                    updateUploadSettings();
                                } })),
                        React.createElement("div", { className: "e-img-editor-dropdown-container" },
                            React.createElement("label", null, "Allowed Extensions"),
                            React.createElement("br", null),
                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { dataSource: fileExtensionsList, fields: { text: 'Name', value: 'Value' }, mode: "CheckBox", showSelectAll: true, value: allowedExtensions, width: "210px", change: function (e) {
                                    if (e.value.length === 0) {
                                        setAllowedExtensions([".jpeg", ".jpg", ".png", ".svg", ".webp"]);
                                    }
                                    else {
                                        setAllowedExtensions(e.value);
                                    }
                                    updateUploadSettings();
                                } }))),
                    React.createElement("div", { className: "e-img-editor-sample" },
                        React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { id: "image-editor", ref: imgObj, uploadSettings: {
                                minFileSize: convertToBytes(minFileSize),
                                maxFileSize: convertToBytes(maxFileSize),
                                allowedExtensions: allowedExtensions.join(', ')
                            }, created: onCreated }))))),
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
exports.default = FileRestrict;
