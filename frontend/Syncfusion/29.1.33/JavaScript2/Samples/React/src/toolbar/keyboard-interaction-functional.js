"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./toolbar.component.css");
var KeyboardInteraction = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        document.body.addEventListener("keydown", function (e) {
            var toolbarElement = document.querySelector('.e-toolbar-items .e-toolbar-item .e-tbar-btn');
            if (e.altKey && e.keyCode === 74 && toolbarElement) {
                toolbarElement.focus();
            }
        });
    }, []);
    var toolbarObj = (0, react_1.useRef)(null);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section tbar-control-section' },
            React.createElement("div", { className: 'control toolbar-sample tbar-sample', style: { margin: '25px 0' } },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { overflowMode: 'Popup', ref: toolbarObj },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut', text: 'Cut', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold', text: 'Bold', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline', text: 'Underline', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic', text: 'Italic', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'Bullets', overflow: 'Show', text: 'Bullets' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'Numbering', overflow: 'Show', text: 'Numbering' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-undo-icon tb-icons', tooltipText: 'Undo', text: 'Undo' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-tbar-redo-icon tb-icons', tooltipText: 'Redo', text: 'Redo' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'Align_Left', text: 'Left', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'Align_Right', text: 'Right', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'Align_Center', text: 'Center', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'Align_Justify', text: 'justify', showTextOn: 'Overflow', overflow: 'Show' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-radar-icon tb-icons', text: 'Radar', tooltipText: 'Radar Chart', showTextOn: 'Overflow' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-line-icon tb-icons', text: 'Line', tooltipText: 'Line Chart', showTextOn: 'Overflow' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-doughnut-icon tb-icons', text: 'Doughnut', tooltipText: 'Doughnut Chart', showTextOn: 'Overflow' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bubble-icon tb-icons', text: 'Bubble', tooltipText: 'Bubble Chart', showTextOn: 'Overflow' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-table-icon tb-icons', text: 'Table', tooltipText: 'Table Chart', showTextOn: 'Overflow' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-picture-icon tb-icons', text: 'Picture', tooltipText: 'Picture Chart', showTextOn: 'Overflow' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-design-icon tb-icons', text: 'Design', tooltipText: 'Design Chart', showTextOn: 'Overflow' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This demo showcases the keyboard shortcuts applicable on ",
                React.createElement("code", null, "Toolbar"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("i", null, "Below key combinations can be used in Toolbar to initiate various actions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "FOCUS"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "J")),
                            React.createElement("span", null, " - Focuses on the first component of the sample.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "TOOLBAR ITEMS"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - Moves the focus to the first item of the Toolbar.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - Moves the focus to the last item of the Toolbar.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - Focuses the next popup element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - Focuses the previous popup element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - Focuses the previous element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - Focuses the next element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, "- When focused on a ToolBar command, clicking the key triggers the click of Toolbar element. When popup drop-down icon is focused, the popup opens.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Esc")),
                            React.createElement("span", null, " - Closes popup."))))))));
};
exports.default = KeyboardInteraction;
