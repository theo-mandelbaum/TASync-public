import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { projectData } from './data-source';

/**
 * Default TreeGrid sample
 */

TreeGrid.Inject(Page);


    
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: projectData,
            height: 400,
            idMapping: 'TaskID',
            parentIdMapping: 'parentID',
            allowPaging: true,
            treeColumnIndex: 1,
            columns: [
                { field: 'TaskID', headerText: 'Task ID', textAlign: 'Right', width: 140 },
                { field: 'TaskName', headerText: 'Task Name', width: 160 },
                { field: 'StartDate', headerText: 'Start Date', textAlign: 'Right', width: 120, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'EndDate', headerText: 'End Date', textAlign: 'Right', width: 120, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'Duration', headerText: 'Duration', textAlign: 'Right', width: 110},
                { field: 'Progress', headerText: 'Progress', textAlign: 'Right', width: 110},
                { field: 'Priority', headerText: 'Priority', width: 110}
            ]
        });
    treegrid.appendTo('#TreeGrid');

