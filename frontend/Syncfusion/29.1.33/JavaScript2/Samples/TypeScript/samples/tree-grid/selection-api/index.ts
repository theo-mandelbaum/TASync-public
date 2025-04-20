import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page );

/**
 * Selection API TreeGrid sample
 */

    
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowSelection: true,
            selectionSettings: { type: 'Multiple'},
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 100, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
    let start: NumericTextBox = new NumericTextBox({
        format: '##',
        min: 0,
        max: 11,
        width: '95%'
    });

    start.appendTo('#start');
    let to: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 11,
        format: '##',
        width: '95%'
    });
    to.appendTo('#to');

    let select: Button = new Button();
    select.appendTo('#select');

    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('select').onclick = () => {
        let startRow: number = start.value;
        let toRow: number = to.value;
        let rows: number[] = [];
        for ( let i: number = startRow > toRow ? toRow : startRow ; i <= (startRow > toRow ? startRow : toRow) ; i++ ) {
            rows.push(i);
        }
        treegrid.selectRows(rows);
    };
    document.getElementById('clear').onclick = () => {
        treegrid.clearSelection();
    };
