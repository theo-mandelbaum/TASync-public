import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functionality-functional';
import ShapeGallery from './shape-gallery-functional';
import GettingStartedNodes from './getting-started-node-functional';
import HtmlNode from './custom-shapes-functional';
import Connectors from './connectors-functional';
import LineRoutingSample from './line-routing-functional';
import AvoidConnectorOverlapDiagram from './avoid-connector-overlap-functional';
import GettingStartedAnnotation from './getting-started-annotation-functional';
import Port from './port-functional';
import SwimLane from './swim-lane-functional';
import GroupandOrder from './grouping-and-ordering-functional';
import Events from './diagram-events-functional';
import HistoryManager from './history-manager-functional';
import CommandsSample from './commands-functional';
import ConstraintsSample from './constraints-functional';
import Tooltip from './tool-tip-functional';
import SymbolPalette from './symbol-palette-functional';
import ZoomAndPan from './zoom-and-pan-functional';
import SnappingSample from './snapping-functional';
import ScrollingSample from './scrolling-functional';
import DrawingTools from './drawing-tool-functional';
import KeyBoardInteraction from './key-board-functions-functional';
import UserHandle from './quick-commands-functional';
import Overview from './overview-functional';
import HierarchicalModel from './hierarchical-model-functional';
import OrganizationModel from './organization-model-functional';
import FlowchartLayoutSample from './flowchart-layout-functional';
import Radial from './radial-tree-functional';
import MindMap from './mind-map-functional';
import SymmetricLayout from './symmetric-layout-functional';
import ComplexHierarchicalModel from './complex-hierarchical-tree-functional';
import RTLTree from './right-to-left-tree-functional';
import PertChart from './pert-chart-functional';
import HierarchicalLayoutWithMultipleRoots from './hierarchical-layout-with-multiple-roots-functional';
import LocalData from './local-data-functional';
import RemoteData from './remote-data-functional';
import VirtualizationModel from './virtualize-functional';
import Serialization from './serialization-functional';
import PrintExport from './print-export-functional';
import BpmnEditor from './bpmn-editor-functional';
import LogicCircuit from './logic-circuit-functional';
import UmlActivityDiagram from './activity-functional';
import SequenceDiagram from './sequence-diagram-functional';
import UMLClassDiagram from './activity-class-functional';
import VennDiagram from './venn-diagram-functional';
import Fishbone from './fishbone-diagram-functional';
import WorkFlowEditor from './workflow-editor-functional';
import NetworkShapes from './network-diagram-functional';
import TreeviewSample from './tree-view-functional';
import FlowExecution from './flow-execution-functional';


export const diagramRoutes = (
    <>
         <Route  path='/:theme/diagram/default-functionality' Component={ Default }/>
         <Route  path='/:theme/diagram/shape-gallery' Component={ ShapeGallery }/>
         <Route  path='/:theme/diagram/getting-started-node' Component={ GettingStartedNodes }/>
         <Route  path='/:theme/diagram/custom-shapes' Component={ HtmlNode }/>
         <Route  path='/:theme/diagram/connectors' Component={ Connectors }/>
         <Route  path='/:theme/diagram/line-routing' Component={ LineRoutingSample }/>
         <Route  path='/:theme/diagram/avoid-connector-overlap' Component={ AvoidConnectorOverlapDiagram }/>
         <Route  path='/:theme/diagram/getting-started-annotation' Component={ GettingStartedAnnotation }/>
         <Route  path='/:theme/diagram/port' Component={ Port }/>
         <Route  path='/:theme/diagram/swim-lane' Component={ SwimLane }/>
         <Route  path='/:theme/diagram/grouping-and-ordering' Component={ GroupandOrder }/>
         <Route  path='/:theme/diagram/diagram-events' Component={ Events }/>
         <Route  path='/:theme/diagram/history-manager' Component={ HistoryManager }/>
         <Route  path='/:theme/diagram/commands' Component={ CommandsSample }/>
         <Route  path='/:theme/diagram/constraints' Component={ ConstraintsSample }/>
         <Route  path='/:theme/diagram/tool-tip' Component={ Tooltip }/>
         <Route  path='/:theme/diagram/symbol-palette' Component={ SymbolPalette }/>
         <Route  path='/:theme/diagram/zoom-and-pan' Component={ ZoomAndPan }/>
         <Route  path='/:theme/diagram/snapping' Component={ SnappingSample }/>
         <Route  path='/:theme/diagram/scrolling' Component={ ScrollingSample }/>
         <Route  path='/:theme/diagram/drawing-tool' Component={ DrawingTools }/>
         <Route  path='/:theme/diagram/key-board-functions' Component={ KeyBoardInteraction }/>
         <Route  path='/:theme/diagram/quick-commands' Component={ UserHandle }/>
         <Route  path='/:theme/diagram/overview' Component={ Overview }/>
         <Route  path='/:theme/diagram/hierarchical-model' Component={ HierarchicalModel }/>
         <Route  path='/:theme/diagram/organization-model' Component={ OrganizationModel }/>
         <Route  path='/:theme/diagram/flowchart-layout' Component={ FlowchartLayoutSample }/>
         <Route  path='/:theme/diagram/radial-tree' Component={ Radial }/>
         <Route  path='/:theme/diagram/mind-map' Component={ MindMap }/>
         <Route  path='/:theme/diagram/symmetric-layout' Component={ SymmetricLayout }/>
         <Route  path='/:theme/diagram/complex-hierarchical-tree' Component={ ComplexHierarchicalModel }/>
         <Route  path='/:theme/diagram/right-to-left-tree' Component={ RTLTree }/>
         <Route  path='/:theme/diagram/pert-chart' Component={ PertChart }/>
         <Route  path='/:theme/diagram/hierarchical-layout-with-multiple-roots' Component={ HierarchicalLayoutWithMultipleRoots }/>
         <Route  path='/:theme/diagram/local-data' Component={ LocalData }/>
         <Route  path='/:theme/diagram/remote-data' Component={ RemoteData }/>
         <Route  path='/:theme/diagram/virtualize' Component={ VirtualizationModel }/>
         <Route  path='/:theme/diagram/serialization' Component={ Serialization }/>
         <Route  path='/:theme/diagram/print-export' Component={ PrintExport }/>
         <Route  path='/:theme/diagram/bpmn-editor' Component={ BpmnEditor }/>
         <Route  path='/:theme/diagram/logic-circuit' Component={ LogicCircuit }/>
         <Route  path='/:theme/diagram/activity' Component={ UmlActivityDiagram }/>
         <Route  path='/:theme/diagram/sequence-diagram' Component={ SequenceDiagram }/>
         <Route  path='/:theme/diagram/activity-class' Component={ UMLClassDiagram }/>
         <Route  path='/:theme/diagram/venn-diagram' Component={ VennDiagram }/>
         <Route  path='/:theme/diagram/fishbone-diagram' Component={ Fishbone }/>
         <Route  path='/:theme/diagram/workflow-editor' Component={ WorkFlowEditor }/>
         <Route  path='/:theme/diagram/network-diagram' Component={ NetworkShapes }/>
         <Route  path='/:theme/diagram/tree-view' Component={ TreeviewSample }/>
         <Route  path='/:theme/diagram/flow-execution' Component={ FlowExecution }/>

    </>
)

export const diagramCategory = {"default-functionality":{"name":"Flow Chart","category":"Getting Started"},"shape-gallery":{"name":"Shapes","category":"Getting Started"},"getting-started-node":{"name":"Nodes","category":"Getting Started"},"custom-shapes":{"name":"HTML Shapes","category":"Getting Started"},"connectors":{"name":"Connectors","category":"Getting Started"},"line-routing":{"name":"LineRouting","category":"Getting Started"},"avoid-connector-overlap":{"name":"Avoid Connector Overlap","category":"Getting Started"},"getting-started-annotation":{"name":"Annotations","category":"Getting Started"},"port":{"name":"Ports","category":"Getting Started"},"swim-lane":{"name":"SwimLane","category":"Getting Started"},"grouping-and-ordering":{"name":"Grouping and Ordering","category":"Getting Started"},"diagram-events":{"name":"Events","category":"Getting Started"},"history-manager":{"name":"HistoryManager","category":"Getting Started"},"commands":{"name":"Commands","category":"Getting Started"},"constraints":{"name":"Constraints","category":"Getting Started"},"tool-tip":{"name":"Tooltip","category":"Getting Started"},"symbol-palette":{"name":"Symbol Palette","category":"Getting Started"},"zoom-and-pan":{"name":"Zooming and Panning","category":"Interactive Features"},"snapping":{"name":"Snapping","category":"Interactive Features"},"scrolling":{"name":"Scrolling","category":"Interactive Features"},"drawing-tool":{"name":"Drawing Tools","category":"Interactive Features"},"key-board-functions":{"name":"Keyboard Interaction","category":"Interactive Features"},"quick-commands":{"name":"User Handle","category":"Interactive Features"},"overview":{"name":"Overview Panel","category":"Interactive Features"},"hierarchical-model":{"name":"Hierarchical Tree","category":"Automatic Layouts"},"organization-model":{"name":"Organization Chart","category":"Automatic Layouts"},"flowchart-layout":{"name":"Flowchart Layout","category":"Automatic Layouts"},"radial-tree":{"name":"Radial Tree","category":"Automatic Layouts"},"mind-map":{"name":"Mind Map","category":"Automatic Layouts"},"symmetric-layout":{"name":"Symmetric Layout","category":"Automatic Layouts"},"complex-hierarchical-tree":{"name":"Complex Hierarchical Tree","category":"Automatic Layouts"},"right-to-left-tree":{"name":"RTL Tree","category":"Automatic Layouts"},"pert-chart":{"name":"PERT Chart","category":"Automatic Layouts"},"hierarchical-layout-with-multiple-roots":{"name":"Hierarchical Layout With Multiple Roots","category":"Automatic Layouts"},"local-data":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"virtualize":{"name":"Virtualization","category":"Performance"},"serialization":{"name":"Serialization","category":"Save and Restore"},"print-export":{"name":"Print and Export","category":"Print and Export"},"bpmn-editor":{"name":"BPMN Editor","category":"Use Case Diagram"},"logic-circuit":{"name":"Logic circuit Diagram","category":"Use Case Diagram"},"activity":{"name":"UML Activity Diagram","category":"Use Case Diagram"},"sequence-diagram":{"name":"UML Sequence Diagram","category":"Use Case Diagram"},"activity-class":{"name":"UML Class Diagram","category":"Use Case Diagram"},"venn-diagram":{"name":"Venn Diagram","category":"Real-Time Diagrams"},"fishbone-diagram":{"name":"Fishbone Diagram","category":"Real-Time Diagrams"},"workflow-editor":{"name":"Workflow Diagram","category":"Real-Time Diagrams"},"network-diagram":{"name":"Network Diagram","category":"Real-Time Diagrams"},"tree-view":{"name":"Diagram Binding With TreeView","category":"Real-Time Diagrams"},"flow-execution":{"name":"Flow Execution","category":"Real-Time Diagrams"},"defaultSample":"diagram/default-functionality"}