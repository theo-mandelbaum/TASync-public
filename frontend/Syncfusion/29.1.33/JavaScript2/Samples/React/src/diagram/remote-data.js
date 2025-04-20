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
exports.RemoteData = void 0;
// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the diagram.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var RemoteData = /** @class */ (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoteData.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", width: "100%", height: "490", layout: {
                        type: "HierarchicalTree",
                        margin: { left: 0, right: 0, top: 100, bottom: 0 },
                        verticalSpacing: 40,
                    }, 
                    // Set default properties for nodes
                    getNodeDefaults: function (node) {
                        node.width = 80;
                        node.height = 40;
                        // Initialize node shape
                        node.shape = { type: "Basic", shape: "Rectangle" };
                        node.style = { fill: "#048785", strokeColor: "Transparent" };
                    }, 
                    // Set default properties for connectors
                    getConnectorDefaults: function (connector) {
                        connector.type = "Orthogonal";
                        connector.style.strokeColor = "#048785";
                        connector.targetDecorator.shape = "None";
                    }, 
                    // Configure the data source for the diagram
                    dataSourceSettings: {
                        id: "Id",
                        parentId: "ParentId",
                        dataSource: new ej2_data_1.DataManager({
                            url: "https://ej2services.syncfusion.com/production/web-services/api/RemoteData",
                            crossDomain: true
                        }),
                        // Bind external data to node properties
                        doBinding: function (nodeModel, data) {
                            nodeModel.annotations = [{
                                    content: data["Label"],
                                    style: { color: "white" }
                                }];
                        }
                    }, 
                    // Disable all interactions except zoom/pan
                    tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, snapSettings: { constraints: 0 } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates binding remote data with the diagram using the Data Manager support.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate a diagram from remote data such as REST APIs. The",
                    React.createElement("code", null, "dataSourceSettings"),
                    " property can be used to map an external data source with the diagram control. The",
                    React.createElement("code", null, "id"),
                    " property of",
                    React.createElement("code", null, "dataSourceSettings"),
                    " can be used to define a unique field of an external data. The",
                    React.createElement("code", null, "parentId"),
                    " property can be used to define the relationship between objects. The",
                    React.createElement("code", null, "dataManager"),
                    " property can be used to fetch data from web services."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a hierarchical structure, inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return RemoteData;
}(sample_base_1.SampleBase));
exports.RemoteData = RemoteData;
