"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var imgObj = (0, react_1.useRef)(null);
    var imageEditorCreated = function () {
        if (ej2_base_1.Browser.isDevice) {
            imgObj.current.open("src/image-editor/images/flower.png");
        }
        else {
            imgObj.current.open("src/image-editor/images/default.png");
        }
        if (imgObj.current.theme && window.location.href.split("#")[1]) {
            imgObj.current.theme = window.location.href.split("#")[1].split("/")[1];
        }
    };
    // Handler used to reposition the tooltip on page scroll
    var onScroll = function () {
        if (document.getElementById("image-editor_sliderWrapper")) {
            var slider = (0, ej2_base_1.getComponent)(document.getElementById("image-editor_sliderWrapper"), "slider");
            slider.refreshTooltip(slider.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById("right-pane"))) {
        document
            .getElementById("right-pane")
            .addEventListener("scroll", onScroll.bind(_this));
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 control-section" },
                    React.createElement("div", { className: "e-img-editor-sample" },
                        React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { id: "image-editor", ref: imgObj, created: imageEditorCreated }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates Image Editor features such as crop, rotate, flip, insert annotations such as rectangle, ellipse, line, arrow, path, and text.")),
        React.createElement("div", { id: "description" },
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
                    " : Text, rectangle, ellipse, arrow, path, image, and line annotation shapes are supported."),
                React.createElement("li", null,
                    React.createElement("b", null, "Finetunes"),
                    " : The effects such as brightness, contrast, hue, sauration, and blur can be applied to the image."),
                React.createElement("li", null,
                    React.createElement("b", null, "Filters"),
                    " : The predefined filters such as chrome, cold, warm, grayscale, sepia, and invert can be applied to the image."),
                React.createElement("li", null,
                    React.createElement("b", null, "Frames"),
                    " : The predefined frames such as mat, bevel, line, hook, and inset can be applied to the image."),
                React.createElement("li", null,
                    React.createElement("b", null, "Resize"),
                    " : The image can be resized to cater to the user's preferences and needs, enhancing the adaptability and usability of the content."),
                React.createElement("li", null,
                    React.createElement("b", null, "Z-Order"),
                    " : Adjust the positioning of annotations to manage the layering of elements, essential for creating polished designs."),
                React.createElement("li", null,
                    React.createElement("b", null, "Redact"),
                    " : Redacting sensitive information in images involves covering or obscuring specific areas to make the information unreadable or unidentifiable.")),
            React.createElement("p", null,
                "More information about Image Editor can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = Default;
