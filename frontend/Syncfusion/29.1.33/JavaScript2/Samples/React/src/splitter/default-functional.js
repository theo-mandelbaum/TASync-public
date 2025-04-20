"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
require("./splitter.component.css");
/**
 * Splitter Basic rendering
 */
var Basic = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // horizontal Splitter content
    var hPaneContent1 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("div", null,
                " Left pane",
                React.createElement("div", { id: 'panetext' }, "size: 25%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    var hPaneContent2 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Middle pane",
                React.createElement("div", { id: 'panetext' }, "size: 50%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    var hPaneContent3 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Right pane",
                React.createElement("div", { id: 'panetext' }, "size: 25%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    // vertical Splitter content.
    var vPaneContent1 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Top pane",
                React.createElement("div", { id: 'panetext' }, "size: 30%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    var vPaneContent2 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Middle pane",
                React.createElement("div", { id: 'panetext' }, "size: 40%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    var vPaneContent3 = function () {
        return (React.createElement("div", { className: "splitter-content" },
            React.createElement("span", null,
                "Bottom pane",
                React.createElement("div", { id: 'panetext' }, "size: 30%"),
                React.createElement("div", { id: 'panetext' }, "min: 60px"))));
    };
    return (React.createElement("div", { id: "defaultSplitter", className: "control-section" },
        React.createElement("div", { className: "pane1" },
            React.createElement("div", { id: "pane-heading" }, "Horizontal Splitter"),
            React.createElement(ej2_react_layouts_1.SplitterComponent, { height: "110px", width: "100%", separatorSize: 4 },
                React.createElement(ej2_react_layouts_1.PanesDirective, null,
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: "25%", min: "60px", content: hPaneContent1 }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: "50%", min: "60px", content: hPaneContent2 }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: "25%", min: "60px", content: hPaneContent3 })))),
        React.createElement("div", { className: "pane2" },
            React.createElement("div", { id: "pane-heading" }, "Vertical Splitter"),
            React.createElement(ej2_react_layouts_1.SplitterComponent, { height: "240px", width: "100%", orientation: "Vertical", separatorSize: 4 },
                React.createElement(ej2_react_layouts_1.PanesDirective, null,
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: "30%", min: "60px", content: vPaneContent1 }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: "40%", min: "60px", content: vPaneContent2 }),
                    React.createElement(ej2_react_layouts_1.PaneDirective, { size: "30%", min: "60px", content: vPaneContent3 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This example demonstrates the default functionalities of the ",
                React.createElement("code", null, "Splitter"),
                " control. To resize panes and increase the dimension of a pane, drag a separator (divider) bar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The split panes of the Splitter control can be oriented horizontally or vertically using the Orientation property.",
                React.createElement("ul", null,
                    React.createElement("li", null, "Set orientation property to Horizontal to create horizontal splitter, which align panels left-to-right."),
                    React.createElement("li", null, "Set orientation property to Vertical to create vertical splitter, which align panels top-to-bottom.")),
                "The splitter allows resizing its panes when the drag separator (divider) bar is used to increase its dimension."))));
};
exports.default = Basic;
