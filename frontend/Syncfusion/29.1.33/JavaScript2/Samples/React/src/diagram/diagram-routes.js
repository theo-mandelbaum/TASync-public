"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagramCategory = exports.diagramRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functionality_functional_1 = require("./default-functionality-functional");
var shape_gallery_functional_1 = require("./shape-gallery-functional");
var getting_started_node_functional_1 = require("./getting-started-node-functional");
var custom_shapes_functional_1 = require("./custom-shapes-functional");
var connectors_functional_1 = require("./connectors-functional");
var line_routing_functional_1 = require("./line-routing-functional");
var avoid_connector_overlap_functional_1 = require("./avoid-connector-overlap-functional");
var getting_started_annotation_functional_1 = require("./getting-started-annotation-functional");
var port_functional_1 = require("./port-functional");
var swim_lane_functional_1 = require("./swim-lane-functional");
var grouping_and_ordering_functional_1 = require("./grouping-and-ordering-functional");
var diagram_events_functional_1 = require("./diagram-events-functional");
var history_manager_functional_1 = require("./history-manager-functional");
var commands_functional_1 = require("./commands-functional");
var constraints_functional_1 = require("./constraints-functional");
var tool_tip_functional_1 = require("./tool-tip-functional");
var symbol_palette_functional_1 = require("./symbol-palette-functional");
var zoom_and_pan_functional_1 = require("./zoom-and-pan-functional");
var snapping_functional_1 = require("./snapping-functional");
var scrolling_functional_1 = require("./scrolling-functional");
var drawing_tool_functional_1 = require("./drawing-tool-functional");
var key_board_functions_functional_1 = require("./key-board-functions-functional");
var quick_commands_functional_1 = require("./quick-commands-functional");
var overview_functional_1 = require("./overview-functional");
var hierarchical_model_functional_1 = require("./hierarchical-model-functional");
var organization_model_functional_1 = require("./organization-model-functional");
var flowchart_layout_functional_1 = require("./flowchart-layout-functional");
var radial_tree_functional_1 = require("./radial-tree-functional");
var mind_map_functional_1 = require("./mind-map-functional");
var symmetric_layout_functional_1 = require("./symmetric-layout-functional");
var complex_hierarchical_tree_functional_1 = require("./complex-hierarchical-tree-functional");
var right_to_left_tree_functional_1 = require("./right-to-left-tree-functional");
var pert_chart_functional_1 = require("./pert-chart-functional");
var hierarchical_layout_with_multiple_roots_functional_1 = require("./hierarchical-layout-with-multiple-roots-functional");
var local_data_functional_1 = require("./local-data-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var virtualize_functional_1 = require("./virtualize-functional");
var serialization_functional_1 = require("./serialization-functional");
var print_export_functional_1 = require("./print-export-functional");
var bpmn_editor_functional_1 = require("./bpmn-editor-functional");
var logic_circuit_functional_1 = require("./logic-circuit-functional");
var activity_functional_1 = require("./activity-functional");
var sequence_diagram_functional_1 = require("./sequence-diagram-functional");
var activity_class_functional_1 = require("./activity-class-functional");
var venn_diagram_functional_1 = require("./venn-diagram-functional");
var fishbone_diagram_functional_1 = require("./fishbone-diagram-functional");
var workflow_editor_functional_1 = require("./workflow-editor-functional");
var network_diagram_functional_1 = require("./network-diagram-functional");
var tree_view_functional_1 = require("./tree-view-functional");
var flow_execution_functional_1 = require("./flow-execution-functional");
exports.diagramRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/default-functionality', Component: default_functionality_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/shape-gallery', Component: shape_gallery_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/getting-started-node', Component: getting_started_node_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/custom-shapes', Component: custom_shapes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/connectors', Component: connectors_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/line-routing', Component: line_routing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/avoid-connector-overlap', Component: avoid_connector_overlap_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/getting-started-annotation', Component: getting_started_annotation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/port', Component: port_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/swim-lane', Component: swim_lane_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/grouping-and-ordering', Component: grouping_and_ordering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/diagram-events', Component: diagram_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/history-manager', Component: history_manager_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/commands', Component: commands_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/constraints', Component: constraints_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/tool-tip', Component: tool_tip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/symbol-palette', Component: symbol_palette_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/zoom-and-pan', Component: zoom_and_pan_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/snapping', Component: snapping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/scrolling', Component: scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/drawing-tool', Component: drawing_tool_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/key-board-functions', Component: key_board_functions_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/quick-commands', Component: quick_commands_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/hierarchical-model', Component: hierarchical_model_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/organization-model', Component: organization_model_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/flowchart-layout', Component: flowchart_layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/radial-tree', Component: radial_tree_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/mind-map', Component: mind_map_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/symmetric-layout', Component: symmetric_layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/complex-hierarchical-tree', Component: complex_hierarchical_tree_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/right-to-left-tree', Component: right_to_left_tree_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/pert-chart', Component: pert_chart_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/hierarchical-layout-with-multiple-roots', Component: hierarchical_layout_with_multiple_roots_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/virtualize', Component: virtualize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/serialization', Component: serialization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/print-export', Component: print_export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/bpmn-editor', Component: bpmn_editor_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/logic-circuit', Component: logic_circuit_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/activity', Component: activity_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/sequence-diagram', Component: sequence_diagram_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/activity-class', Component: activity_class_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/venn-diagram', Component: venn_diagram_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/fishbone-diagram', Component: fishbone_diagram_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/workflow-editor', Component: workflow_editor_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/network-diagram', Component: network_diagram_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/tree-view', Component: tree_view_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/flow-execution', Component: flow_execution_functional_1.default })));
exports.diagramCategory = { "default-functionality": { "name": "Flow Chart", "category": "Getting Started" }, "shape-gallery": { "name": "Shapes", "category": "Getting Started" }, "getting-started-node": { "name": "Nodes", "category": "Getting Started" }, "custom-shapes": { "name": "HTML Shapes", "category": "Getting Started" }, "connectors": { "name": "Connectors", "category": "Getting Started" }, "line-routing": { "name": "LineRouting", "category": "Getting Started" }, "avoid-connector-overlap": { "name": "Avoid Connector Overlap", "category": "Getting Started" }, "getting-started-annotation": { "name": "Annotations", "category": "Getting Started" }, "port": { "name": "Ports", "category": "Getting Started" }, "swim-lane": { "name": "SwimLane", "category": "Getting Started" }, "grouping-and-ordering": { "name": "Grouping and Ordering", "category": "Getting Started" }, "diagram-events": { "name": "Events", "category": "Getting Started" }, "history-manager": { "name": "HistoryManager", "category": "Getting Started" }, "commands": { "name": "Commands", "category": "Getting Started" }, "constraints": { "name": "Constraints", "category": "Getting Started" }, "tool-tip": { "name": "Tooltip", "category": "Getting Started" }, "symbol-palette": { "name": "Symbol Palette", "category": "Getting Started" }, "zoom-and-pan": { "name": "Zooming and Panning", "category": "Interactive Features" }, "snapping": { "name": "Snapping", "category": "Interactive Features" }, "scrolling": { "name": "Scrolling", "category": "Interactive Features" }, "drawing-tool": { "name": "Drawing Tools", "category": "Interactive Features" }, "key-board-functions": { "name": "Keyboard Interaction", "category": "Interactive Features" }, "quick-commands": { "name": "User Handle", "category": "Interactive Features" }, "overview": { "name": "Overview Panel", "category": "Interactive Features" }, "hierarchical-model": { "name": "Hierarchical Tree", "category": "Automatic Layouts" }, "organization-model": { "name": "Organization Chart", "category": "Automatic Layouts" }, "flowchart-layout": { "name": "Flowchart Layout", "category": "Automatic Layouts" }, "radial-tree": { "name": "Radial Tree", "category": "Automatic Layouts" }, "mind-map": { "name": "Mind Map", "category": "Automatic Layouts" }, "symmetric-layout": { "name": "Symmetric Layout", "category": "Automatic Layouts" }, "complex-hierarchical-tree": { "name": "Complex Hierarchical Tree", "category": "Automatic Layouts" }, "right-to-left-tree": { "name": "RTL Tree", "category": "Automatic Layouts" }, "pert-chart": { "name": "PERT Chart", "category": "Automatic Layouts" }, "hierarchical-layout-with-multiple-roots": { "name": "Hierarchical Layout With Multiple Roots", "category": "Automatic Layouts" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "virtualize": { "name": "Virtualization", "category": "Performance" }, "serialization": { "name": "Serialization", "category": "Save and Restore" }, "print-export": { "name": "Print and Export", "category": "Print and Export" }, "bpmn-editor": { "name": "BPMN Editor", "category": "Use Case Diagram" }, "logic-circuit": { "name": "Logic circuit Diagram", "category": "Use Case Diagram" }, "activity": { "name": "UML Activity Diagram", "category": "Use Case Diagram" }, "sequence-diagram": { "name": "UML Sequence Diagram", "category": "Use Case Diagram" }, "activity-class": { "name": "UML Class Diagram", "category": "Use Case Diagram" }, "venn-diagram": { "name": "Venn Diagram", "category": "Real-Time Diagrams" }, "fishbone-diagram": { "name": "Fishbone Diagram", "category": "Real-Time Diagrams" }, "workflow-editor": { "name": "Workflow Diagram", "category": "Real-Time Diagrams" }, "network-diagram": { "name": "Network Diagram", "category": "Real-Time Diagrams" }, "tree-view": { "name": "Diagram Binding With TreeView", "category": "Real-Time Diagrams" }, "flow-execution": { "name": "Flow Execution", "category": "Real-Time Diagrams" }, "defaultSample": "diagram/default-functionality" };
