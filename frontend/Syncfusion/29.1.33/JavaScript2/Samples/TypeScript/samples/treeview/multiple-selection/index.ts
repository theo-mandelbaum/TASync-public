import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView multi selection sample
 */

    
    // Render the TreeView with node multi select option
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).multiSelectData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild',
                selected: 'isSelected' },
        allowMultiSelection: true,
    });
    treeObj.appendTo('#tree');
