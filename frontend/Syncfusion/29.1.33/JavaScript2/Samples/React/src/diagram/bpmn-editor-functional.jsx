// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the BPMN editor.
import * as React from "react";
import { SymbolPaletteComponent, NodeConstraints, DiagramComponent, Inject, BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding, } from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import "./bpmn-icons.css"; // Importing CSS for BPMN icons
let diagram;
// Function to initialize a node
const createNode = (id, width, height, offsetX, offsetY, shape, annotations = [], margin = {}, style = {}, constraints = NodeConstraints.Default) => ({
    id: id,
    width: width,
    height: height,
    offsetX: offsetX,
    offsetY: offsetY,
    shape: shape,
    annotations,
    margin: margin,
    style: style,
    constraints: constraints
});
//Initializes the nodes for the diagram.
let nodes = [
    createNode('start', 40, 40, 35, 180, { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } }),
    createNode('subProcess', 520, 250, 355, 180, { shape: 'Activity', type: 'Bpmn', activity: { activity: 'SubProcess',
            subProcess: { type: 'Transaction', collapsed: false, processes: ['processesStart', 'service', 'compensation',
                    'error', 'processesTask', 'processesEnd', 'user', 'subProcessesEnd'] } } }, [], {}, {}, NodeConstraints.Default | NodeConstraints.AllowDrop),
    createNode('hazardEnd', 40, 40, 305, 370, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [
        { id: 'label2', content: 'Hazard', verticalAlignment: 'Top', style: { fill: 'white', color: 'black' }, margin: { top: 20 } }
    ]),
    createNode('cancelledEnd', 40, 40, 545, 370, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [
        { id: 'cancelledEndLabel2', content: 'Cancelled', verticalAlignment: 'Top', style: { fill: 'white', color: 'black' }, margin: { top: 20 } }
    ]),
    createNode('end', 40, 40, 665, 180, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }),
    createNode('processesStart', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } }, [], { left: 40, top: 80 }),
    createNode('service', 95, 70, 0, 0, {
        type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Service', loop: 'ParallelMultiInstance' } }
    }, [{ id: 'serviceLabel2', content: 'Book hotel', style: { color: 'white' }, offset: { x: 0.5, y: 0.5 } }], { left: 110, top: 20 }, { fill: '#6FAAB0' }),
    createNode('compensation', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate', trigger: 'Compensation' } }, [], { left: 170, top: 100 }),
    createNode('processesTask', 95, 70, 0, 0, {
        type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Service' } }
    }, [{ id: 'serviceLabel2', content: 'Charge credit card', style: { color: 'white' }, offset: { x: 0.5, y: 0.6 } }], { left: 290, top: 20 }, { fill: '#F6B53F' }),
    createNode('error', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate', trigger: 'Error' } }, [], { left: 350, top: 100 }),
    createNode('processesEnd', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [], { left: 440, top: 80 }),
    createNode('user', 90, 80, 0, 0, {
        type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'User', compensation: true } }
    }, [{ id: 'serviceLabel2', content: 'Cancel hotel reservation', style: { color: 'white' }, offset: { x: 0.5, y: 0.6 } }], { left: 30, top: 160 }, { fill: '#E94649' }),
    createNode('subProcessesEnd', 30, 30, 0, 0, { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }, [], { left: 440, top: 210 }),
];
// Function to create a connector
const createConnector = (id, sourceID, targetID, sourcePortID = " ", targetPortID = "", type = "Orthogonal", segments = [], annotations = [], shape = {}, style = {}) => ({
    id: id,
    sourceID: sourceID,
    targetID: targetID,
    sourcePortID: sourcePortID,
    targetPortID: targetPortID,
    type: type,
    segments: segments,
    annotations: annotations,
    shape: shape,
    style: style
});
//Initializes the connectors for the diagram.
let connectors = [
    createConnector('connector1', 'start', 'subProcess'),
    createConnector('connector2', 'subProcess', 'end', 'success'),
    createConnector('connector3', 'subProcess', 'hazardEnd', 'failure', "", 'Orthogonal', [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }], [{ id: 'connector3Label2', content: 'Booking system failure', offset: 0.50, style: { fill: 'white' } }]),
    createConnector('connector4', 'subProcess', 'cancelledEnd', 'cancel', "", 'Orthogonal', [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]),
    createConnector('connector5', 'processesStart', 'service', "", "", 'Orthogonal'),
    createConnector('connector6', 'service', 'processesTask'),
    createConnector('connector7', 'processesTask', 'processesEnd', "", "", 'Orthogonal'),
    createConnector('connector8', 'compensation', 'user', "", "", 'Orthogonal', [{ type: 'Orthogonal', length: 30, direction: 'Bottom' }, { type: 'Orthogonal', length: 80, direction: 'Left' }], [], { type: 'Bpmn', flow: 'Association', association: 'Directional' }, { strokeDashArray: '2,2' }),
    createConnector('connector9', 'error', 'subProcessesEnd', null, null, 'Orthogonal', [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }], [{ id: 'connector9Label2', content: 'Cannot charge card', offset: 0.5,
            style: { fill: 'white', color: 'black' } }])
];
//Initializes the bpmn shapes for the symbol pallete.
let bpmnShapes = [
    {
        id: 'Start', width: 35, height: 35, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        }
    },
    {
        id: 'NonInterruptingIntermediate', width: 35, height: 35, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'NonInterruptingIntermediate' }
        },
    },
    {
        id: 'End', width: 35, height: 35, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End' }
        },
    },
    {
        id: 'Task', width: 35, height: 35, shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',
            },
        }
    },
    {
        id: 'Transaction', width: 35, height: 35, shape: {
            type: 'Bpmn', shape: 'Activity',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', transaction: {
                        cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                    }
                }
            }
        }
    },
    {
        id: 'Task_Service', width: 35, height: 35, shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task', task: { type: 'Service' }
            },
        }
    },
    {
        id: 'Gateway', width: 35, height: 35, shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } },
    },
    {
        id: 'DataObject', width: 35, height: 35, shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } }
    },
    {
        id: 'subProcess', width: 520, height: 250,
        constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
        shape: {
            shape: 'Activity', type: 'Bpmn',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', collapsed: false,
                    processes: [], transaction: {
                        cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                    }
                }
            }
        }
    },
];
//Initializes the context menu for shapes.
let contextMenu = {
    show: true, items: [
        {
            text: 'Ad-Hoc', id: 'Adhoc',
            items: [{ text: 'None', iconCss: 'e-adhocs e-bpmn-event e-bpmn-icons e-None', id: 'AdhocNone' },
                { iconCss: 'e-adhocs e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }]
        }, {
            text: 'Loop', id: 'Loop',
            items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
                { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
                { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
                { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
            text: 'Compensation', id: 'taskCompensation',
            items: [{ text: 'None', iconCss: 'e-compensation e-bpmn-icons e-None', id: 'CompensationNone' },
                { iconCss: 'e-compensation e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }]
        }, {
            text: 'Activity-Type', id: 'Activity-Type',
            items: [{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
                { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }]
        }, {
            text: 'Boundry', id: 'Boundry',
            items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
                { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
                { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' }]
        }, {
            text: 'Data Object', id: 'DataObject',
            items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
                { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
                { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
            text: 'Collection', id: 'collection',
            items: [{ text: 'None', iconCss: 'e-collection e-bpmn-icons e-None', id: 'collectionNone' },
                { text: 'Collection', iconCss: 'e-collection e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }]
        }, {
            text: 'Call', id: 'DeftCall',
            items: [{ text: 'None', iconCss: 'e-call e-bpmn-icons e-None', id: 'CallNone' },
                { text: 'Call', iconCss: 'e-call e-bpmn-icons e-CallActivity', id: 'CallCall' }]
        }, {
            text: 'Trigger Result', id: 'TriggerResult',
            items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
                { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
                { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
                { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
                { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
                { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
                { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
                { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
                { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
                { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
                { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
                { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
                { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
            ]
        },
        {
            text: 'Event Type', id: 'EventType',
            items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
                { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
                { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
                { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-ThrowingIntermediate' },
                {
                    text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate',
                    iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
                },
                { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
            text: 'Task Type', id: 'TaskType',
            items: [
                { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
                { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
                { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
                { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
                { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
                { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
                { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-OutMessage' },
                { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
            ]
        }, {
            text: 'GateWay', id: 'GateWay',
            iconCss: 'e-bpmn-icons e-Gateway', items: [
                { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None' },
                { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
                { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
                { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
                { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
                { text: 'EventBased', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
                { text: 'ExclusiveEventBased', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
                { text: 'ParallelEventBased', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
            ]
        },
    ],
    showCustomMenuOnly: true,
};
// Define a variable to hold an instance of the DiagramComponent
let diagramInstance;
// Define the function BpmnEditor
function BpmnEditor() {
    React.useEffect(() => {
        // Call functions to update sample section and render completion
        updateSampleSection();
        rendereComplete();
    }, []);
    function rendereComplete() {
        diagramInstance.fitToPage();
    }
    // Define the function getConnectors
    function getConnectors() {
        //Initializes the Connector shapes for the symbol pallete.
        let connectorSymbols = [
            {
                id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeColor: '#757575' }
            },
            {
                id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeDashArray: '4 4', strokeColor: '#757575' }
            },
            {
                id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 2, strokeColor: '#757575' }
            },
            {
                id: 'link4', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
                targetDecorator: { style: { strokeColor: '#757575', fill: '#757575' } },
                shape: {
                    type: 'Bpmn',
                    flow: 'Association',
                    association: 'Directional'
                }, style: {
                    strokeDashArray: '2,2', strokeColor: '#757575'
                },
            },
        ];
        return connectorSymbols;
    }
    //function context menu click
    function contextMenuClick(args) {
        diagram = diagramInstance;
        if (diagram.selectedItems.nodes.length > 0) {
            let bpmnShape = diagram.selectedItems.nodes[0].shape;
            if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                bpmnShape.activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
            }
            if (args.item.iconCss.indexOf('e-event') > -1) {
                bpmnShape.event.event = args.item.id;
            }
            if (args.item.iconCss.indexOf('e-trigger') > -1) {
                bpmnShape.event.trigger = args.item.text;
            }
            if (args.item.iconCss.indexOf('e-loop') > -1) {
                let loop = (args.item.id === 'LoopNone') ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.loop = loop;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.loop = loop;
                }
            }
            if (args.item.iconCss.indexOf('e-compensation') > -1) {
                let compensation = (args.item.id === 'CompensationNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.compensation = compensation;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.compensation = compensation;
                }
            }
            if (args.item.iconCss.indexOf('e-call') > -1) {
                let compensation = (args.item.id === 'CallNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.call = compensation;
                }
            }
            if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'ExpandedSubProcess') {
                if (args.item.id === 'ExpandedSubProcess') {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = false;
                }
                else {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = true;
                }
            }
            if (args.item.iconCss.indexOf('e-boundry') > -1) {
                let call = args.item.id;
                if (args.item.id !== 'Default') {
                    call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                }
                bpmnShape.activity.subProcess.boundary = call;
            }
            if (args.item.iconCss.indexOf('e-data') > -1) {
                let call = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                bpmnShape.dataObject.type = call;
            }
            if (args.item.iconCss.indexOf('e-collection') > -1) {
                let call = (args.item.id === 'Collectioncollection') ? true : false;
                bpmnShape.dataObject.collection = call;
            }
            if (args.item.iconCss.indexOf('e-task') > -1) {
                let task = args.item.id === 'TaskNone' ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.type = task;
                }
            }
            if (args.item.iconCss.indexOf('e-gate') > -1) {
                let task = args.item.id.replace('Gateway', '');
                if (bpmnShape.shape === 'Gateway') {
                    bpmnShape.gateway.type = task;
                }
            }
            diagram.dataBind();
        }
    }
    // Define a function to handle opening the context menu
    function contextMenuOpen(args) {
        diagram = diagramInstance;
        let hiddenId = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject',
                'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay'];
        }
        // Check if nodes are selected
        if (diagram.selectedItems.nodes.length) {
            for (let item of args.items) {
                let bpmnShape = diagram.selectedItems.nodes[0].shape;
                if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                    if (item.text === 'Ad-Hoc') {
                        if (bpmnShape.activity.activity === 'SubProcess') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Loop' || item.text === 'Compensation' || item.text === 'Activity-Type') {
                        if (bpmnShape.shape === 'Activity') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Boundry') {
                        if (bpmnShape.activity.activity === 'SubProcess') {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                }
                if (item.text === 'Data Object') {
                    if (bpmnShape.shape === 'DataObject') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Collection') {
                    if (bpmnShape.shape === 'DataObject') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Call') {
                    if (bpmnShape.shape === 'Activity' && bpmnShape.activity.activity === 'Task') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Trigger Result') {
                    if ((bpmnShape.shape === 'Event')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Event Type') {
                    if ((bpmnShape.shape === 'Event')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Task Type') {
                    if ((bpmnShape.shape === 'Activity')
                        && (bpmnShape.activity.activity === 'Task')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'GateWay') {
                    if ((bpmnShape.shape === 'Gateway')) {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (args.parentItem && args.parentItem.id === 'TriggerResult' && bpmnShape.shape === 'Event') {
                    if (item.text !== 'None' && (item.text === bpmnShape.event.event || item.text === bpmnShape.event.trigger)) {
                        hiddenId.push(item.id);
                    }
                    if (bpmnShape.event.event === 'Start') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Link') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'NonInterruptingStart' || item.text === 'Link') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                            item.text === 'Error' || item.text === 'None') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'Intermediate') {
                        if (item.text === 'Terminate') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'NonInterruptingIntermediate') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                            item.text === 'Error' || item.text === 'None' || item.text === 'Link') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'ThrowingIntermediate') {
                        if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Timer' || item.text === 'Error' ||
                            item.text === 'None' || item.text === 'Pareller' || item.text === 'Conditional') {
                            hiddenId.push(item.id);
                        }
                    }
                    if (bpmnShape.event.event === 'End') {
                        if (item.text === 'Parallel' || item.text === 'Timer' || item.text === 'Conditional' || item.text === 'Link') {
                            hiddenId.push(item.id);
                        }
                    }
                }
                if (args.parentItem && args.parentItem.id === 'EventType' && bpmnShape.shape === 'Event') {
                    if (item.text === bpmnShape.event.event) {
                        hiddenId.push(item.id);
                    }
                }
            }
        }
        args.hiddenItems = hiddenId;
    }
    return (<div className="control-pane">
            <div className="control-section">
                <div className="sb-mobile-palette-bar">
                    <div id="palette-icon" style={{ float: "right" }} className="e-ddb-icons1 e-toggle-palette"></div>
                </div>
                <div id="palette-space" className="sb-mobile-palette">
                    <SymbolPaletteComponent 
    //Sets the default values of a Symbol Palette Component 
    id="symbolpalette" expandMode="Multiple" 
    // Palette configurations for BPMN shapes and connectors
    palettes={[
            {
                id: "Bpmn",
                expanded: true,
                symbols: bpmnShapes,
                iconCss: "e-diagram-icons1 e-diagram-Bpmn",
                title: "Bpmn Shapes"
            },
            {
                id: "connectors",
                expanded: true,
                symbols: getConnectors(),
                iconCss: "e-diagram-icons1 e-diagram-connector",
                title: "Connectors"
            }
        ]} width={"100%"} height={"471px"} symbolHeight={60} symbolWidth={60} symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }} getNodeDefaults={(symbol) => {
            symbol.style.strokeColor = '#757575';
        }} getSymbolInfo={(symbol) => {
            return { fit: true };
        }}>
                        <Inject services={[BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding]}/>
                    </SymbolPaletteComponent>
                </div>

                <div id="diagram-space" className="sb-mobile-diagram sb-bpmn-editor">
                    {/* Initialize a Diagram component */}
                    <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"445px"} snapSettings={{ constraints: 0 }} nodes={nodes} connectors={connectors} 
    //Sets the default values of a node
    contextMenuSettings={contextMenu} contextMenuOpen={contextMenuOpen} contextMenuClick={contextMenuClick} dragEnter={(args) => {
            let node = args.element;
            if (node instanceof Node) {
                if (!node.shape.activity.subProcess.collapsed) {
                    node.shape.activity.subProcess.transaction.cancel.visible = true;
                    node.shape.activity.subProcess.transaction.failure.visible = true;
                    node.shape.activity.subProcess.transaction.success.visible = true;
                }
                else {
                    let ratio = 100 / node.width;
                    let oldWidth = node.width;
                    let oldHeight = node.height;
                    node.width = 100;
                    node.height *= ratio;
                    node.offsetX += (node.width - oldWidth) / 2;
                    node.offsetY += (node.height - oldHeight) / 2;
                }
            }
        }}>
                        <Inject services={[BpmnDiagrams, UndoRedo, DiagramContextMenu, DataBinding]}/>
                    </DiagramComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the hotel booking reservation system with built-in BPMN shapes.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This example shows how to create a simple flow chart using the diagram control. The <code>nodes</code> property can be used to define different stages of a process. To define the flow between different stages, the <code>connectors</code> property can be used. The <code>getNodeDefaults</code> and <code>getConnectorDefaults</code> properties define the default behavior of shapes and connectors.
                    </p>

                    <p>
                        To easily build flow diagrams, few shapes are predefined and added to symbol palette. You can drag-and-drop predefined shapes into the drawing area. The <code>symbols</code> property allows you to add predefined symbols to the palette.
                    </p>

                    <p>In this example, undo and redo support is enabled.</p>
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        The diagram component’s features are segregated into individual feature-wise modules. To enable undo and redo support, inject <code>UndoRedo</code> module into <code>services</code>.
                    </p>
                    <br />
                </div>
            </div>
        </div>);
}
export default BpmnEditor;
