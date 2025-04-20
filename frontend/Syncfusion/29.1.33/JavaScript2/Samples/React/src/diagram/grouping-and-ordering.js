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
exports.GroupandOrder = void 0;
// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building diagrams.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
require("./font-icons.css"); // Importing CSS for font icons
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
// Holds instances of DiagramComponent, ToolbarComponent, and HTMLElements for palette icons and spaces.
var diagramInstance;
var toolbarEditor;
var paletteIconInstance;
var paletteSpaceInstance;
// Creates a basic shape node for the diagram.
var createNode = function (id, offsetX, offsetY, width, height, shape, annotations, cornerRadius) {
    if (annotations === void 0) { annotations = []; }
    if (cornerRadius === void 0) { cornerRadius = 0; }
    return ({
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        width: width,
        height: height,
        shape: { type: "Basic", shape: shape, cornerRadius: cornerRadius },
        annotations: annotations,
    });
};
// Creates a group node for organizing multiple nodes.
var createGroupNode = function (id, children, padding, annotations) { return ({
    id: id,
    children: children,
    padding: padding,
    annotations: annotations
}); };
// Initializes nodes representing key elements in a diagram.
var nodes = [
    createNode('Diamond', 350, 250, 100, 100, 'Diamond', [{ content: 'Decision' }]),
    createNode('ellipse', 150, 250, 100, 60, 'Ellipse', [{ content: 'Start/Stop' }]),
    createNode('rectangle', 150, 400, 100, 60, 'Rectangle', [{ content: 'Process' }]),
    createNode('node1', 150, 100, 100, 55, 'Rectangle'),
    createNode('node2', 350, 100, 90, 55, 'Rectangle', [], 5),
    createGroupNode('group', ['node1', 'node2'], { left: 10, right: 10, top: 10, bottom: 10 }, [{ content: 'Group 1' }])
];
// Creates basic shapes for the symbol palette.
var createBasicShape = function (id, shape) { return ({
    id: id,
    shape: { type: "Basic", shape: shape },
    style: { strokeWidth: 2 }
}); };
// Initializes basic shapes for use in the symbol palette.
var basicShapes = [
    createBasicShape('Rectangle', 'Rectangle'),
    createBasicShape('Ellipse', 'Ellipse'),
    createBasicShape('Hexagon', 'Hexagon'),
    createBasicShape('Parallelogram', 'Parallelogram'),
    createBasicShape('Triangle', 'Triangle'),
    createBasicShape('Plus', 'Plus'),
    createBasicShape('Star', 'Star'),
    createBasicShape('Pentagon', 'Pentagon'),
    createBasicShape('Heptagon', 'Heptagon'),
    createBasicShape('Octagon', 'Octagon'),
    createBasicShape('Trapezoid', 'Trapezoid'),
    createBasicShape('Decagon', 'Decagon'),
    createBasicShape('RightTriangle', 'RightTriangle'),
    createBasicShape('Cylinder', 'Cylinder'),
    createBasicShape('Diamond', 'Diamond')
];
// Initializes user handles for interaction with diagram elements.
var handles = [
    {
        name: 'Clone',
        pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        tooltip: { content: 'Clone' },
        visible: true,
        offset: 1,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Delete',
        pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        tooltip: { content: 'Delete' },
        visible: true,
        offset: 0,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Draw',
        pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        tooltip: { content: 'Draw' },
        visible: true,
        offset: 0.5,
        side: 'Right',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];
// Variables for managing diagram drawing state and font properties.
var drawingNode;
var fontColor;
var fontFamily;
var fontSize;
var fontType = [
    { type: 'Arial', text: 'Arial' },
    { type: 'Aharoni', text: 'Aharoni' },
    { type: 'Bell MT', text: 'Bell MT' },
    { type: 'Fantasy', text: 'Fantasy' },
    { type: 'Segoe UI', text: 'Segoe UI' },
    { type: 'Times New Roman', text: 'Times New Roman' },
    { type: 'Verdana', text: 'Verdana' },
];
var fields = { value: 'type', text: 'text' };
// CSS styles for the sample application's layout and appearance.
var sample_css = "\n/* For toolbar size */\n.db-toolbar-container {\n    width: 100% ;\n   height: 44px;\n}\n\n/* Palette Container */\n.db-palette-parent {\n    background-color:#fafafa;\n    width: 255px!important;\n    float: left;\n    height:calc(100% - 28px);\n}\n\n/* Diagram Container */\n.db-diagram-container {\n    width:calc(100% - 260px);\n    height: 100%;\n    float: right;\n}\n/* For making toolbar selection */\n.e-toolbar .e-toolbar-items .e-toolbar-item.tb-item-selected .e-tbar-btn.e-btn,\n.e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.tb-item-selected {\n    background: #5f6161;\n}\n\n/* Toolbar icons color */\n.e-toolbar .e-toolbar-items .e-toolbar-item.tb-item-selected .e-tbar-btn .e-icons.e-btn-icon,\n.e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.tb-item-selected .e-btn-icon {\n    color: #ffffff;\n}";
// Initialize toolbar items with icons, tooltips, and other properties.
var toolbarItems = [
    { prefixIcon: 'e-icons e-group-1', tooltipText: 'Group', disabled: true, id: 'Group' },
    { prefixIcon: 'e-icons e-ungroup-1', tooltipText: 'UnGroup', disabled: true, id: 'UnGroup' },
    { type: 'Separator' },
    { prefixIcon: 'e-icons e-bring-forward', tooltipText: 'Bring Forward', disabled: true, id: 'BringForward' },
    { prefixIcon: 'e-icons e-bring-to-front', tooltipText: 'Bring To Front', disabled: true, id: 'BringToFront' },
    { prefixIcon: 'e-icons e-send-backward', tooltipText: 'Send Backward', disabled: true, id: 'SendBackward' },
    { prefixIcon: 'e-icons e-send-to-back', tooltipText: 'Send To Back', disabled: true, id: 'SendToBack' },
    { type: 'Separator' },
    { id: 'FontStyle', type: 'Input', align: 'Left', tooltipText: 'Font Style', disabled: true, template: renderFontFamilyDropdown },
    { id: 'FontSize', tooltipText: 'Font Size', align: 'Left', disabled: true, template: renderFontSizeNumericBox },
    { prefixIcon: 'e-icons e-bold', tooltipText: 'Bold', cssClass: 'tb-item-start', disabled: true, id: 'Bold' },
    { prefixIcon: 'e-icons e-italic', tooltipText: 'Italic', cssClass: 'tb-item-middle', disabled: true, id: 'Italic' },
    { prefixIcon: 'e-icons e-underline', tooltipText: 'Underline', cssClass: 'tb-item-end', disabled: true, id: 'Underline' },
    { id: 'FontColor', tooltipText: 'Font Color', align: 'Left', disabled: true, template: renderFontColorPicker }
];
var GroupandOrder = /** @class */ (function (_super) {
    __extends(GroupandOrder, _super);
    function GroupandOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Called when the component rendering is complete.
    GroupandOrder.prototype.renderComplete = function () {
        initializeMobileEvents();
    };
    // Renders the component UI.
    GroupandOrder.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { style: { width: '100%' } },
                    React.createElement("div", { className: "db-toolbar-container" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (toolbar) { return (toolbarEditor = toolbar); }, id: "toolbar_diagram", clicked: handleToolbarClick, items: toolbarItems })),
                    React.createElement("div", { className: "sb-mobile-palette-bar" },
                        React.createElement("div", { id: "paletteIcon", ref: function (paletteIcon) { return (paletteIconInstance = paletteIcon); }, style: { float: 'right' }, className: "e-ddb-icons1 e-toggle-palette" })),
                    React.createElement("div", { id: "paletteSpace", ref: function (paletteSpace) { return (paletteSpaceInstance = paletteSpace); }, className: "db-palette-parent" },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", 
                            // Initialize a default shape in symbol palettes
                            palettes: [
                                {
                                    id: 'Basic',
                                    expanded: true,
                                    symbols: basicShapes,
                                    title: 'Basic Shapes',
                                },
                            ], width: '100%', height: '500px', symbolHeight: 50, symbolWidth: 50, symbolMargin: { left: 5, right: 5, top: 5, bottom: 10 } })),
                    React.createElement("div", { id: "diagram-space", className: "db-diagram-container" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '500px', selectedItems: { constraints: ej2_react_diagrams_1.SelectorConstraints.UserHandle, userHandles: handles }, rulerSettings: { showRulers: true }, onUserHandleMouseDown: function (args) { onUserHandleMouseDown(args); }, selectionChange: function (args) { selectionChange(args); }, drawingObject: { type: 'Orthogonal' }, nodes: nodes })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how to group, ungroup, and order commands with the diagram.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "group"),
                    " method groups diagram nodes and connectors into a single entity."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "unGroup"),
                    " method ungroups nodes and/or connectors that have been previously grouped together using the group method."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "moveForward"),
                    " and ",
                    React.createElement("code", null, "bringToFront"),
                    " methods adjust the visual order of nodes or connectors within a diagram. This method takes a single parameter that specifies the node or connector that you want to bring forward in the order."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "sendBackward"),
                    " and ",
                    React.createElement("code", null, "sendToBack"),
                    " method allows you to send a selected object to the back of the z-order (the order in which objects are stacked on top of one another)."),
                React.createElement("p", null, "In this sample, node annotation styles such as font family, font size, bold, italic, underline, and fontcolor can be customized."),
                React.createElement("br", null))));
    };
    return GroupandOrder;
}(sample_base_1.SampleBase));
exports.GroupandOrder = GroupandOrder;
var isMobile;
// Checks and applies mobile-specific behaviors.
function initializeMobileEvents() {
    // Check if device is mobile
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile && paletteIconInstance) {
        paletteIconInstance.addEventListener('click', openPalette, false);
    }
}
// Toggles the palette's visibility on mobile devices.
function openPalette() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpaceInstance.classList.contains('sb-mobile-palette-open')) {
            // Open palette
            paletteSpaceInstance.classList.add('sb-mobile-palette-open');
        }
        else {
            // Close palette
            paletteSpaceInstance.classList.remove('sb-mobile-palette-open');
        }
    }
}
// Executes actions based on the toolbar item clicked.
function handleToolbarClick(args) {
    // Switch based on the tooltip text of the item
    switch (args.item.tooltipText) {
        // Group selected items
        case 'Group':
            diagramInstance.group();
            updateToolbarItems(['Group'], true);
            updateToolbarItems(['UnGroup'], false);
            break;
        // Ungroup selected items
        case 'UnGroup':
            diagramInstance.unGroup();
            break;
        // Bring selected item(s) forward
        case 'Bring Forward':
            diagramInstance.moveForward();
            break;
        // Bring selected item(s) to front
        case 'Bring To Front':
            diagramInstance.bringToFront();
            break;
        // Send selected item(s) backward
        case 'Send Backward':
            diagramInstance.sendBackward();
            break;
        // Send selected item(s) to back
        case 'Send To Back':
            diagramInstance.sendToBack();
            break;
        // Toggle bold style for selected annotation(s)
        case 'Bold':
            updateAnnotationValue('bold', args.value, null);
            break;
        // Toggle italic style for selected annotation(s)
        case 'Italic':
            updateAnnotationValue('italic', args.value, null);
            break;
        // Toggle underline style for selected annotation(s)
        case 'Underline':
            updateAnnotationValue('underline', args.value, null);
            break;
    }
    diagramInstance.dataBind();
}
// Updates annotation style attributes based on the provided value.
function updateAnnotationValue(value, fontSize, fontFamily) {
    // Iterate through selected nodes in the diagram
    for (var i = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
        var node = diagramInstance.selectedItems.nodes[i];
        // Iterate through annotations of each node
        for (var j = 0; j < node.annotations.length; j++) {
            var annotationStyle = node.annotations[j].style;
            // Update style attributes based on the provided value
            if (value === 'fontsize') {
                annotationStyle.fontSize = fontSize;
            }
            else if (value === 'fontfamily') {
                annotationStyle.fontFamily = fontFamily.toString();
            }
            else if (value === 'bold') {
                annotationStyle.bold = !annotationStyle.bold;
            }
            else if (value === 'italic') {
                annotationStyle.italic = !annotationStyle.italic;
            }
            else if (value === 'underline') {
                annotationStyle.textDecoration = annotationStyle.textDecoration === 'None' ? 'Underline' : 'None';
            }
        }
    }
    diagramInstance.dataBind();
}
// Handles custom user interactions with diagram elements.
function onUserHandleMouseDown(args) {
    switch (args.element.name) {
        case 'Delete':
            // Remove selected elements
            diagramInstance.remove();
            break;
        case 'Clone':
            // Clone selected elements
            diagramInstance.paste(diagramInstance.selectedItems.selectedObjects);
            break;
        case 'Draw':
            // Sets drawing mode and source ID for drawing elements
            var drawingObject = diagramInstance.drawingObject;
            drawingObject.shape = {};
            drawingObject.type = drawingObject.type || 'Orthogonal';
            drawingObject.sourceID = drawingNode.id;
            diagramInstance.dataBind();
            break;
    }
}
// Updates toolbar items based on diagram selection changes.
function selectionChange(args) {
    if (args.state === 'Changed') {
        var selectedItems = diagramInstance.selectedItems.nodes;
        selectedItems = selectedItems.concat(diagramInstance.selectedItems.connectors);
        // Define toolbar item IDs for easy management
        var toolbarItemIds = ['Group', 'UnGroup', 'BringForward', 'BringToFront', 'SendBackward', 'SendToBack', 'FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];
        // Disabling toolbar items when no items are selected
        if (selectedItems.length === 0) {
            updateToolbarItems(toolbarItemIds, true);
        }
        // Handling single item selection
        else if (selectedItems.length === 1) {
            enableToolbarItems();
            disableToolbarItemsForMultiSelection(selectedItems);
            // Enabling or disabling specific toolbar items based on selection type
            var isGroup = selectedItems[0].children !== undefined && selectedItems[0].children.length > 0;
            updateToolbarItems(['UnGroup'], !isGroup);
        }
        // Handling multiple items selection
        else if (selectedItems.length > 1) {
            enableToolbarItems();
            updateToolbarItems(['Group'], false);
            updateToolbarItems(['UnGroup'], true);
            disableToolbarItemsForMultiSelection(selectedItems);
        }
        // Handling specific scenarios when nodes are selected
        if (args.newValue.length > 0 && args.newValue[0] instanceof ej2_react_diagrams_1.Node) {
            diagramInstance.selectedItems = {
                constraints: ej2_react_diagrams_1.SelectorConstraints.All | ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                userHandles: handles,
            };
            // Manipulating selected nodes and their properties
            if (diagramInstance.selectedItems.nodes.length > 0) {
                drawingNode = diagramInstance.selectedItems.nodes[diagramInstance.selectedItems.nodes.length - 1];
            }
        }
        else {
            // Resetting selection constraints when other types are selected
            diagramInstance.selectedItems = {
                constraints: ej2_react_diagrams_1.SelectorConstraints.All & ~ej2_react_diagrams_1.SelectorConstraints.UserHandle,
            };
        }
    }
}
// Enable or disable specific toolbar items
function updateToolbarItems(itemIds, disabled) {
    itemIds.forEach(function (itemId) {
        var item = toolbarEditor.items.find(function (item) { return item.id === itemId; });
        if (item) {
            item.disabled = disabled;
        }
    });
}
// Enables specific toolbar items.
function enableToolbarItems() {
    updateToolbarItems(['BringForward', 'BringToFront', 'SendBackward', 'SendToBack'], false);
}
// Disables toolbar items for multi-selected elements without annotations.
function disableToolbarItemsForMultiSelection(selectedItems) {
    var annotationRelatedItems = ['FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];
    // Iterate through selected items
    for (var i = 0; i < selectedItems.length; i++) {
        // Check if the selected item has annotations
        if (selectedItems[i].annotations[0] !== undefined) {
            // Enable toolbar items for annotation-related functionalities
            updateToolbarItems(annotationRelatedItems, false);
        }
        else {
            // Disable toolbar items for annotation-related functionalities
            updateToolbarItems(annotationRelatedItems, true);
        }
    }
}
// Renders a dropdown for font family selection.
function renderFontFamilyDropdown() {
    return (React.createElement("div", { className: "col-xs-4 column-style", style: { marginLeft: '4px' } },
        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "fontfamily", popupWidth: 150, width: '150px', fields: fields, placeholder: 'select a font type', index: 0, dataSource: fontType, change: function (args) {
                updateAnnotationValue('fontfamily', null, args.value.toString());
            }, ref: function (fontfamily) { return (fontFamily = fontfamily); } })));
}
// Renders a numeric textbox for font size selection.
function renderFontSizeNumericBox() {
    return (React.createElement("div", { className: "col-xs-4 column-style" },
        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "fontSize", width: '110px', value: 12, min: 1, max: 30, step: 2, format: "##.##", change: function (args) {
                updateAnnotationValue('fontsize', args.value);
            }, ref: function (fontsize) { return (fontSize = fontsize); } })));
}
// Renders a color picker for font color selection.
function renderFontColorPicker() {
    return (React.createElement("div", { className: "col-xs-4 column-style" },
        React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "fontcolor", value: "#000", mode: "Palette", change: function (arg) {
                diagramInstance.selectedItems.nodes.forEach(function (node) {
                    node.annotations.forEach(function (annotation) {
                        annotation.style.color = arg.currentValue.rgba;
                    });
                });
                diagramInstance.dataBind();
            }, ref: function (fontcolor) { return (fontColor = fontcolor); } })));
}
