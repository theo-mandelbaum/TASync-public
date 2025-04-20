"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary React and Syncfusion components
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
// Inject necessary diagram modules for snapping and editing features
ej2_react_diagrams_1.Diagram.Inject(ej2_react_diagrams_1.Snapping, ej2_react_diagrams_1.ConnectorEditing);
ej2_react_diagrams_1.Diagram.Inject(ej2_react_diagrams_1.UndoRedo);
// Declaration of global variables for diagram instance and UI components
var diagramInstance;
var checkboxObj;
var snapToObj;
var drawingNode;
var fontSize;
var fontColor;
var fontSize1;
// Creates a node with specified parameters and returns the NodeModel
function createNode(id, offsetX, offsetY, content, width, height, ports) {
    if (width === void 0) { width = 100; }
    if (height === void 0) { height = 100; }
    if (ports === void 0) { ports = []; }
    return {
        id: "node_".concat(id),
        width: width,
        height: height,
        offsetX: offsetX,
        offsetY: offsetY,
        ports: ports.map(function (port) { return (__assign(__assign({}, port), { visibility: ej2_react_diagrams_1.PortVisibility.Visible, style: { fill: 'black' }, constraints: ej2_react_diagrams_1.PortConstraints.Default | ej2_react_diagrams_1.PortConstraints.Draw })); }),
        annotations: [{
                content: content,
                offset: { x: 0.5, y: 1.2 },
                style: { bold: true },
            }],
    };
}
// Initializes the nodes to be used in the diagram
var nodes = [
    createNode('1', 350, 250, 'Shape 1', 100, 100, [
        { id: 'port1', offset: { x: 0.5, y: 0.5 } }
    ]),
    createNode('2', 650, 250, 'Shape 2', 100, 100, [
        { id: 'port11', offset: { x: 0.5, y: 0.5 } },
        { id: 'port2', offset: { x: 0, y: 0.5 }, height: 100, width: 7 }
    ]),
    createNode('3', 500, 400, 'Shape 3'),
];
// Initializes the connectors to be used in the diagram
var connectors = [
    {
        id: 'connector_1',
        sourceID: 'node_1',
        targetID: 'node_3',
        type: 'Orthogonal',
    },
];
// Defines custom user handles for interaction
var handles = [
    {
        name: 'Clone',
        pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        visible: true,
        offset: 1,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Delete',
        pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        visible: true,
        offset: 0,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Draw',
        pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        visible: true,
        offset: 0.5,
        side: 'Right',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];
// CSS styles for the property panel and diagram components
var sample_css = "\n  .row {\n    margin-left: 0px;\n    margin-right: 0px;\n  }\n    .db-prop-text-style {\n      font-size: 13px;\n      font-weight: normal;\n      font-family: 'Calibri';\n      margin-top: 25px;\n    }\n    .radio-text-style {\n      font-size: 13px;\n      font-weight: normal;\n      font-family: 'Calibri';\n      margin-top: 10px;\n    }\n    .text-content {\n      margin-left: 10px;\n    }\n    #properties_Container {\n      width: 300px;\n      float: left;\n      height: 600px;\n      margin-top: 30px;\n    }\n  .row-header {\n    font-size: 15px;\n    font-weight: 500;\n  }\n  .property-section .e-remove-selection {\n    cursor: not-allowed;\n  }\n  .property-panel-header {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }";
// Function for SnappingSample component
function SnappingSample() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render
    // Adjusts the scale of the diagram's gridlines based on the selected snapping interval.
    function adjustGridlineScale() {
        diagramInstance.snapSettings.horizontalGridlines.scaledIntervals[0] =
            fontSize.value;
        diagramInstance.snapSettings.verticalGridlines.scaledIntervals[0] =
            fontSize.value;
        diagramInstance.dataBind();
    }
    // Handle the snap constraints by checking whether the checkbox are checked or not
    function checkbox() {
        diagramInstance.snapSettings.constraints = ej2_react_diagrams_1.SnapConstraints.All;
        if (!checkboxObj.checked) {
            diagramInstance.snapSettings.constraints &= ~ej2_react_diagrams_1.SnapConstraints.ShowLines;
        }
        if (!snapToObj.checked) {
            diagramInstance.snapSettings.constraints &= ~ej2_react_diagrams_1.SnapConstraints.SnapToObject;
        }
    }
    // Handles changes in snapping options based on user input.
    function handleSnapToLinesChange(args) {
        checkbox();
        switch (args.value) {
            case 'Snap To Gridlines':
                // Enable SnapToLines constraint and adjust based on checkbox states
                diagramInstance.snapSettings.constraints |= ej2_react_diagrams_1.SnapConstraints.SnapToLines;
                break;
            case 'Snap To Horizontal Gridlines':
                // Toggle SnapToHorizontalLines constraint
                diagramInstance.snapSettings.constraints ^=
                    ej2_react_diagrams_1.SnapConstraints.SnapToVerticalLines;
                break;
            case 'Snap To Vertical Gridlines':
                // Toggle SnapToVerticalLines constraint
                diagramInstance.snapSettings.constraints ^=
                    ej2_react_diagrams_1.SnapConstraints.SnapToHorizontalLines;
                break;
            case 'None':
                // Disable all snap to line constraints
                diagramInstance.snapSettings.constraints &=
                    ~(ej2_react_diagrams_1.SnapConstraints.SnapToHorizontalLines |
                        ej2_react_diagrams_1.SnapConstraints.SnapToVerticalLines |
                        ej2_react_diagrams_1.SnapConstraints.SnapToLines);
                break;
        }
        diagramInstance.dataBind();
        adjustGridlineScale();
    }
    return (React.createElement("div", { className: "control-pane diagram-control-pane" },
        React.createElement("style", null, sample_css),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: '100%' } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '645px', nodes: nodes, drawingObject: { type: 'Orthogonal' }, connectors: connectors, selectedItems: {
                        constraints: ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                        userHandles: handles,
                    }, 
                    // Enables infinite scrolling for the diagram.
                    scrollSettings: {
                        scrollLimit: 'Infinity',
                    }, contextMenuSettings: {
                        show: true,
                    }, 
                    // Initializes the diagram with specific settings when created.
                    created: function () {
                        diagramInstance.fitToPage({ mode: 'Width' });
                    }, 
                    // Sets default styles for nodes.
                    getNodeDefaults: function (node) {
                        node.style = { fill: 'orange', strokeColor: 'orange' };
                        return node;
                    }, 
                    // Sets default constraints for connectors.
                    getConnectorDefaults: function (connector) {
                        connector.constraints =
                            ej2_react_diagrams_1.ConnectorConstraints.Default |
                                ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb;
                        return connector;
                    }, 
                    // Handles rotation changes for diagram elements.
                    rotateChange: function (args) {
                        if (args.state === 'Start' || args.state === 'Progress') {
                            diagramInstance.selectedItems = {
                                constraints: ej2_react_diagrams_1.SelectorConstraints.All & ~ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                            };
                        }
                        else if (args.state === 'Completed') {
                            diagramInstance.selectedItems = {
                                constraints: ej2_react_diagrams_1.SelectorConstraints.All | ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                                userHandles: handles,
                            };
                        }
                    }, 
                    // Defines custom actions for user handles.
                    onUserHandleMouseDown: function (args) {
                        switch (args.element.name) {
                            case 'Delete':
                                diagramInstance.remove();
                                break;
                            case 'Clone':
                                diagramInstance.paste(diagramInstance.selectedItems.selectedObjects);
                                break;
                            case 'Draw':
                                diagramInstance.drawingObject.shape = {};
                                diagramInstance.drawingObject.type = diagramInstance.drawingObject.type || 'Orthogonal';
                                diagramInstance.drawingObject.sourceID = drawingNode.id;
                                diagramInstance.dataBind();
                                break;
                        }
                    }, 
                    // Manages selection changes within the diagram.
                    selectionChange: function (args) {
                        if (args.state === 'Changed') {
                            var selectedNodes = diagramInstance.selectedItems.nodes;
                            var selectedConnectors = diagramInstance.selectedItems.connectors;
                            var selectedItems = __spreadArray(__spreadArray([], selectedNodes, true), selectedConnectors, true);
                            if (selectedItems.length > 0) {
                                if (args.newValue.length > 0 && args.newValue[0] instanceof ej2_react_diagrams_1.Node) {
                                    diagramInstance.selectedItems = {
                                        constraints: ej2_react_diagrams_1.SelectorConstraints.All | ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                                        userHandles: handles,
                                    };
                                    if (selectedNodes.length > 0) {
                                        drawingNode = selectedNodes[selectedNodes.length - 1];
                                    }
                                }
                                else {
                                    diagramInstance.selectedItems = {
                                        constraints: ej2_react_diagrams_1.SelectorConstraints.All & ~ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                                    };
                                }
                            }
                        }
                    }, snapSettings: { snapAngle: 5 } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DiagramContextMenu, ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.Snapping] })))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement("div", { id: "properties_Container" },
                React.createElement("div", { className: "property-panel-header" }, " Properties "),
                React.createElement("div", { className: "db-prop-row" },
                    React.createElement("div", { className: "db-prop-text-style" },
                        React.createElement("span", { className: "db-prop-text-style text-content" }, "Snapping Interval"),
                        React.createElement("div", { className: "db-text-input", style: { float: 'right', marginRight: '10px' } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "snappingInterval", width: 150, value: 20, min: 1, step: 1, format: "n0", 
                                // Sets the snapping interval
                                change: function (args) {
                                    diagramInstance.snapSettings.horizontalGridlines.snapIntervals[0] =
                                        args.value;
                                    diagramInstance.snapSettings.verticalGridlines.snapIntervals[0] =
                                        args.value;
                                    diagramInstance.snapSettings.horizontalGridlines.scaledIntervals[0] =
                                        args.value;
                                    diagramInstance.snapSettings.verticalGridlines.scaledIntervals[0] =
                                        args.value;
                                    diagramInstance.dataBind();
                                }, ref: function (fontsize) { return (fontSize = fontsize); } }))),
                    React.createElement("div", { className: "db-prop-text-style" },
                        React.createElement("span", { className: "db-prop-text-style text-content" }, "Snapping Angle"),
                        React.createElement("div", { className: "db-text-input", style: { float: 'right', marginRight: '10px' } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "snappingAngle", width: 150, value: 5, min: 1, step: 1, format: "n0", 
                                // Sets the snapping angle
                                change: function (args) {
                                    diagramInstance.snapSettings.snapAngle = args.value;
                                    diagramInstance.dataBind();
                                }, ref: function (fontsize) { return (fontSize1 = fontsize); } }))),
                    React.createElement("div", { className: "db-prop-text-style" },
                        React.createElement("span", { className: "db-prop-text-style text-content" }, "Snapping Line Color"),
                        React.createElement("div", { className: "db-text-input", style: { float: 'right', marginRight: '10px' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "snappingLineColor", value: "#07EDE1", mode: "Palette", showButtons: false, 
                                // Change the color of the snap lines
                                change: function (args) {
                                    diagramInstance.snapSettings.snapLineColor = args.value;
                                    diagramInstance.dataBind();
                                }, ref: function (fontcolor) { return (fontColor = fontcolor); } }))),
                    React.createElement("div", { className: "db-prop-text-style" },
                        React.createElement("div", { className: "row", style: { marginLeft: '10px' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "showGridlines", label: 'Show Gridline', checked: true, 
                                // Toggle the visibility of grid lines
                                change: function () {
                                    diagramInstance.snapSettings.constraints =
                                        diagramInstance.snapSettings.constraints ^
                                            ej2_react_diagrams_1.SnapConstraints.ShowLines;
                                    diagramInstance.dataBind();
                                    adjustGridlineScale();
                                }, ref: function (scope) { checkboxObj = scope; } }))),
                    React.createElement("div", { className: "db-prop-text-style", style: { marginTop: '7px' } },
                        React.createElement("div", { className: "row", style: { marginLeft: '10px' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "snapToObject", label: 'Snapping To Objects', checked: true, 
                                // Toggle the snapping to objects
                                change: function () {
                                    diagramInstance.snapSettings.constraints =
                                        diagramInstance.snapSettings.constraints ^
                                            ej2_react_diagrams_1.SnapConstraints.SnapToObject;
                                    diagramInstance.dataBind();
                                    adjustGridlineScale();
                                }, ref: function (scope) { snapToObj = scope; } }))),
                    React.createElement("div", { className: "db-prop-text-style" },
                        React.createElement("div", { className: "db-prop-text-style text-content", style: { fontWeight: 'bold' } }, "Snapping To Lines")),
                    React.createElement("div", { className: "row radio-text-style", style: { marginLeft: '7px' } },
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio1", name: "snapToLines", checked: true, value: "Snap To Gridlines", label: "Snap To Gridlines", change: function (args) {
                                    handleSnapToLinesChange(args);
                                } }))),
                    React.createElement("div", { className: "row radio-text-style", style: { marginLeft: '7px' } },
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio2", name: "snapToLines", value: "Snap To Horizontal Gridlines", label: "Snap To Horizontal Gridlines", change: function (args) {
                                    handleSnapToLinesChange(args);
                                } }))),
                    React.createElement("div", { className: "row radio-text-style", style: { marginLeft: '7px' } },
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio3", name: "snapToLines", value: "Snap To Vertical Gridlines", label: "Snap To Vertical Gridlines", change: function (args) {
                                    handleSnapToLinesChange(args);
                                } }))),
                    React.createElement("div", { className: "row radio-text-style", style: { marginLeft: '7px' } },
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio4", name: "snapToLines", value: "None", label: "None", change: function (args) {
                                    handleSnapToLinesChange(args);
                                } })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows how diagram objects snap to the nearest intersection of gridlines or objects while being dragged or resized.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "SnapInterval"),
                " property in snapSettings allows you to specify the interval at which objects should snap to a grid or other objects in the control."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "snapAngle"),
                " property in snapSettings allows you to define the snap angle by which the object needs to be rotated."),
            React.createElement("p", null,
                "The  ",
                React.createElement("code", null, "snapLineColor"),
                " property is used to set the color of the snap lines that appear when objects snap to a grid or other objects in the control."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "constraints"),
                " property controls the visibility of gridlines and enables or disables snapping."),
            React.createElement("br", null))));
}
exports.default = SnappingSample;
