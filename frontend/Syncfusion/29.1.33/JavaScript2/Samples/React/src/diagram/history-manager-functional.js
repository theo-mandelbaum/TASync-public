"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
// CSS for the history property section
var SAMPLE_CSS = "#historyPropertySection .row {\n            margin-left: 0px;\n            margin-right: 0px;\n        }\n        #historyControlSection.content-wrapper {\n            border: 1px solid #D7D7D7;\n        }\n\n        #historyPropertySection .listbox {\n            width: 100%;\n            height: 50%;\n        }\n\n        #historyPropertySection .property-panel-content div:not(.heading) {\n         padding: 0px;\n        }\n\n        #historyPropertySection .heading {\n            color: #4e4949;\n            font-size: 15px;\n            height: 50px;\n            width: 100%;\n            border-bottom: 1px solid #d9dedd;\n            padding: 10px;\n        }";
// Helper function to create a NodeModel with default parameters
function createNode(id, offsetX, offsetY, fill, strokeColor, shape, content, width, height, ports) {
    if (width === void 0) { width = 70; }
    if (height === void 0) { height = 40; }
    if (ports === void 0) { ports = []; }
    return {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        style: { fill: fill, strokeColor: strokeColor },
        width: width,
        height: height,
        shape: { type: 'Flow', shape: shape },
        annotations: [{ content: content }],
        ports: ports
    };
}
// Initialize Diagram Nodes using the createNode function
var nodes = [
    createNode('node1', 400, 30, '#FFB2B2', '#FFB2B2', 'Terminator', 'Start'),
    createNode('node2', 400, 100, '#DCDCDC', '#DCDCDC', 'Process', 'Design', undefined, undefined, [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]),
    createNode('node3', 400, 180, '#DCDCDC', '#DCDCDC', 'Process', 'Coding', undefined, undefined, [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]),
    createNode('node4', 400, 260, '#DCDCDC', '#DCDCDC', 'Process', 'Testing'),
    createNode('node5', 400, 340, '#A2D8B0', '#A2D8B0', 'Decision', 'Errors?', 80, 60),
    createNode('node6', 400, 430, '#FFB2B2', '#FFB2B2', 'Terminator', 'End'),
    createNode('node7', 220, 180, '#A2D8B0', '#A2D8B0', 'Decision', 'Design Error?', 100, 60, [
        { id: 'porterror', offset: { x: 0.5, y: 0 } },
        { id: 'portcoding', offset: { x: 1, y: 0.5 } },
        { id: 'portdesign', offset: { x: 0.5, y: 1 } }
    ])
];
// Helper function to create a ConnectorModel with default parameters
function createConnector(id, sourceID, targetID, annotations, segments, sourcePortID, targetPortID) {
    if (segments === void 0) { segments = []; }
    if (sourcePortID === void 0) { sourcePortID = ''; }
    if (targetPortID === void 0) { targetPortID = ''; }
    return {
        id: id,
        sourceID: sourceID,
        targetID: targetID,
        annotations: annotations,
        type: 'Orthogonal',
        segments: segments,
        sourcePortID: sourcePortID,
        targetPortID: targetPortID
    };
}
// Common labels for connectors
var noLabel = [{ content: 'No', style: { fill: 'white' } }];
var yesLabel = [{ content: 'Yes', style: { fill: 'white' } }];
// Initialize Diagram Connectors using the createConnector function
var connectors = [
    createConnector('connector1', 'node1', 'node2', []),
    createConnector('connector2', 'node2', 'node3', []),
    createConnector('connector3', 'node3', 'node4', []),
    createConnector('connector4', 'node4', 'node5', []),
    createConnector('connector5', 'node5', 'node6', noLabel),
    createConnector('connector6', 'node5', 'node7', yesLabel, [{ type: 'Orthogonal', length: 150, direction: 'Left' }]),
    createConnector('connector7', 'node7', 'node3', noLabel, [{ type: 'Orthogonal', length: 10, direction: 'Left' }], 'portcoding', 'codingPort'),
    createConnector('connector8', 'node7', 'node2', yesLabel, [], 'porterror', 'designPort')
];
// Declare variables for components and diagram instance
var diagramInstance;
var clearHistory;
var startActionInstance;
var endGroupAction;
var redoListInstance;
var undoListInstance;
var undoInstance;
var redoInstance;
function HistoryManager() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    // Method called after rendering completes to fit diagram to page and setup event listeners
    function rendereComplete() {
        diagramInstance.fitToPage({ mode: 'Height' });
        // Simplify event listener assignments
        var eventListeners = {
            "undo": function () { return diagramInstance.undo(); },
            "redo": function () { return diagramInstance.redo(); },
            "StackLimit": function (args) { return diagramInstance.setStackLimit(args.currentTarget.value); },
            "startGroupAction": function () { return toggleGroupAction(); },
            "clearHistory": function () {
                diagramInstance.clearHistory();
                updateHistoryLists();
            }
        };
        Object.keys(eventListeners).forEach(function (id) {
            document.getElementById(id).onclick = eventListeners[id];
        });
    }
    // Function to define default properties for connectors
    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal';
        connector.style.strokeColor = "#717171";
        connector.sourceDecorator.style.strokeColor = "#717171";
        connector.targetDecorator.style.strokeColor = "#717171";
        connector.sourceDecorator.style.fill = "#717171";
        connector.targetDecorator.style.fill = "#717171";
        return connector;
    }
    // Function to update lists and button states based on history
    function updateHistoryLists() {
        // Simplify the process of creating data sources for undo and redo lists
        var createDataSource = function (stack) { return stack.map(function (entry) { return ({ 'text': entry.type, 'value': entry.type }); }); };
        var undoDataSource = createDataSource(diagramInstance.historyManager.undoStack);
        var redoDataSource = createDataSource(diagramInstance.historyManager.redoStack);
        undoListInstance.dataSource = undoDataSource;
        undoListInstance.fields = { text: 'text', value: 'text' };
        undoListInstance.index = 0;
        undoListInstance.dataBind();
        undoInstance.disabled = !undoDataSource.length;
        redoListInstance.dataSource = redoDataSource;
        redoListInstance.fields = { text: 'text', value: 'text' };
        redoListInstance.index = 0;
        redoListInstance.dataBind();
        redoInstance.disabled = !redoDataSource.length;
    }
    // Toggle between starting and ending a group action
    function toggleGroupAction() {
        if (startActionInstance.element.classList.contains('e-active')) {
            startActionInstance.content = 'End Group Action';
            diagramInstance.startGroupAction();
        }
        else {
            diagramInstance.endGroupAction();
            startActionInstance.content = 'Start Group Action';
        }
    }
    var handleStackLimitChange = function (event) {
        var newValue = event.target.value;
        diagramInstance.setStackLimit(newValue);
    };
    // Method to render the component UI
    return (React.createElement("div", { className: "control-pane1" },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { id: "historyControlSection", className: "content-wrapper", style: { width: "100%" } },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "600px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, nodes: nodes, connectors: connectors, getConnectorDefaults: getConnectorDefaults, historyChange: function (arg) {
                        updateHistoryLists();
                    }, getNodeDefaults: function (obj) {
                        obj.annotations[0].style.color = '#717171';
                        return obj;
                    } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] })))),
        React.createElement("div", { id: "historyPropertySection", className: "col-lg-4 property-section", style: { paddingRight: "0px" } },
            React.createElement("div", { className: "property-panel-header" }, "History manager settings"),
            React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                React.createElement("div", { className: "row property-panel-content" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "listbox", style: { height: "100%", border: "1px solid #e0e0e0" } },
                            React.createElement("div", { className: "heading", style: { height: "40px" } },
                                React.createElement("span", null, "Undo Stack"),
                                React.createElement("div", { style: { float: "right", marginTop: "-5px" } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "undo", style: { width: "100%" }, disabled: true, ref: function (undoBtn) { return (undoInstance = undoBtn); } }, "Undo"))),
                            React.createElement("div", { id: 'undoList' }),
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'undoList', height: '180px', ref: function (undoList) { return (undoListInstance = undoList); } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "listbox", style: { height: "100%", border: "1px solid #e0e0e0" } },
                            React.createElement("div", { className: "heading", style: { height: "40px" } },
                                React.createElement("span", null, "Redo Stack"),
                                React.createElement("div", { style: { float: "right", marginTop: "-5px" } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "redo", style: { width: "100%" }, disabled: true, ref: function (redoBtn) { return (redoInstance = redoBtn); } }, "Redo"))),
                            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'redoList', height: '180px', ref: function (redoList) { return (redoListInstance = redoList); } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                        React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-6" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Stack Limit")),
                        React.createElement("div", { className: "col-xs-6", style: { paddingLeft: "0px", paddingRight: "0px" } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "StackLimit", value: 0, min: 0, max: 50, width: '100%', format: '##.##', step: 1, onChange: handleStackLimitChange }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                        React.createElement("div", { className: "col-xs-6", style: { paddingLeft: "0px" } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (startGroupActionBtn) { return (startActionInstance = startGroupActionBtn); }, id: "startGroupAction", title: 'startGroupAction', style: { width: "100%", overflow: "hidden", textOverflow: "ellipsis" }, isToggle: true }, "Start Group Action")),
                        React.createElement("div", { className: "col-xs-6", title: 'clearHistory', style: { paddingLeft: "0px", paddingRight: "0px" } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clearHistory", style: { width: "100%" } }, "Clear History")))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates viewing, deleting, limiting diagram history and groups diagram actions and stores it as a single entry in the history manager.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Diagram history are being handle all the diagram history. Using ",
                React.createElement("code", null, "stackLimit"),
                " property of the history manager we limit the no. of entries can be stored on the diagram history. Also, we can get the list of entries in the undo list and redo list using ",
                React.createElement("code", null, "undoStack"),
                " and ",
                React.createElement("code", null, "redoStack"),
                ". Also diagram history manager have the option to group the action as the single entry by the help of the ",
                React.createElement("code", null, "startGroupAction"),
                " and ",
                React.createElement("code", null, "endGroupAction"),
                "        public Api. Also, we can add the custom entries to the diagram history. method can be used to print the diagrams."))));
}
exports.default = HistoryManager;
