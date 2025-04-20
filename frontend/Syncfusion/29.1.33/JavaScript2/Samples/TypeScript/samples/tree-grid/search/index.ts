import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeGrid, Page, Toolbar, Filter} from '@syncfusion/ej2-treegrid';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { sampleData } from './data-source';

TreeGrid.Inject(Page, Toolbar, Filter);

/**
 * Search TreeGrid sample
 */

    
    let mode: { [key: string]: Object }[] = [
        { id: 'Parent', mode: 'Parent' },
        { id: 'Child', mode: 'Child' },
        { id: 'Both', mode: 'Both' },
        { id: 'None', mode: 'None' },
    ];

    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            toolbar: ['Search'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 100 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
    let dropDownMode: DropDownList = new DropDownList({
        dataSource: mode,
        popupWidth: '100%',
        width:'100px',
        fields: { text: 'mode', value: 'id' },
        value: 'Parent',
        change: (e: ChangeEventArgs) => {
            let mode: any = <string>e.value;
            grid.search('');
            grid.searchSettings.hierarchyMode = mode;
        }
    });
    dropDownMode.appendTo('#mode');

