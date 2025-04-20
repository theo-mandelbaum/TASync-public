"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_data_2 = require("@syncfusion/ej2-data");
var diagramInstance;
//Initialize dataSource for diagram
var data = [
    { id: 1, Label: 'Production Manager', color: '#1c5b9b' },
    { id: 2, Label: 'Control Room', parentId: 1, color: '#18c1be' },
    { id: 3, Label: 'Plant Operator', parentId: 1, color: '#18c1be' },
    { id: 4, Label: 'Foreman', parentId: 2, color: '#17a573' },
    { id: 5, Label: 'Foreman', parentId: 3, color: '#17a573' },
    { id: 6, Label: 'Craft Personnel', parentId: 4, color: '#73bb34' },
    { id: 7, Label: 'Craft Personnel', parentId: 4, color: '#73bb34' },
    { id: 8, Label: 'Craft Personnel', parentId: 5, color: '#73bb34' },
    { id: 9, Label: 'Craft Personnel', parentId: 5, color: '#73bb34' },
    { id: 10, Label: 'Administrative Officer', color: '#1c5b9b' },
    { id: 11, Label: 'Security Supervisor', parentId: 10, color: '#18c1be' },
    { id: 12, Label: 'HR Supervisor', parentId: 10, color: '#18c1be' },
    { id: 13, Label: 'Reception Supervisor', parentId: 10, color: '#18c1be' },
    { id: 14, Label: 'Securities', parentId: 11, color: '#17a573' },
    { id: 15, Label: 'HR Officer', parentId: 12, color: '#17a573' },
    { id: 16, Label: 'Receptionist', parentId: 13, color: '#17a573' },
    { id: 17, Label: 'Maintainence Manager', color: '#1c5b9b' },
    { id: 18, Label: 'Electrical Supervisor', parentId: 17, color: '#18c1be' },
    { id: 19, Label: 'Mechanical Supervisor', parentId: 17, color: '#18c1be' },
    { id: 20, Label: 'Craft Personnel', parentId: 18, color: '#17a573' },
    { id: 21, Label: 'Craft Personnel', parentId: 19, color: '#17a573' },
];
var items = new ej2_data_1.DataManager(data, new ej2_data_2.Query().take(7));
function HierarchicalLayoutWithMultipleRoots() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //sets node default value
    function nodeDefaults(obj) {
        obj.style.fill = obj.data.color;
        obj.backgroundColor = obj.data.color;
        obj.style.color = 'white';
        obj.style.strokeWidth = 2;
        obj.width = 75;
        obj.height = 35;
        obj.shape.margin = { left: 5, right: 5, bottom: 5, top: 5 };
        return obj;
    }
    //sets connector default value
    function connectorDefaults(connector) {
        connector.style = { strokeColor: 'CornflowerBlue' };
        connector.targetDecorator = { shape: 'Arrow', height: 10, width: 10, style: { fill: 'CornflowerBlue', strokeColor: 'white' } };
        connector.type = "Orthogonal";
        return connector;
    }
    return (React.createElement("div", { className: "control-pane diagram-control-pane" },
        React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
            React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "499px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                //configures data source settings
                dataSourceSettings: {
                    //sets the fields to bind
                    id: "id",
                    parentId: "parentId",
                    dataSource: items,
                    doBinding: function (nodeModel, data) {
                        nodeModel.shape = {
                            type: "Text",
                            content: data.Label
                        };
                    }
                }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, layout: {
                    type: "HierarchicalTree",
                    verticalSpacing: 30,
                    horizontalSpacing: 40
                }, getNodeDefaults: function (obj) {
                    return nodeDefaults(obj);
                }, getConnectorDefaults: function (connector) {
                    return connectorDefaults(connector);
                } },
                React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates the structure of an Electricity Sector using complex hierarchical layout with multiple roots.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This example shows how to create a complex hierarchical layout with multiple root nodes."))));
}
exports.default = HierarchicalLayoutWithMultipleRoots;
