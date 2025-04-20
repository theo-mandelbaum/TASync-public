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
exports.SmartImageEditor = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartImageEditor = /** @class */ (function (_super) {
    __extends(SmartImageEditor, _super);
    function SmartImageEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartImageEditor.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-image-editor/images/smart-imageeditor.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo highlights the advanced features of the Syncfusion React Image Editor, including:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "Magic Eraser:"),
                        " Users can easily remove unwanted elements from an image with precision, seamlessly blending the background for a polished finish. It's ideal for effortlessly refining images by erasing distractions."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Background Changer:"),
                        " Users can easily replace or modify the background, offering the flexibility to customize the scene while keeping the main subject intact. This feature enhances creativity in image editing."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Background Remover:"),
                        " Provides the ability to remove the background from an image, isolating the main subject. It's perfect for creating transparent backgrounds or inserting the subject into a new environment.")),
                React.createElement("p", null, "These features make the Image Editor more intuitive and sophisticated, enhancing the overall image editing experience."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "Magic Eraser:"),
                        " The Magic Eraser allows users to select and remove unwanted elements from an image with high precision. Once an area is erased, the tool automatically blends the surrounding background to create a smooth, natural look, making it ideal for cleaning up images and eliminating distractions."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Background Changer:"),
                        " The Background Changer enables users to replace or modify the existing background of an image. This feature allows for the customization of the scene while preserving the integrity of the main subject, offering a creative way to alter the context or setting of an image."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Background Remover:"),
                        " The Background Remover allows users to remove the background from an image, effectively isolating the main subject. This feature is particularly useful for creating transparent backgrounds or placing the subject onto a different backdrop, enhancing the versatility of the image.")))));
    };
    return SmartImageEditor;
}(sample_base_1.SampleBase));
exports.SmartImageEditor = SmartImageEditor;
