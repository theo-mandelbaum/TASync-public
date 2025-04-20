"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./font-icons.css");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
ej2_react_diagrams_1.Diagram.Inject(ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.BpmnDiagrams);
var diagramInstance;
var toolbarEditor;
// Function to create a text node
function createTextNode(content, offsetX, offsetY) {
    return {
        shape: { type: 'Text', content: content },
        constraints: ej2_react_diagrams_1.NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 },
        offsetX: offsetX,
        offsetY: offsetY
    };
}
// Function to create a basic or flow node
function createNode(id, offsetX, offsetY, width, height, fill, shape) {
    if (shape === void 0) { shape = 'Rectangle'; }
    return {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        width: width,
        height: height,
        style: { fill: fill, strokeColor: 'white' },
        shape: { type: 'Basic', shape: shape }
    };
}
// Initializes the nodes for the diagram
var nodes = [
    createTextNode('Select the below shapes', 150, 40),
    createNode('node1', 150, 100, 60, 40, '#DAEBFF'),
    createNode('node2', 150, 170, 80, 40, '#F5E0F7'),
    createNode('node3', 150, 240, 100, 40, '#E0E5BB'),
    createTextNode('Try Alignment Commands (AlignRight, AlignLeft and AlignCenter)', 150, 310),
    createTextNode('Select the below shapes', 150, 380),
    createNode('node4', 80, 470, 40, 60, '#DAEBFF'),
    createNode('node5', 160, 470, 40, 80, '#F5E0F7'),
    createNode('node6', 240, 470, 40, 100, '#E0E5BB'),
    createTextNode('Try Alignment Commands (AlignTop, AlignBottom and AlignMiddle)', 150, 550),
    createTextNode('Select the below shapes', 550, 40),
    createNode('node7', 475, 100, 80, 40, '#DAEBFF'),
    createNode('node8', 625, 100, 80, 40, '#F5E0F7'),
    createNode('node9', 595, 180, 80, 40, '#E0E5BB'),
    createTextNode('Try SpaceAcross Commands', 550, 240),
    createTextNode('Select the below shapes', 550, 320),
    createNode('node10', 475, 400, 80, 40, '#DAEBFF'),
    createNode('node11', 475, 500, 80, 40, '#F5E0F7'),
    createNode('node12', 625, 430, 80, 40, '#E0E5BB'),
    createTextNode('Try SpaceAcross Commands', 550, 550),
    createTextNode('Select the below shapes', 950, 40),
    createNode('RightTriangle', 950, 120, 100, 100, '#E0E5BB', 'RightTriangle'),
    createTextNode('Try Flip Commands', 950, 240),
    createTextNode('Select the below shapes', 950, 300),
    createNode('node14', 950, 350, 60, 20, '#DAEBFF'),
    createNode('node15', 950, 420, 80, 40, '#F5E0F7'),
    createNode('node16', 950, 500, 100, 50, '#E0E5BB'),
    createTextNode('Try Sizing Commands (Same height, Same width, Same size)', 950, 550)
];
// Initialize tool bar items.
var toolbarItems = [
    { prefixIcon: 'e-icons e-cut', tooltipText: 'Cut', disabled: true, id: 'cut' },
    { prefixIcon: 'e-icons e-copy', tooltipText: 'Copy', disabled: true, id: 'copy' },
    { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste', disabled: true, id: 'paste' },
    { prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', disabled: true, id: 'undo' },
    { prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', disabled: true, id: 'redo' },
    { type: 'Separator', id: 'seperator1' },
    { prefixIcon: 'sf-diagram-icon-align-left-1', tooltipText: 'Align Left', disabled: true, id: 'align_left' },
    { prefixIcon: 'sf-diagram-icon-align-center-1', tooltipText: 'Align Center', disabled: true, id: 'align_center' },
    { prefixIcon: 'sf-diagram-icon-align-right-1', tooltipText: 'Align Right', disabled: true, id: 'align_right' },
    { prefixIcon: 'sf-diagram-icon-align-top-1', tooltipText: 'Align Top', disabled: true, id: 'align_top' },
    { prefixIcon: 'sf-diagram-icon-align-middle-1', tooltipText: 'Align Middle', disabled: true, id: 'align_middle' },
    { prefixIcon: 'sf-diagram-icon-align-bottom-1', tooltipText: 'Align Bottom', disabled: true, id: 'align_bottom' },
    { type: 'Separator', id: 'seperator2' },
    { prefixIcon: 'e-icons e-transform-right', tooltipText: 'Rotate Right', disabled: true, id: 'transform_right' },
    { prefixIcon: 'e-icons e-transform-left', tooltipText: 'Rotate Left', disabled: true, id: 'transform_left' },
    { type: 'Separator', id: 'seperator3' },
    { prefixIcon: 'e-icons e-flip-vertical', tooltipText: 'Flip Vertical', disabled: true, id: 'flip_vertical' },
    { prefixIcon: 'e-icons e-flip-horizontal', tooltipText: 'Flip Horizontal', disabled: true, id: 'flip_horizontal' },
    { type: 'Separator', id: 'seperator4' },
    { prefixIcon: 'sf-diagram-icon-distribute-horizontal', tooltipText: 'Distribute Objects Horizontally', disabled: true, id: 'distribute_horizontal' },
    { prefixIcon: 'sf-diagram-icon-distribute-vertical', tooltipText: 'Distribute Objects Vertically', disabled: true, id: 'distribute_vertical' },
    { type: 'Separator', id: 'seperator5' },
    { prefixIcon: 'sf-diagram-icon-same-width', tooltipText: 'Same Width', disabled: true, id: 'same_width' },
    { prefixIcon: 'sf-diagram-icon-same-height', tooltipText: 'Same Height', disabled: true, id: 'same_height' },
    { prefixIcon: 'sf-diagram-icon-same-size', tooltipText: 'Same Size', disabled: true, id: 'same_size' },
];
function CommandsSample() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Handle history entry change in the diagram
    function historyChange(args) {
        // Update toolbar items based on undo/redo stack availability
        updateToolbarItems(['undo'], diagramInstance.historyManager.undoStack.length === 0);
        updateToolbarItems(['redo'], diagramInstance.historyManager.redoStack.length === 0);
    }
    // Handle selection change in the diagram to enable/disable toolbar items
    function selectionChange(args) {
        // Update toolbar items based on the selected elements
        if (args.state === 'Changed') {
            var selectedItems = args.newValue;
            if (args.type === 'Addition' && selectedItems.length > 0) {
                enableToolbarItems(selectedItems);
            }
            else {
                disableToolbarItems();
            }
        }
    }
    // Enable specific toolbar items based on the selection state
    function enableToolbarItems(selectedItems) {
        // Enable relevant toolbar items based on the number and type of selected nodes
        disableToolbarItems();
        updateToolbarItems(['cut', 'copy', 'transform_left', 'transform_right'], false);
        if (selectedItems.length === 1) {
            if (selectedItems[0].id === "RightTriangle") {
                updateToolbarItems(['flip_horizontal', 'flip_vertical'], false);
            }
        }
        else if (selectedItems.length > 1) {
            updateToolbarItems(['align_left', 'align_center', 'align_right', 'align_top', 'align_middle', 'align_bottom', 'distribute_horizontal', 'distribute_vertical', 'same_width', 'same_height', 'same_size'], false);
        }
    }
    // Disable all toolbar items.
    function disableToolbarItems() {
        updateToolbarItems(['cut', 'copy', 'align_left', 'align_center', 'align_right', 'align_top', 'align_middle', 'align_bottom', 'transform_left', 'transform_right', 'flip_vertical', 'flip_horizontal', 'distribute_horizontal', 'distribute_vertical', 'same_width', 'same_height', 'same_size'], true);
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
    // Handle toolbar item click event.
    function toolbarClick(args) {
        var item = args.item.tooltipText;
        switch (item) {
            case 'Cut':
                diagramInstance.cut();
                updateToolbarItems(['paste'], false);
                break;
            case 'Copy':
                diagramInstance.copy();
                updateToolbarItems(['paste'], false);
                break;
            case 'Paste':
                diagramInstance.paste();
                break;
            case 'Undo':
                diagramInstance.undo();
                break;
            case 'Redo':
                diagramInstance.redo();
                break;
            case 'Align Left':
            case 'Align Right':
            case 'Align Top':
            case 'Align Bottom':
            case 'Align Middle':
            case 'Align Center':
                var alignType = item.split(' ')[1];
                diagramInstance.align(alignType);
                break;
            case 'Rotate Right':
                diagramInstance.rotate(diagramInstance.selectedItems, 90);
                break;
            case 'Rotate Left':
                diagramInstance.rotate(diagramInstance.selectedItems, -90);
                break;
            case 'Flip Vertical':
            case 'Flip Horizontal':
                flipObjects(item);
                break;
            case 'Distribute Objects Horizontally':
                diagramInstance.distribute('RightToLeft');
                break;
            case 'Distribute Objects Vertically':
                diagramInstance.distribute('BottomToTop');
                break;
            case 'Same Width':
            case 'Same Height':
            case 'Same Size':
                var sizeType = item.split(' ')[1];
                diagramInstance.sameSize(sizeType, diagramInstance.selectedItems.nodes);
                break;
        }
    }
    // Flip selected objects.
    function flipObjects(flipType) {
        var flipDirection = flipType === 'Flip Horizontal' ? ej2_react_diagrams_1.FlipDirection.Horizontal : ej2_react_diagrams_1.FlipDirection.Vertical;
        for (var _i = 0, _a = diagramInstance.selectedItems.nodes; _i < _a.length; _i++) {
            var selectedObject = _a[_i];
            selectedObject.flip ^= flipDirection;
        }
        diagramInstance.dataBind();
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "db-toolbar-container" },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (toolbar) { return (toolbarEditor = toolbar); }, id: "toolbar_diagram", clicked: toolbarClick, items: toolbarItems, overflowMode: 'Scrollable', width: '100%' })),
            React.createElement("div", { style: { width: '100%' } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '800px', rulerSettings: { showRulers: true }, nodes: nodes, historyChange: function (args) {
                        historyChange(args);
                    }, selectionChange: function (args) {
                        selectionChange(args);
                    } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.BpmnDiagrams] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates the various commands supported in the diagram control.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The align commands enable you to align selected objects such as nodes and connectors with respect to the selection boundary. The alignment options are left, right, center, middle, top, and bottom. Use the ",
                React.createElement("code", null, "align"),
                " method with the four mentioned parameters to align objects."),
            React.createElement("p", null,
                "The sizing command changes the size of selected nodes with respect to the first selected object. The sizing options are same size (same height and width), same width, and same height. Use the ",
                React.createElement("code", null, "sameSize"),
                " method and pass ",
                React.createElement("code", null, "SizingOptions"),
                " such as height, width, and size as a parameter in it."),
            React.createElement("p", null,
                "The distribute command is used to equally space the nodes vertically or horizontally within the selected boundary. Use the ",
                React.createElement("code", null, "distribute"),
                " method with the ",
                React.createElement("code", null, "DistributeOptions"),
                " as the parameter."),
            React.createElement("p", null,
                "The clipboard commands are used to cut, copy, or paste   selected elements. The ",
                React.createElement("code", null, "cut"),
                " command removes the selected diagram elements and copies them to the clipboard; ",
                React.createElement("code", null, "copy"),
                " duplicates the selected diagram elements and copies them to the clipboard; and ",
                React.createElement("code", null, "paste"),
                " adds diagram elements from the clipboard to the diagram. The flip command is used to give a horizontal or vertical mirror image of the selected node. Use ",
                React.createElement("code", null, "flip"),
                " and ",
                React.createElement("code", null, "flipMode"),
                " properties to flip a node along with the port and label."),
            React.createElement("br", null))));
}
exports.default = CommandsSample;
