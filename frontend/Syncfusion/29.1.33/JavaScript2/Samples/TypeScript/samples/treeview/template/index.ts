import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';

/**
 * TreeView template sample
 */

    
    // Render the TreeView using template option
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).templateData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
        nodeTemplate: '#treeTemplate',
    });
    treeObj.appendTo('#tree');
