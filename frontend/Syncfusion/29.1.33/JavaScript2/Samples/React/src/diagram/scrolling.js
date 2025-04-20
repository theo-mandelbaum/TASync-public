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
exports.ScrollingSample = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
require("./font-icons.css");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
ej2_react_diagrams_1.Diagram.Inject(ej2_react_diagrams_1.UndoRedo);
//Initialize the basicshapes for the symbol palatte
var basicShapes = [
    {
        id: 'rectangle',
        shape: { type: 'Basic', shape: 'Rectangle' },
    },
    {
        id: 'ellipse',
        shape: { type: 'Basic', shape: 'Ellipse' },
    },
    {
        id: 'triangle',
        shape: { type: 'Basic', shape: 'Triangle' },
    },
    {
        id: 'plus',
        shape: { type: 'Basic', shape: 'Plus' },
    },
    {
        id: 'star',
        shape: { type: 'Basic', shape: 'Star' },
    },
    {
        id: 'pentagon',
        shape: { type: 'Basic', shape: 'Pentagon' },
    },
    {
        id: 'heptagon',
        shape: { type: 'Basic', shape: 'Heptagon' },
    },
    {
        id: 'octagon',
        shape: { type: 'Basic', shape: 'Octagon' },
    },
    {
        id: 'trapezoid',
        shape: { type: 'Basic', shape: 'Trapezoid' },
    },
    {
        id: 'decagon',
        shape: { type: 'Basic', shape: 'Decagon' },
    },
    {
        id: 'rightTriangle',
        shape: { type: 'Basic', shape: 'RightTriangle' },
    },
    {
        id: 'parallelogram',
        shape: { type: 'Basic', shape: 'Parallelogram' },
    },
];
//Initialize the flowshapes for the symbol palette
var flowShapes = [
    { id: 'terminator1', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'process1', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'extract1', shape: { type: 'Flow', shape: 'Extract' } },
    { id: 'manualOperation1', shape: { type: 'Flow', shape: 'ManualOperation' } },
    { id: 'merge1', shape: { type: 'Flow', shape: 'Merge' } },
    {
        id: 'offPageReference1',
        shape: { type: 'Flow', shape: 'OffPageReference' },
    },
    {
        id: 'sequentialAccessStorage1',
        shape: { type: 'Flow', shape: 'SequentialAccessStorage' },
    },
    { id: 'annotation1', shape: { type: 'Flow', shape: 'Annotation' } },
    { id: 'annotation21', shape: { type: 'Flow', shape: 'Annotation2' } },
    { id: 'data1', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'summingJunction1', shape: { type: 'Flow', shape: 'SummingJunction' } },
    { id: 'or1', shape: { type: 'Flow', shape: 'Or' } },
    { id: 'internalStorage1', shape: { type: 'Flow', shape: 'InternalStorage' } },
    { id: 'card1', shape: { type: 'Flow', shape: 'Card' } },
    { id: 'delay1', shape: { type: 'Flow', shape: 'Delay' } },
    { id: 'decision1', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'document1', shape: { type: 'Flow', shape: 'Document' } },
    {
        id: 'preDefinedProcess1',
        shape: { type: 'Flow', shape: 'PreDefinedProcess' },
    },
    { id: 'paperTap1', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'directData1', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'sequentialData1', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'sort1', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'multiDocument1', shape: { type: 'Flow', shape: 'MultiDocument' } },
    { id: 'collate1', shape: { type: 'Flow', shape: 'Collate' } },
];
//Initialize the connector for the symbol palatte 
var connectorSymbols = [
    {
        id: "orthogonal",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { style: { fill: '#757575' } },
    },
    {
        id: "Orthogonal",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "None" },
    },
    {
        id: "straight",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { style: { fill: '#757575' } },
    },
    {
        id: "Straight",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "bezier",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "None" }
    }
];
var sample_css = "\n  \n  .diagram-scroll .db-text-input {\n      width: calc(100% - 15px);\n      padding: 2px 2px 0px 0px;\n  }\n  \n  .diagram-scroll .row{\n    margin-right:-15px;\n    margin-left:-15px;\n  }";
var diagramInstance;
var fontFamily;
var scrollableDivInstance;
var autoScrollDivInstance;
var paletteIconInstance;
var paletteSpaceInstance;
var fields = { text: 'text', value: 'value' };
var scrollLimitDatasource = [
    { text: 'Infinity', value: 'Infinity' },
    { text: 'Diagram', value: 'Diagram' },
    { text: 'Limited', value: 'Limited' },
];
var scrollableArea = new ej2_react_diagrams_1.Rect(0, 0, 1500, 1500);
var ScrollingSample = /** @class */ (function (_super) {
    __extends(ScrollingSample, _super);
    function ScrollingSample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollingSample.prototype.renderComplete = function () {
        addEvents();
    };
    ScrollingSample.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-scroll" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { style: { width: '100%' } },
                    React.createElement("div", { className: "sb-mobile-palette-bar" },
                        React.createElement("div", { id: "palette-icon", ref: function (paletteIcon) { return (paletteIconInstance = paletteIcon); }, style: { float: 'right' }, className: "e-ddb-icons1 e-toggle-palette" })),
                    React.createElement("div", { id: "palette-space", ref: function (paletteSpace) { return (paletteSpaceInstance = paletteSpace); }, className: "sb-mobile-palette", style: { width: '20%', float: 'left' } },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Single", palettes: [
                                {
                                    id: 'basic',
                                    expanded: true,
                                    symbols: basicShapes,
                                    iconCss: 'e-diagram-icons1 e-diagram-basic',
                                    title: 'Basic Shapes',
                                },
                                {
                                    id: 'flow',
                                    expanded: false,
                                    symbols: flowShapes,
                                    iconCss: 'e-diagram-icons1 e-diagram-flow',
                                    title: 'Flow Shapes',
                                },
                                {
                                    id: "connectors",
                                    expanded: false,
                                    symbols: connectorSymbols,
                                    iconCss: "e-diagram-icons1 e-diagram-connector",
                                    title: "Connectors"
                                }
                            ], width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60, getConnectorDefaults: getConnectorDefaults, getNodeDefaults: function (symbol) {
                                var obj = symbol;
                                if (obj.id === 'terminator1' || obj.id === 'process1') {
                                    obj.width = 80;
                                    obj.height = 40;
                                }
                                else if (obj.id === 'decision1' ||
                                    obj.id === 'document1' ||
                                    obj.id === 'preDefinedProcess1' ||
                                    obj.id === 'paperTap1' ||
                                    obj.id === 'directData1' ||
                                    obj.id === 'multiDocument1' ||
                                    obj.id === 'data1') {
                                    obj.width = 50;
                                    obj.height = 40;
                                }
                                else {
                                    obj.width = 50;
                                    obj.height = 50;
                                }
                                obj.style.strokeColor = '#757575';
                            }, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, getSymbolInfo: function (symbol) {
                                return { fit: true };
                            } })),
                    React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram", style: { width: '59%', float: 'left' } },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '700px', rulerSettings: { showRulers: true }, pageSettings: { width: 1500, height: 1500 }, scrollSettings: {
                                scrollLimit: 'Infinity',
                                canAutoScroll: true,
                                autoScrollBorder: { left: 30, right: 30, top: 30, bottom: 30 },
                                scrollableArea: scrollableArea,
                            }, getConnectorDefaults: getConnectorDefaults, created: function () {
                                var scrollElement = scrollableDivInstance;
                                scrollElement.className = 'disabledbutton';
                            }, 
                            //Sets the Node style for DragEnter element.
                            dragEnter: function (args) {
                                var obj = args.element;
                                if (obj instanceof ej2_react_diagrams_1.Node) {
                                    var oWidth = obj.width;
                                    var oHeight = obj.height;
                                    var ratio = 100 / obj.width;
                                    obj.width = 100;
                                    obj.height *= ratio;
                                    obj.offsetX += (obj.width - oWidth) / 2;
                                    obj.offsetY += (obj.height - oHeight) / 2;
                                    obj.style = { fill: '#357BD2', strokeColor: 'white' };
                                    obj.annotations = [
                                        { style: { color: 'white', fill: 'transparent' } },
                                    ];
                                }
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] }))),
                    React.createElement("div", { id: "properties", style: { width: '20%', float: 'right' } },
                        React.createElement("div", { className: "property-panel-header" }, "Properties"),
                        React.createElement("div", { className: "row db-prop-row" },
                            React.createElement("div", { className: "col-xs-5 db-col-right db-prop-text-style", style: { paddingTop: '14px' } },
                                React.createElement("span", { className: "db-prop-text-style db-spacing-text" }, "Scroll Limit")),
                            React.createElement("div", { className: "col-xs-7 db-col-left", style: { paddingTop: '10px', paddingRight: '0px' } },
                                React.createElement("div", { className: "db-text-input" },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "scrollLimit", fields: fields, value: 'Infinity', dataSource: scrollLimitDatasource, change: function (args) {
                                            var element = scrollableDivInstance;
                                            element.className =
                                                args.value === 'Limited' ? '' : 'disabledbutton';
                                            diagramInstance.scrollSettings.scrollLimit = args.value;
                                        }, ref: function (fontfamily) { return (fontFamily = fontfamily); } })))),
                        React.createElement("div", { id: "scrollableDiv", ref: function (scrollableDiv) { return (scrollableDivInstance = scrollableDiv); } },
                            React.createElement("div", { className: "property-panel-header" }, "Scrollable Area"),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6", style: { paddingRight: '15px', width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", { className: "texstyle", style: { display: 'block' } }, "X")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "x", value: "10", change: function (args) {
                                                diagramInstance.scrollSettings.scrollableArea.x =
                                                    Number(args.value);
                                            } })))),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6", style: { paddingRight: '15px', width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", { className: "texstyle", style: { width: 'fit-content' } }, "Y")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "y", value: "10", change: function (args) {
                                                diagramInstance.scrollSettings.scrollableArea.y =
                                                    Number(args.value);
                                            } })))),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6 db-col-left", style: { width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", { className: "texstyle" }, "Width")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "width", value: "1500", change: function (args) {
                                                diagramInstance.scrollSettings.scrollableArea.width =
                                                    Number(args.value);
                                            } })))),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6 db-col-right", style: { width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", { className: "texstyle" }, "Height")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "height", value: "10", change: function (args) {
                                                diagramInstance.scrollSettings.scrollableArea.height =
                                                    Number(args.value);
                                            } }))))),
                        React.createElement("div", { style: { paddingTop: '5px', marginTop: '20px' } },
                            React.createElement("div", { style: { float: 'left' } }, "Enable AutoScroll"),
                            React.createElement("div", { style: { float: 'left', marginLeft: '10px' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "EnableScroll", checked: true, change: function (args) {
                                        var autoScrollElement = autoScrollDivInstance;
                                        if (args.checked) {
                                            autoScrollElement.className = '';
                                            diagramInstance.scrollSettings.canAutoScroll = true;
                                        }
                                        else {
                                            autoScrollElement.className = 'disabledbutton';
                                            diagramInstance.scrollSettings.canAutoScroll = false;
                                        }
                                    } }))),
                        React.createElement("div", { id: "autoScrollDiv", style: { marginTop: '30px' }, ref: function (autoScrollDiv) { return (autoScrollDivInstance = autoScrollDiv); } },
                            React.createElement("div", { className: "property-panel-header" }, "AutoScroll border"),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6 db-col-left", style: { width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", null, "Left")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "left", value: "30", change: function (args) {
                                                diagramInstance.scrollSettings.autoScrollBorder.left =
                                                    Number(args.value);
                                            } })))),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6 db-col-right", style: { width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", null, "Top")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "top", value: "30", change: function (args) {
                                                diagramInstance.scrollSettings.autoScrollBorder.top =
                                                    Number(args.value);
                                            } })))),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6 db-col-left", style: { width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", null, "Right")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "right", value: "30", change: function (args) {
                                                diagramInstance.scrollSettings.autoScrollBorder.right =
                                                    Number(args.value);
                                            } })))),
                            React.createElement("div", { className: "row db-prop-row", style: { paddingTop: '10px' } },
                                React.createElement("div", { className: "col-xs-6 db-col-right", style: { width: '175px' } },
                                    React.createElement("div", { style: { width: '40%', float: 'left', marginTop: '5px' } },
                                        React.createElement("span", null, "Bottom")),
                                    React.createElement("div", { style: {
                                            width: '60%',
                                            float: 'right',
                                            paddingLeft: '20px',
                                        } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "bottom", value: "30", change: function (args) {
                                                diagramInstance.scrollSettings.autoScrollBorder.bottom =
                                                    Number(args.value);
                                            } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates how to scroll a diagram using vertical and horizontal scrollbars. The scroll limit property helps limit the scrolling area.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The scroll limit allows you to define the scrollable region of the Diagram while scrolling the page with a mouse."),
                React.createElement("p", null,
                    "The scrollSettings ",
                    React.createElement("code", null, "scrollLimit"),
                    " property allows you to define the scrollable region of a Diagram. You may scroll inside the designated region if the scrollLimit is set to ",
                    React.createElement("code", null, "limited"),
                    ". When the scrollLimit is set to ",
                    React.createElement("code", null, "Diagram"),
                    ", you can scroll within the Diagram content. When the scrollLimit is set to ",
                    React.createElement("code", null, "Infinity"),
                    ", it allows infinite scrolling."),
                React.createElement("p", null,
                    "The scrollSettings ",
                    React.createElement("code", null, "autoScrollBorder"),
                    " property is used to specify the distance from the edge of a control at which auto-scrolling should occur."),
                React.createElement("br", null))));
    };
    return ScrollingSample;
}(sample_base_1.SampleBase));
exports.ScrollingSample = ScrollingSample;
var isMobile;
//To enhance the functionality of a webpage for mobile devices by adding a click event listener 
function addEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        var paletteIcon = paletteIconInstance;
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
//To manage the visibility state of the palette space on a webpage for mobile devices
function openPalette() {
    var paletteSpace = paletteSpaceInstance;
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        }
        else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}
//Sets the default values for a connector
var color = '#757575';
function getConnectorDefaults(connector) {
    connector.style.strokeWidth = 1;
    connector.style.strokeColor = color;
    connector.targetDecorator.style.fill = color;
    connector.targetDecorator.style.strokeColor = color;
}
