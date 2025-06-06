import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Sample for Radial tree
 */
//Importing necessary modules
import {
    Diagram, NodeModel, DiagramTools, BasicShapeModel,
    NodeConstraints, ZoomOptions, DataBinding, RadialTree, SnapConstraints
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import * as Data from './diagram-data.json';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, RadialTree);

let diagram: Diagram;


// Click event to perform Zoom In, Zoom Out, and Reset based on the option
function onItemClick(args: ClickEventArgs): void {
    switch (args.item.text) {
        case 'Zoom In':
            let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
            diagram.zoomTo(zoomin);
            break;
        case 'Zoom Out':
            let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
            diagram.zoomTo(zoomout);
            break;
        case 'Reset':
            diagram.reset();
            diagram.fitToPage();
            break;
    }
}
// tslint:disable-next-line:max-func-body-length

    
    //Initialize diagram control
    diagram = new Diagram({
        width: '100%', height: '600px', snapSettings: { constraints: SnapConstraints.None },
        //configures data source settings
        dataSourceSettings: {
            //sets the fields to bind
            id: 'Id', parentId: 'ReportingPerson',
            dataSource: new DataManager((Data as any).radialTree),
             //bind data to the nodes
            doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
                nodeModel.annotations = [{
                    content: data.Name,
                    style: data.Id === 'parent' ? { color: 'white', fontSize: 50 } : { color: 'black', fontSize: 20 }
                }];
                nodeModel.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
                nodeModel.tooltip = {
                    content: data.Name + '<br/>' + data.Designation, relativeMode: 'Object',
                    position: 'TopCenter', showTipPointer: true,
                };
                if (data.Designation === 'Managing Director') {
                    nodeModel.width = 400;
                    nodeModel.height = 400;
                    nodeModel.shape = { shape: 'Ellipse' } as BasicShapeModel;
                    nodeModel.style = { fill: 'black' };
                } else if (data.Designation === 'Project Manager') {
                    nodeModel.width = 130;
                    nodeModel.height = 130;
                    nodeModel.height = 130;
                    nodeModel.style = { fill: '#f8ab52' };
                } else {
                    nodeModel.width = 100;
                    nodeModel.height = 100;
                    nodeModel.shape = { shape: 'Ellipse' } as BasicShapeModel;
                    nodeModel.style = { fill: '#afeeee' };
                }
            }
        },
        //Disables all interactions except zoom and pan
        tool: DiagramTools.ZoomPan,
        //Configures automatic layout
        layout: {
            type: 'RadialTree', verticalSpacing: 30, horizontalSpacing: 20,
            root: 'Category',
        }
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage();
   // Creates and adds ZoomIn, ZoomOut, and Reset options to the Toolbar.
    let toolbarObj: Toolbar = new Toolbar({
        clicked: onItemClick,
        items: [
            {
                type: 'Button', tooltipText: 'ZoomIn', text: 'Zoom In', prefixIcon: 'e-ddb-icons e-zoomin',
            },
            {
                type: 'Separator'
            },
            {
                type: 'Button', tooltipText: 'ZoomOut', text: 'Zoom Out', prefixIcon: 'e-ddb-icons e-zoomout',
            },
            {
                type: 'Separator'
            },
            {
                type: 'Button', tooltipText: 'Reset', text: 'Reset', prefixIcon: 'e-diagram-icons e-diagram-reset',
            }
        ]
    });

    toolbarObj.appendTo('#toolbar');

