"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserHandleMouseDown = exports.getConnectorDefaults = exports.getNodeDefaults = exports.historyChange = exports.selectionChange = void 0;
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ai_text_to_mindmap_1 = require("./ai-text-to-mindmap");
var utilitymethods_1 = require("./utilitymethods");
function selectionChange(args) {
    var diagram = document.querySelector('#diagram').ej2_instances[0];
    if (args.state === 'Changing') {
        if (args.type === "Addition") {
            if (args.newValue[0] instanceof ej2_react_diagrams_1.Node && args.newValue[0].addInfo) {
                for (var i = 0; i < diagram.selectedItems.userHandles.length; i++) {
                    var handle = diagram.selectedItems.userHandles[i];
                    handle.visible = true;
                }
                if (args.newValue[0].addInfo.orientation === 'Left' ||
                    args.newValue[0].addInfo.orientation === 'subLeft' ||
                    args.newValue[0].addInfo.orientation === 'SubLeft') {
                    (0, utilitymethods_1.hideUserHandle)('leftHandle');
                    (0, utilitymethods_1.changeUserHandlePosition)('leftHandle');
                    (0, utilitymethods_1.changeUserHandlePosition)('devare');
                }
                else if (args.newValue[0].addInfo.orientation === 'Right' ||
                    args.newValue[0].addInfo.orientation === 'subRight' ||
                    args.newValue[0].addInfo.orientation === 'SubRight') {
                    (0, utilitymethods_1.hideUserHandle)('rightHandle');
                    (0, utilitymethods_1.changeUserHandlePosition)('rightHandle');
                    (0, utilitymethods_1.changeUserHandlePosition)('devare');
                }
                else if (args.newValue[0].data.branch === 'Root') {
                    (0, utilitymethods_1.hideUserHandle)('devare');
                }
                (0, utilitymethods_1.onClickDisable)(false, args.newValue[0]);
            }
            else {
                (0, utilitymethods_1.hideUserHandle)('leftHandle');
                (0, utilitymethods_1.hideUserHandle)('rightHandle');
                (0, utilitymethods_1.hideUserHandle)('devare');
                (0, utilitymethods_1.onClickDisable)(true, args.newValue[0]);
            }
        }
    }
    if (args.newValue.length === 0) {
        (0, utilitymethods_1.onClickDisable)(true);
    }
}
exports.selectionChange = selectionChange;
function historyChange() {
    var diagram = document.querySelector('#diagram').ej2_instances[0];
    if (diagram.historyManager.undoStack.length > 0) {
        ai_text_to_mindmap_1.toolbarObj.items[0].disabled = false;
    }
    else {
        ai_text_to_mindmap_1.toolbarObj.items[0].disabled = true;
    }
    if (diagram.historyManager.redoStack.length > 0) {
        ai_text_to_mindmap_1.toolbarObj.items[1].disabled = false;
    }
    else {
        ai_text_to_mindmap_1.toolbarObj.items[1].disabled = true;
    }
}
exports.historyChange = historyChange;
//Sets the default values of a node
function getNodeDefaults(obj) {
    if (obj.id !== 'textNode' && obj.data) {
        obj.constraints = ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Drag;
        var empInfo = obj.data;
        obj.style = {
            fill: obj.data.fill, strokeColor: obj.data.strokeColor,
            strokeWidth: 1
        };
        if (empInfo.branch === 'Root') {
            obj.addInfo = { level: 0 };
            obj.data.level = obj.addInfo.level;
            obj.data.orientation = empInfo.branch;
        }
        obj.addInfo = { level: obj.data.level, orientation: obj.data.orientation };
        obj.shape.cornerRadius = empInfo.branch === 'Root' ? 5 : 0;
        obj.shape = { type: 'Basic', shape: 'Ellipse' };
        obj.width = empInfo.branch === 'Root' ? 150 : 100;
        obj.height = empInfo.branch === 'Root' ? 75 : 50;
        obj.annotations = [{
                content: empInfo.Label,
            }];
    }
    var port = (0, ai_text_to_mindmap_1.getPort)();
    if (!obj.ports.length) {
        for (var i = 0; i < port.length; i++) {
            obj.ports.push(new ej2_react_diagrams_1.PointPort(obj, 'ports', port[i], true));
        }
    }
    return obj;
}
exports.getNodeDefaults = getNodeDefaults;
var currentBranch = 'Left';
//Sets the default values of a connector
function getConnectorDefaults(connector) {
    var diagram = document.querySelector('#diagram').ej2_instances[0];
    connector.type = 'Bezier';
    connector.targetDecorator = { shape: 'None' };
    connector.bezierSettings.allowSegmentsReset = false;
    connector.segments = [{ type: 'Bezier' }];
    var sourceNode = diagram.getObject(connector.sourceID);
    var targetNode = diagram.getObject(connector.targetID);
    if (!sourceNode.data) {
        sourceNode.data = {};
        sourceNode.data.id = sourceNode.id;
        sourceNode.data.branch = 'Root';
        sourceNode.data.orientation = 'Root';
        sourceNode.data.level = 0;
        sourceNode.data.parentId = '';
        sourceNode.data.Label = sourceNode.annotations[0].content;
        sourceNode.addInfo = sourceNode.data;
        var nodeData = (0, utilitymethods_1.getMindMapShape)(sourceNode);
        sourceNode.data.fill = nodeData.node.style.fill;
        sourceNode.data.strokeColor = nodeData.node.style.strokeColor;
        sourceNode.addInfo = sourceNode.data;
        sourceNode.style.fill = sourceNode.data.fill;
        sourceNode.style.strokeColor = sourceNode.data.strokeColor;
    }
    if (!targetNode.data) {
        targetNode.data = {};
        targetNode.data.id = targetNode.id;
        targetNode.data.branch = sourceNode.data.branch === 'Root'
            ? currentBranch
            : (sourceNode.data.branch === 'Left' || sourceNode.data.branch === 'subLeft' || sourceNode.data.branch === 'SubLeft' ? 'subLeft' : 'subRight');
        targetNode.data.orientation = targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft' ? 'Left' : 'Right';
        targetNode.data.level = sourceNode.data.level + 1;
        targetNode.data.parentId = sourceNode.data.id;
        targetNode.data.Label = targetNode.annotations[0].content;
        targetNode.addInfo = targetNode.data;
        var nodeData = (0, utilitymethods_1.getMindMapShape)(sourceNode);
        targetNode.data.fill = nodeData.node.style.fill;
        targetNode.data.strokeColor = nodeData.node.style.strokeColor;
        targetNode.addInfo = targetNode.data;
        targetNode.style.fill = targetNode.data.fill;
        targetNode.style.strokeColor = targetNode.data.strokeColor;
        currentBranch = sourceNode.data.branch === 'Root' ? currentBranch === 'Left' ? 'Right' : 'Left' : currentBranch;
    }
    if (targetNode.data && (targetNode.data.branch === 'Right' || targetNode.data.branch === 'subRight' || targetNode.data.branch === 'SubRight')) {
        connector.sourcePortID = sourceNode.ports[0].id;
        connector.targetPortID = targetNode.ports[1].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8c8c8c' };
    }
    else if (targetNode.data && (targetNode.data.branch === 'Left' || targetNode.data.branch === 'subLeft' || targetNode.data.branch === 'SubLeft')) {
        connector.sourcePortID = sourceNode.ports[1].id;
        connector.targetPortID = targetNode.ports[0].id;
        connector.style = { strokeWidth: 1, strokeColor: '#8c8c8c' };
    }
    connector.constraints &= ~ej2_react_diagrams_1.ConnectorConstraints.Select;
    return connector;
}
exports.getConnectorDefaults = getConnectorDefaults;
function onUserHandleMouseDown(args) {
    if (args.element.name === 'leftHandle') {
        (0, utilitymethods_1.addNode)('Right');
    }
    else if (args.element.name === 'rightHandle') {
        (0, utilitymethods_1.addNode)('Left');
    }
    else if (args.element.name === 'devare') {
        var diagram = document.querySelector('#diagram').ej2_instances[0];
        if (diagram.selectedItems.nodes.length > 0) {
            diagram.historyManager.startGroupAction();
            (0, utilitymethods_1.removeSubChild)(diagram.selectedItems.nodes[0], diagram);
            diagram.historyManager.endGroupAction();
            diagram.doLayout();
        }
    }
}
exports.onUserHandleMouseDown = onUserHandleMouseDown;
