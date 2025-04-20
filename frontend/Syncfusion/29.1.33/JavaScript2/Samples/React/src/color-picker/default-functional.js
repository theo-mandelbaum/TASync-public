"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'default-control' },
                React.createElement("h4", null, "Choose a color"),
                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'color-picker' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the color picker/palette with default colors and predefined styles.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The ColorPicker component is a user interface to select and adjust color values. This supports various color specifications like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes."),
            React.createElement("p", null,
                "In this sample, the ColorPicker popup contains picker area, slider to adjust hue and opacity value, input textarea, and control buttons.",
                React.createElement("ul", null,
                    React.createElement("li", null, "Drag the handle in the picker area to select your favorite color."),
                    React.createElement("li", null, "You can manually set the color by typing the color values in the input text boxes."),
                    React.createElement("li", null, "By clicking the format switching icon at the right side of the input text area, switch between palette and picker mode."),
                    React.createElement("li", null, "By clicking the mode switching icon at the left bottom of the popup, switch between palette and picker mode."),
                    React.createElement("li", null,
                        "Using the",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/color-picker/#value" },
                            React.createElement("code", null, "value")),
                        " property, set the color value to picker and palette initially.")),
                React.createElement("p", null, "In mobile mode, the popup opens at the center of the viewport."),
                React.createElement("p", null,
                    "More information about ColorPicker can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/color-picker/getting-started" }, " documentation section"),
                    ".")))));
};
exports.default = Default;
