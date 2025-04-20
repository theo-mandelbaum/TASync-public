import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
/**
 * TreeView checkbox sample
 */

    
    // Render the TreeView with checkboxes
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
        showCheckBox: true,
    });
    treeObj.appendTo('#tree');

    let checkObj: CheckBox = new CheckBox({
        checked: true,
        label: 'Auto Check',
        change: (args: ChangeEventArgs) => {
            treeObj.autoCheck = args.checked;
        }
    });
    checkObj.appendTo('#check');
