import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TreeGrid, Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort, RowDD } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Resize, ExcelExport, PdfExport, Edit, Page, ContextMenu, Sort, RowDD);

/**
 * Context menu in grid sample
 */

    
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowExcelExport: true,
            allowPdfExport: true,
            allowSorting: true,
            allowResizing: true,
            childMapping: 'subtasks',
            height: 350,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            treeColumnIndex: 1,
            editSettings: { allowAdding: true, allowDeleting: true, allowEditing: true, mode: 'Row' },
            contextMenuItems: ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
                 'Edit', 'Delete', 'Save', 'Cancel',
                'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
                'LastPage', 'NextPage','Indent', 'Outdent'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 140, minWidth: 130, isPrimaryKey: true, textAlign: 'Right', editType: 'numericedit' },
                { field: 'taskName', headerText: 'Task Name', width: 180 },
                { field: 'startDate', headerText: 'Start Date', format: 'yMd', width: 130,
                    editType: 'datepickeredit', textAlign: 'Right' },
                { field: 'endDate', headerText: 'End Date', format: 'yMd', width: 130, editType: 'datepickeredit', textAlign: 'Right' },
                { field: 'duration', headerText: 'Duration', width: 130, minWidth:120,textAlign: 'Right', editType: 'numericedit',
                     edit: {params: {format: 'n'}} },
                { field: 'priority', headerText: 'Priority', width: 120 }
            ]
        });
    treegrid.appendTo('#TreeGrid');

