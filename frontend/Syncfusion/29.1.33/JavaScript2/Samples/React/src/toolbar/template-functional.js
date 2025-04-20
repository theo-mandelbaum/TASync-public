"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./toolbar.component.css");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = ["25%", "50%", "75%", "100%"];
    var textboxObj = (0, react_1.useRef)(null);
    var numeric = function () {
        return (React.createElement("div", { style: { display: 'flex' } },
            React.createElement("div", null,
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: 45, value: 0, min: 0, max: 100, showSpinButton: false, format: '###.##' })),
            React.createElement("span", { className: 'total-page' }, "of 100")));
    };
    var dropDown = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: 80, popupWidth: 80, value: '100%', dataSource: data, showClearButton: false })));
    };
    var textBox = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: textboxObj, placeholder: 'Find Text', created: onCreate })));
    };
    var onCreate = function () {
        textboxObj.current.addIcon('prepend', 'e-icons e-search');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section tbar-control-section' },
            React.createElement("div", { className: 'control toolbar-sample tbar-sample', style: { margin: '150px 0', width: '100%', maxWidth: '100%' } },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { overflowMode: 'Popup', cssClass: 'template' },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-folder', tooltipText: 'Open File', text: 'Open', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-first-page', tooltipText: 'Show first page', text: 'First', showTextOn: 'Overflow', align: "Left", disabled: true }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-left', tooltipText: 'Show previous page', text: 'Previous', showTextOn: 'Overflow', align: "Left", disabled: true }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-right', tooltipText: 'Show next page', text: 'Next', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-last-page', tooltipText: 'Show last page', text: 'Last', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: 'page-count', template: numeric, align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-zoom-out', tooltipText: 'Zoom-Out', text: 'Zoom-Out', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-zoom-in', tooltipText: 'Zoom-In', text: 'Zoom-In', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: 'percentage', type: "Input", template: dropDown, align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-mouse-pointer', tooltipText: 'Text selection tool', text: 'Selection', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-pan', tooltipText: 'Pan mode', text: 'Pan mode', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', text: 'Undo', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', text: 'Redo', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-pv-comment-icon', tooltipText: 'Add Comments', text: 'Add Comments', showTextOn: 'Overflow', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Submit Form', align: "Left" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: 'find', type: "Input", template: textBox, overflow: "Show", align: "Right" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-annotation-edit', tooltipText: 'Edit Annotations', text: 'Edit', showTextOn: 'Overflow', align: "Right" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-print', tooltipText: 'Print File', text: 'Print', showTextOn: 'Overflow', align: "Right" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-download', tooltipText: 'Download', text: 'Download', showTextOn: 'Overflow', align: "Right" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates customization of the React Toolbar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, the React Toolbar showcases customization options for toolbar items using the ",
                React.createElement("code", null, "template"),
                " property. The Toolbar items are arranged using the ",
                React.createElement("code", null, "align"),
                " property."),
            React.createElement("p", null,
                "To add icons to the toolbar items, the ",
                React.createElement("code", null, "prefixIcon"),
                " property is used. When the ",
                React.createElement("code", null, "showTextOn"),
                " property's is set to ",
                React.createElement("code", null, "overflow"),
                ", the Toolbar items' ",
                React.createElement("code", null, "text"),
                " that overflows will be visible."),
            React.createElement("p", null,
                "In this demo, ",
                React.createElement("code", null, "NumericTextBox"),
                ", ",
                React.createElement("code", null, "ComboBox"),
                " and ",
                React.createElement("code", null, "TextBox"),
                " are used inside the Toolbar ."))));
};
exports.default = Template;
