import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeGrid, ColumnChooser, Toolbar, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';


/**
 * Column Chooser sample
 */
TreeGrid.Inject(Toolbar, ColumnChooser, Page );


    
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            showColumnChooser: true,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            toolbar: ['ColumnChooser'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left', showInColumnChooser: false },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 90 }
            ]
        });
    treegrid.appendTo('#TreeGrid');

