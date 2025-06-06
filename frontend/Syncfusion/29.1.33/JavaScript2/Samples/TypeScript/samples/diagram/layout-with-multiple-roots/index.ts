import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

//Importing necessary modulesbpmn
 import {
    Diagram,
    NodeModel,
    ConnectorModel,
    DiagramTools,
    DataBinding,
    TextStyleModel,
    ShapeStyleModel,
    HierarchicalTree,
    SnapConstraints,
    TextModel,
  } from '@syncfusion/ej2-diagrams';
  import { DataManager, Query } from '@syncfusion/ej2-data';
  
  Diagram.Inject(DataBinding, HierarchicalTree);

  export interface EmployeeInfo {
    Label: string;
  }
  //Initializes the data
  let data: Object[] = [
    { id: 1, Label: 'Production Manager', color:'#1c5b9b' },
    { id: 2, Label: 'Control Room', parentId: 1, color:'#18c1be' },
    { id: 3, Label: 'Plant Operator', parentId: 1, color:'#18c1be' },
    { id: 4, Label: 'Foreman', parentId: 2, color:'#17a573' },
    { id: 5, Label: 'Foreman', parentId: 3, color:'#17a573'  },
    { id: 6, Label: 'Craft Personnel', parentId: 4, color:'#73bb34' },
    { id: 7, Label: 'Craft Personnel', parentId: 4, color:'#73bb34' },
    { id: 8, Label: 'Craft Personnel', parentId: 5, color:'#73bb34' },
    { id: 9, Label: 'Craft Personnel', parentId: 5, color:'#73bb34' },
    { id: 10, Label: 'Administrative Officer' , color:'#1c5b9b'},
    { id: 11, Label: 'Security Supervisor', parentId: 10 , color:'#18c1be'},
    { id: 12, Label: 'HR Supervisor', parentId: 10 , color:'#18c1be'},
    { id: 13, Label: 'Reception Supervisor', parentId: 10 , color:'#18c1be'},
    { id: 14, Label: 'Securities', parentId: 11, color:'#17a573'  },
    { id: 15, Label: 'HR Officer', parentId: 12, color:'#17a573'  },
    { id: 16, Label: 'Receptionist', parentId: 13 , color:'#17a573' },
    { id: 17, Label: 'Maintainence Manager', color:'#1c5b9b' },
    { id: 18, Label: 'Electrical Supervisor', parentId: 17 , color:'#18c1be'},
    { id: 19, Label: 'Mechanical Supervisor', parentId: 17 , color:'#18c1be'},
    { id: 20, Label: 'Craft Personnel', parentId: 18 , color:'#17a573' },
    { id: 21, Label: 'Craft Personnel', parentId: 19 , color:'#17a573' },
  ];
  
  let items: DataManager = new DataManager(data as JSON[], new Query().take(7));

   //Define the default node properties
   function nodeDefaults(obj: NodeModel): NodeModel {
    (obj.style as ShapeStyleModel).fill = (obj.data as any).color;
    obj.backgroundColor = (obj.data as any).color;
    (obj.style as TextStyleModel).color = 'white';
    (obj.style as ShapeStyleModel).strokeWidth = 2;  
    obj.width = 75;
    obj.height = 35;
    (obj.shape as TextModel).margin = { left: 5, right: 5, bottom: 5, top: 5 };
    return obj;
  }
 // Defines the default properties for connectors.
  function connectorDefaults(
    connector: ConnectorModel
  ): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: 'CornflowerBlue' };
    connector.targetDecorator = { shape: 'Arrow', height: 10, width: 10, style: { fill: 'CornflowerBlue', strokeColor: 'white' } };
    return connector;
  }
  
  
  // tslint:disable-next-line:max-func-body-length
  
    
  //Initializes the nodes in the diagram
  let diagram: Diagram = new Diagram({
    width: '100%',
    height: '499px',
    snapSettings: { constraints: SnapConstraints.None },
    //configures data source settings
    dataSourceSettings: {
      //sets the fields to bind
      id: 'id',
      parentId: 'parentId',
      dataSource: items,
     // Binds data to the nodes.
      doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
        nodeModel.shape = { type: 'Text', content: (data as any).Label };
      },
    },
   // Disables all interactions except zoom and pan.
    tool: DiagramTools.ZoomPan,
    //Configures automatic layout
    layout: {
      type: 'HierarchicalTree',
      verticalSpacing: 30,
      horizontalSpacing: 40,
    },
    // Defines the default properties for nodes and connectors.
    getNodeDefaults: nodeDefaults,
    getConnectorDefaults: connectorDefaults,
  });
  diagram.appendTo('#diagram');

  
 