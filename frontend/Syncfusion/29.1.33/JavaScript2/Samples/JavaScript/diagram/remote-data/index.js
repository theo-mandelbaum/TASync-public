ej.base.enableRipple(window.ripple)
/**
 * Remote Data binding sample
 */

    //Initializes diagram control
    var diagram = new ej.diagrams.Diagram({
        width: '100%', height: 490,
        //Configrues hierarchical tree layout
        layout: {
            type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
            verticalSpacing: 40,
        },
        //Sets the default values of nodes
        getNodeDefaults: function (node) {
            node.width = 80;
            node.height = 40;
            node.shape = { type: 'Basic', shape: 'Rectangle' };
            node.style = { fill: '#048785', strokeColor: 'Transparent' };
            return node;
        },
        //Sets the default values of connector
        getConnectorDefaults: function (connector) {
            connector.type = 'Orthogonal';
            connector.style.strokeColor = '#048785';
            connector.targetDecorator.shape = 'None';
            return connector;
        },
        //Configures data source
        dataSourceSettings: {
            id: 'Id', parentId: 'ParentId',
            dataSource: new ej.data.DataManager(
                { url: 'https://ej2services.syncfusion.com/production/web-services/api/RemoteData', crossDomain: true }
            ),
            //binds the external data with node
            doBinding: function (nodeModel, data, diagram) {
                nodeModel.annotations = [{
                    content: data.Label,
                    style: { color: 'white' }
                }];
            }
        },
        //Disables all interactions except zoom/pan
        tool: ej.diagrams.DiagramTools.ZoomPan,
        snapSettings: { constraints: 0 }
    });
    diagram.appendTo('#diagram');
