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
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = ".diagram-userhandle .image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 50px;\n        width: calc((100% - 18px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n     .e-remove-selection .property-section-content {\n      pointer-events: none;\n    }\n      .property-section .e-remove-selection {\n      cursor: not-allowed;\n    }\n    .diagram-userhandle .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .diagram-userhandle .row {\n        margin: 10px 0px 0px 0px;\n    }\n\n    .diagram-userhandle .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .diagram-userhandle .row-header {\n        font-size: 15px;\n        font-weight: 500;\n        margin-top: 10px\n    }\n\n    .diagram-userhandle .property-panel-header {\n        padding-top: 2px;\n        padding-bottom: 5px;\n    }\n\n    .diagram-userhandle .e-checkbox-wrapper .e-label {\n        font-size: 12px;\n    }\n\n    .diagram-userhandle .container-fluid {\n        padding-left: 0px;\n    }\n\n    .diagram-userhandle .diagram-control-pane .col-xs-6 {\n        padding-left: 0px;\n        padding-right: 0px;\n        padding-top: 5px;\n    }";
var diagramInstance;
var appearanceInstance;
var patternInstance;
// Define the collection of nodes in the diagram.
var nodes = [
    {
        id: "NewIdea",
        width: 150,
        height: 60,
        offsetX: 300,
        offsetY: 60,
        shape: { type: "Flow", shape: "Terminator" },
        annotations: [{ content: "New idea identified" }]
    },
    {
        id: "Meeting",
        width: 150,
        height: 60,
        offsetX: 300,
        offsetY: 155,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Meeting with board" }]
    },
    {
        id: "BoardDecision",
        width: 150,
        height: 110,
        offsetX: 300,
        offsetY: 280,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [{ content: "Board decides \n whether to proceed" }]
    },
    {
        id: "Project",
        width: 150,
        height: 100,
        offsetX: 300,
        offsetY: 430,
        shape: { type: "Flow", shape: "Decision" },
        annotations: [{ content: "Find Project manager" }]
    },
    {
        id: "End",
        width: 150,
        height: 60,
        offsetX: 300,
        offsetY: 555,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Implement and Deliver" }]
    },
    {
        id: "Decision",
        width: 250,
        height: 60,
        offsetX: 550,
        offsetY: 60,
        shape: { type: "Flow", shape: "Card" },
        annotations: [{ content: "Decision process for new software ideas" }],
        fixedUserHandles: [{ padding: { left: 2, right: 2, top: 2, bottom: 2 }, offset: { x: 1.1, y: 0.5 }, width: 20, height: 20, }]
    },
    {
        id: "Reject",
        width: 150,
        height: 60,
        offsetX: 550,
        offsetY: 280,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Reject" }]
    },
    {
        id: "Resources",
        width: 150,
        height: 60,
        offsetX: 550,
        offsetY: 430,
        shape: { type: "Flow", shape: "Process" },
        annotations: [{ content: "Hire new resources" }]
    }
];
// Define the collection of connectors in the diagram.
var connectors = [
    {
        id: "connector1",
        type: "Straight",
        sourceID: "NewIdea",
        targetID: "Meeting"
    },
    {
        id: "connector2",
        type: "Straight",
        sourceID: "Meeting",
        targetID: "BoardDecision"
    },
    {
        id: "connector3",
        type: "Straight",
        sourceID: "BoardDecision",
        targetID: "Project"
    },
    { id: "connector4", type: "Straight", sourceID: "Project", targetID: "End" },
    {
        id: "connector5",
        type: "Straight",
        sourceID: "BoardDecision",
        targetID: "Reject"
    },
    {
        id: "connector6",
        type: "Straight",
        sourceID: "Project",
        targetID: "Resources"
    }
];
// Define the collection of user handles for nodes in the diagram.
var handles = [
    {
        name: "clone",
        pathData: "M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3," +
            "0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z " +
            "M68.5,72.5h-30V34.4h30V72.5z",
        visible: true,
        offset: 0,
        side: "Bottom",
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
        pathColor: "white"
    }
];
function UserHandle() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    function rendereComplete() {
        diagramInstance.fitToPage();
        diagramInstance.select([diagramInstance.nodes[0]]);
        appearanceInstance.onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "left":
                        setUserHandlePosition(0, "Bottom", target);
                        break;
                    case "right":
                        setUserHandlePosition(1, "Bottom", target);
                        break;
                    case "topr":
                        setUserHandlePosition(0, "Right", target);
                        break;
                }
            }
            diagramInstance.dataBind();
        };
        patternInstance.onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "pattern1":
                        applyUserHandleStyle("#1E90FF", target);
                        break;
                    case "pattern2":
                        applyUserHandleStyle("#3CB371", target);
                        break;
                    case "pattern3":
                        applyUserHandleStyle("#FF6347", target);
                        break;
                }
            }
            diagramInstance.dataBind();
        };
    }
    // Define the clone tool for copying Nodes/Connectors.
    var CloneTool = /** @class */ (function (_super) {
        __extends(CloneTool, _super);
        function CloneTool() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CloneTool.prototype.mouseDown = function (args) {
            var newObject;
            if (diagramInstance.selectedItems.nodes.length > 0) {
                newObject = (0, ej2_react_diagrams_1.cloneObject)(diagramInstance.selectedItems.nodes[0]);
            }
            else {
                newObject = (0, ej2_react_diagrams_1.cloneObject)(diagramInstance.selectedItems.connectors[0]);
            }
            newObject.id += (0, ej2_react_diagrams_1.randomId)();
            diagramInstance.paste([newObject]);
            if (diagramInstance.selectedItems.connectors.length > 0) {
                args.source = diagramInstance.connectors[diagramInstance.connectors.length - 1];
            }
            else {
                args.source = diagramInstance.nodes[diagramInstance.nodes.length - 1];
            }
            args.sourceWrapper = args.source.wrapper;
            _super.prototype.mouseDown.call(this, args);
            this.inAction = true;
        };
        return CloneTool;
    }(ej2_react_diagrams_1.MoveTool));
    //Enable the clone tool for UserHandle.
    function getTool(action) {
        var tool;
        if (action === "clone") {
            tool = new CloneTool(diagramInstance.commandHandler);
        }
        return tool;
    }
    //set the position of the userhandle.
    function setUserHandlePosition(offset, side, target) {
        diagramInstance.selectedItems.userHandles[0].offset = offset;
        diagramInstance.selectedItems.userHandles[0].side = side;
        target.classList.add("e-selected-style");
    }
    //set the style of the userhandle.
    function applyUserHandleStyle(bgcolor, target) {
        diagramInstance.selectedItems.userHandles[0].backgroundColor = bgcolor;
        diagramInstance.selectedItems.userHandles[0].pathColor = "White";
        target.classList.add("e-selected-style");
    }
    function fixedUserHandleTemplate(props) {
        return (React.createElement("div", { style: { width: '100%', height: '100%' } },
            React.createElement("button", { style: { backgroundColor: 'black', borderRadius: '50%', width: '25px', height: '25px', border: 'none', cursor: 'context-menu', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url(https://ej2.syncfusion.com/react/demos/src/diagram/Images/user-handle/delete.png)", backgroundSize: 'cover', backgroundPosition: 'center' } })));
    }
    return (React.createElement("div", { className: "control-pane diagram-userhandle" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "600px", nodes: nodes, connectors: connectors, selectedItems: {
                        constraints: ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                        userHandles: handles
                    }, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                    //set Node default value
                    getNodeDefaults: function (node) {
                        return {
                            style: { fill: "#578CA9", strokeColor: "none" },
                            annotations: [{ style: { color: "white" } }]
                        };
                    }, 
                    //set CustomTool
                    getCustomTool: getTool, fixedUserHandleTemplate: fixedUserHandleTemplate.bind(this), fixedUserHandleClick: function () {
                        diagramInstance.select([diagramInstance.nameTable['Decision']]);
                        diagramInstance.remove();
                    }, 
                    // Enable or disable the property panel based on the selection.
                    selectionChange: function (arg) {
                        var propertyAppearance = document.getElementById("propertypanel");
                        var getSelectedElement = document.getElementsByClassName("e-remove-selection");
                        if (arg.newValue) {
                            // Check if the item in newValue is either a Node or Connector
                            if ((arg.newValue[0] instanceof ej2_react_diagrams_1.Node) || (arg.newValue[0] instanceof ej2_react_diagrams_1.Connector)) {
                                if (getSelectedElement.length > 0) {
                                    getSelectedElement[0].classList.remove("e-remove-selection");
                                }
                            }
                            else {
                                if (!propertyAppearance.classList.contains("e-remove-selection")) {
                                    propertyAppearance.classList.add("e-remove-selection");
                                }
                            }
                        }
                    } }))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement("div", { id: "propertypanel", className: "e-remove-selection" },
                React.createElement("div", { className: "property-section-content" },
                    React.createElement("div", { className: "property-panel-header" }, "Properties"),
                    React.createElement("div", { className: "row property-panel-content", id: "appearance", ref: function (appearance) { return (appearanceInstance = appearance); } },
                        React.createElement("div", { className: "row row-header" }, "Alignment"),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "image-pattern-style e-selected-style", id: "left", style: {
                                    backgroundImage: "url('src/diagram/Images/user-handle/bottoml.png')",
                                    marginRight: "4px"
                                } }),
                            React.createElement("div", { className: "image-pattern-style", id: "right", style: {
                                    backgroundImage: "url('src/diagram/Images/user-handle/bottomr.png')",
                                    margin: "0px 4px"
                                } }),
                            React.createElement("div", { className: "image-pattern-style", id: "topr", style: {
                                    backgroundImage: "url('src/diagram/Images/user-handle/topr.png')"
                                } }))),
                    React.createElement("div", { className: "row property-panel-content", id: "pattern", ref: function (pattern) { return (patternInstance = pattern); } },
                        React.createElement("div", { className: "row row-header" }, "Appearance"),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "image-pattern-style", id: "pattern1", style: {
                                    backgroundImage: "url('src/diagram/Images/user-handle/pattern1.png')",
                                    marginRight: "4px"
                                } }),
                            React.createElement("div", { className: "image-pattern-style", id: "pattern2", style: {
                                    backgroundImage: "url('src/diagram/Images/user-handle/pattern2.png')",
                                    margin: "0px 4px"
                                } }),
                            React.createElement("div", { className: "image-pattern-style", id: "pattern3", style: {
                                    backgroundImage: "url('src/diagram/Images/user-handle/pattern3.png')"
                                } })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes a simple flow diagram along with options to execute the frequently used commands using user handles.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "User handles are icons that are placed around the node to run the frequently used commands. This example shows how to render and configure user handles and how to interact with the diagram using user handles. The ",
                React.createElement("code", null, "userHandles"),
                " property of the ",
                React.createElement("code", null, "selectedItems"),
                " can be used to add user handles to the diagram.",
                React.createElement("code", null, " fixedUserHandleTemplate"),
                " property of the diagram provides template support for customizing fixed user handles and we provide the HTML  button to delete the node.Click the templates in the property panel, to customize the size, position, and appearance of the user handles."),
            React.createElement("br", null))));
}
exports.default = UserHandle;
