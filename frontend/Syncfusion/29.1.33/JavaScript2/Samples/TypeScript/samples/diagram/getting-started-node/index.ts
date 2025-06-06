import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);


/**
 * Getting started -  nodes
 */
// Importing necessary modules from '@syncfusion/ej2-diagrams' package
import {
    Diagram, NodeModel, ConnectorModel, NodeConstraints, SnapConstraints,
    GradientType, RadialGradientModel, UndoRedo, ConnectorConstraints
} from '@syncfusion/ej2-diagrams';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';

// Injecting required modules
Diagram.Inject(UndoRedo);

let diagram: Diagram;
let element: CheckBox;

 //Sets the default values of a nodes
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 100;
    obj.height = 100;
    obj.shape = { type: 'Basic', shape: 'Ellipse' };
    obj.style = { fill: '#37909A', strokeColor: '#024249' };
    obj.annotations[0].margin = { left: 10, right: 10 };
    obj.annotations[0].style = { color: 'white', fill: 'none', strokeColor: 'none' };
    return obj;
}

//Sets the default values of a Connector
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.targetDecorator.style = { fill: '#024249', strokeColor: '#024249' };
    return { style: { strokeColor: '#024249', strokeWidth: 2 } };
}

//Enable or disable the Constraints(Aspect Ratio) for Node.
function setNodeConstraints(args: CheckBoxChangeEventArgs): void {
    for (let i: number = 0; i < diagram.nodes.length; i++) {
        let node: NodeModel = diagram.nodes[i];
        if (element.checked) {
            node.constraints |= NodeConstraints.AspectRatio;
        } else {
            node.constraints &= ~NodeConstraints.AspectRatio;
        }
        diagram.dataBind();
    }
}

//Enable or disable the lock Constraints for Nodes and Connectors
function setLockConstraints(args: CheckBoxChangeEventArgs): void {
    for (let i: number = 0; i < diagram.nodes.length; i++) {
        let node: NodeModel = diagram.nodes[i];
        if (args.checked) {
            node.constraints &= ~(
                NodeConstraints.Resize |
                NodeConstraints.Rotate |
                NodeConstraints.Drag |
                NodeConstraints.Delete
            );
            node.constraints |= NodeConstraints.ReadOnly;
        } else {
            node.constraints |= NodeConstraints.Default & ~NodeConstraints.ReadOnly;
        }
    }

    for (let i: number = 0; i < diagram.connectors.length; i++) {
        let connector: ConnectorModel = diagram.connectors[i];
        if (args.checked) {
            connector.constraints &= ~(
                ConnectorConstraints.DragSourceEnd |
                ConnectorConstraints.DragTargetEnd |
                ConnectorConstraints.Drag |
                ConnectorConstraints.Delete
            );
            connector.constraints |= ConnectorConstraints.ReadOnly;
        } else {
            connector.constraints |= ConnectorConstraints.Default & ~ConnectorConstraints.ReadOnly;
        }
    }
    diagram.dataBind();
}

//Set customStyle for Node.
function applyNodeStyle(
    node: NodeModel, width: number, array: string, con: NodeConstraints, type: GradientType): void {
    node.style.fill = '#37909A';
    node.style.strokeWidth = width;
    node.style.strokeColor = '#024249';
    node.style.strokeDashArray = array;
    if (type === 'None' || !type) {
        node.style.gradient.type = 'None';
    } else {
        let gradient: RadialGradientModel = {
            cx: 50, cy: 50, fx: 50, fy: 50,
            stops: [{ color: '#00555b', offset: 0 },
            { color: '#37909A', offset: 90 }],
            type: 'Radial'
        };
        node.style.gradient = gradient;
    }
    if (con & NodeConstraints.Shadow) {
        node.shadow = { angle: 45, distance: 15, opacity: 0.3, color: 'grey' };
        node.constraints |= con;
    } else {
        node.constraints &= con;
    }
    diagram.dataBind();
}

// tslint:disable-next-line:max-func-body-length

    

    let nodes: NodeModel[] = [
        { id: 'sdlc', offsetX: 300, offsetY: 288, annotations: [{ content: 'SDLC' }] },
        { id: 'support', offsetX: 150, offsetY: 250, annotations: [{ content: 'Support' }] },
        { id: 'analysis', offsetX: 300, offsetY: 150, annotations: [{ content: 'Analysis' }] },
        { id: 'design', offsetX: 450, offsetY: 250, annotations: [{ content: 'Design' }] },
        { id: 'implement', offsetX: 400, offsetY: 400, annotations: [{ content: 'implement' }] },
        { id: 'deploy', offsetX: 200, offsetY: 400, annotations: [{ content: 'Deploy' }] }
    ];

    let connections: ConnectorModel[] = [
        { id: 'connector1', sourceID: 'analysis', targetID: 'design' },
        { id: 'connector2', sourceID: 'design', targetID: 'implement' },
        { id: 'connector3', sourceID: 'implement', targetID: 'deploy' },
        { id: 'connector4', sourceID: 'deploy', targetID: 'support' },
        { id: 'connector5', sourceID: 'support', targetID: 'analysis' }
    ];

    //Initializes diagram control
    diagram = new Diagram({
        width: '100%', height: '645px', nodes: nodes, connectors: connections,
        //Sets the default values of a node
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of a Connector
        getConnectorDefaults: getConnectorDefaults,
        snapSettings: { constraints: SnapConstraints.None },
        created: created,
         //Enable or disable the AspectRatio if multiple nodes or connectors is selected .
         selectionChange: function()
         {
            if (diagram.selectedItems.nodes.length > 1 || diagram.selectedItems.connectors.length > 0) {
                element.disabled = true;
            }
            else {
                element.disabled = false;
            }
         }

    });
    diagram.appendTo('#diagram');
    function created(): void {
        diagram.fitToPage({ mode: 'Width' });
    }
    //Click event for Appearance of the Property Panel
    document.getElementById('appearance').onclick = (args: MouseEvent) => {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            for (let i: number = 0; i < diagram.nodes.length; i++) {
                let node: NodeModel = diagram.nodes[i];
                switch (target.id) {
                    case 'preview0':
                        applyNodeStyle(node, 0, '', ~NodeConstraints.Shadow, 'None');
                        break;
                    case 'preview1':
                        applyNodeStyle(node, 2, '', ~NodeConstraints.Shadow, 'None');
                        break;
                    case 'preview2':
                        applyNodeStyle(node, 2, '5 5', ~NodeConstraints.Shadow, 'None');
                        break;
                    case 'preview3':
                        applyNodeStyle(node, 2, '5 5', ~NodeConstraints.Shadow, 'Radial');
                        break;
                    case 'preview4':
                        applyNodeStyle(node, 2, '5 5', NodeConstraints.Shadow, 'None');
                        break;
                }
                // custom code start
                target.classList.add('e-selected-style');
                // custom code end
            }
        }
    };
    //Enable or disable the AspectRatio for Node.
    element = new CheckBox({ checked: false, label: 'Aspect ratio', change: setNodeConstraints });
    element.appendTo('#aspectRatio');
    //Enable or disable the Interaction for Node.
    let lockElement: CheckBox = new CheckBox({ checked: false, label: 'Lock', change: setLockConstraints });
    lockElement.appendTo('#lock');

