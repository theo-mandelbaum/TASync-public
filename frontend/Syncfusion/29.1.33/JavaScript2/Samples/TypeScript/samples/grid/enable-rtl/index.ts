import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Group, Page, Selection, Sort } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';
import { Reorder } from '@syncfusion/ej2-grids';
import { Filter } from '@syncfusion/ej2-grids';
import { Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Selection, Sort, Group, Filter, Reorder, Edit);

/**
 * Default Page sample
 */

    
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            allowGrouping: true,
            allowSorting: true,
            enableRtl: true,
            allowReordering: true,
            editSettings: { allowEditing: true, allowAdding: false, allowDeleting: false, mode: 'Normal' },
            allowFiltering: true,
            filterSettings: { type: 'Menu' },
            columns: [
                {
                    field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right',
                    editType: 'numericedit', isPrimaryKey: true, validationRules: { required: true }
                },
                { field: 'CustomerID', headerText: 'Customer Name', width: 150, textAlign: 'Left' },
                {
                    field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd', editType: 'datepickeredit', textAlign: 'Right', allowGrouping: false
                },
                { field: 'Freight', width: 120, format: 'C2', editType: 'numericedit', textAlign: 'Right' },
                { field: 'ShipCountry', headerText: 'Ship Country', textAlign: 'Left', width: 150, editType: 'dropdownedit' }
            ],
            pageSettings: { pageSize: 10, pageCount: 2 },
        });
    grid.appendTo('#Grid');

