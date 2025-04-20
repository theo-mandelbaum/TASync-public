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
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.imageEditorCreated = function () {
        if (ej2_base_1.Browser.isDevice) {
            this.imgObj.open('src/image-editor/images/flower.png');
        }
        else {
            this.imgObj.open('src/image-editor/images/bridge.png');
        }
        if (this.imgObj.theme && window.location.href.split('#')[1]) {
            this.imgObj.theme = window.location.href.split('#')[1].split('/')[1];
        }
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-lg-12 control-section' },
                        React.createElement("div", { className: 'e-img-editor-sample' },
                            React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { ref: function (img) { _this.imgObj = img; }, created: this.imageEditorCreated.bind(this) }))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates Image Editor features such as crop, rotate, flip, insert shape and text.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Image Editor component provides built-in support to edit images in the following ways through APIs:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Selection"),
                        " : Multiple selection options are available. The selection region can be a square or circle, customized to various aspects ratios, and customized by dragging and resizing."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Crop"),
                        " : The image can be cropped based on the selection."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Rotate"),
                        " : The image can be rotated both clockwise and anticlockwise by 90 degrees."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Flip"),
                        " : The image can be flipped both horizontally and vertically."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Zoom"),
                        " : The image can be zoomed in and out."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Pan"),
                        " : View the entire image by toggling the pan option from the toolbar."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Freehand drawing"),
                        " : Draw freehand on the image and adjust the pen's stroke width and stroke color."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Reset"),
                        " : Revert all the edited states and load the original image."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Save"),
                        " : Save the edited image in JPEG, PNG, and SVG formats."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Annotation"),
                        " : Text, rectangle, ellipse, and line annotation shapes are supported."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Z-Order"),
                        " : Adjust the positioning of annotations to manage the layering of elements, essential for creating polished designs."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Redact"),
                        " : Redacting sensitive information in images involves covering or obscuring specific areas to make the information unreadable or unidentifiable.")),
                React.createElement("p", null,
                    "More information about Image Editor can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/' }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
