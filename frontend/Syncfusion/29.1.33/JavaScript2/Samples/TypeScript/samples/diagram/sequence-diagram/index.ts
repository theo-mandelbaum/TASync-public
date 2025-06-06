import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Diagram,
    ConnectorModel,
    UndoRedo,
    DiagramTools,
    NodeModel,
    PortVisibility,
    PointPortModel
} from '@syncfusion/ej2-diagrams';

// Enable Undo and Redo functionality in the Diagram component.
Diagram.Inject(UndoRedo);

// Creates a text node with specified properties.
function createTextNode(id: string, width: number, height: number, offsetX: number, offsetY: number,
    content: string, fill: string, bold: boolean): NodeModel {
    return {
        id: id,
        width: width,
        height: height,
        offsetX: offsetX,
        offsetY: offsetY,
        shape: { type: "Text", content: content },
        style: { fill: fill, bold: bold }
    };
}

// Creates a port with specified properties.
function createPort(id: string, offsetX: number, offsetY: number): PointPortModel {
    return {
        id,
        offset: { x: offsetX, y: offsetY },
        visibility: PortVisibility.Hidden,
    };
}

// Creates a basic node (rectangle) with ports.
function createBasicNode(id: string, width: number, height: number, offsetX: number, offsetY: number, ports: PointPortModel[]): NodeModel {
    return {
        id: id,
        shape: { type: 'Basic', shape: 'Rectangle' },
        width: width,
        height: height,
        offsetX: offsetX,
        offsetY: offsetY,
        style: { fill: 'orange', strokeColor: 'orange' },
        ports: ports,
    };
}

// Creates a straight connector between two points.
function createConnector(id: string, sourceX: number, sourceY: number, targetX: number, targetY: number): ConnectorModel {
    return {
        id: id,
        type: 'Straight',
        sourcePoint: { x: sourceX, y: sourceY },
        targetPoint: { x: targetX, y: targetY },
        targetDecorator: { shape: 'None' },
        style: { strokeColor: '#A5A6A7' }
    };
}

// Creates a straight connector between two nodes using ports.
function createArrowConnector(id: string, sourceID: string, sourcePortID: string, targetID: string, targetPortID: string): ConnectorModel {
    return {
        id,
        type: 'Straight',
        sourceID,
        sourcePortID,
        targetID,
        targetPortID,
    };
}

// Define nodes for the sequence diagram.
let nodes: NodeModel[] = [
    createTextNode('employee', 100, 60, 100, 100, 'Employee', 'transparent', true),
    createTextNode('teamLead', 100, 60, 350, 100, 'Team Lead', 'transparent', true),
    createTextNode('dashboard', 100, 60, 600, 100, 'Dashboard', 'transparent', true),
    createTextNode('manager', 100, 60, 850, 100, 'Manager', 'transparent', true),
    createTextNode('leaveRequest', 100, 60, 225, 250, 'Leave Request', 'transparent', false),
    createTextNode('leaveApproval', 100, 60, 225, 484, 'Leave Approval', 'transparent', false),
    createTextNode('checkEmplyeeAvail', 175, 30, 470, 345, 'Check Employee availability and task status', 'transparent', false),
    createTextNode('forwardLeaveMssg', 150, 30, 600, 420, 'Forward Leave Request', 'transparent', false),
    createTextNode('noObjection', 150, 30, 600, 460, 'No Objection', 'transparent', false),
    createBasicNode('employeeNode', 10, 250, 100, 350, [
        createPort('p1', 1, 0.05),
        createPort('p2', 1, 0.97),
    ]),
    createBasicNode('teamLeadNode', 10, 190, 350, 320, [
        createPort('p1', 0, 0.07),
        createPort('p2', 1, 0.92),
        createPort('p3', 1, 0.5),
    ]),
    createBasicNode('dashboardNode', 10, 25, 600, 320, [
        createPort('p1', 0, 0.5),
    ]),
    createBasicNode('managerNode', 10, 50, 850, 420, [
        createPort('p1', 0, 0.1),
        createPort('p2', 0, 0.9),
    ])
];

// Define connectors for the sequence diagram.
let connectors: ConnectorModel[] = [
    createConnector('employeeCon1', 100, 120, 100, 225),
    createConnector('employeeCon2', 100, 475, 100, 600),
    createConnector('teamLeanCon1', 350, 120, 350, 225),
    createConnector('teamLeanCon2', 350, 415, 350, 600),
    createConnector('dashboardCon1', 600, 120, 600, 307),
    createConnector('dashboardCon2', 600, 333, 600, 600),
    createConnector('managerCon1', 850, 120, 850, 395),
    createConnector('managerCon2', 850, 445, 850, 600),
    createArrowConnector('empToTeamLead', 'employeeNode', 'p1', 'teamLeadNode', 'p1'),
    createArrowConnector('teamLeadToDash', 'teamLeadNode', 'p3', 'dashboardNode', 'p1'),
    createArrowConnector('teamLeadToManager', 'teamLeadNode', 'p2', 'managerNode', 'p1'),
    {
        id: 'teamLeadToEmp',
        type: 'Straight',
        sourcePoint: { x: 350, y: 465 },
        style: { strokeDashArray: '4 4' },
        targetID: 'employeeNode',
        targetPortID: 'p2',
    },
    {
        id: 'managerToTeamLead',
        type: 'Straight',
        sourceID: 'managerNode',
        sourcePortID: 'p2',
        targetPoint: { x: 350, y: 440 },
        style: { strokeDashArray: '4 4' },
    },
];

// Defines default properties for connectors.
function getConnectorDefaults(connector: ConnectorModel): any {
    connector.targetDecorator.style = { fill: '#489ECC', strokeColor: '#489ECC' };
    if (connector.targetDecorator.shape === 'Arrow') {
        connector.style = { strokeColor: '#489ECC', strokeWidth: 2 };
    }
}

// tslint:disable-next-line:max-func-body-length

    
    //Initializes the nodes for the diagram
    let diagram: Diagram = new Diagram({
        width: '100%',
        height: '700px',
        nodes: nodes,
        tool: DiagramTools.ZoomPan,
        connectors: connectors,
        snapSettings: { constraints: 0 },
        getConnectorDefaults: getConnectorDefaults,
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage();


