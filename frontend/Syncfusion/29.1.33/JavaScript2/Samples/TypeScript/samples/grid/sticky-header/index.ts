import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Sort, Filter, Edit, Toolbar);
/**
 * Sticky Header Grid sample
 */

    
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 50),
            enableStickyHeader: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 135, format: 'yMd', editType: 'datepickeredit' },
                { field: 'Freight', headerText: 'Freight($)', textAlign: 'Right', width: 120, format: 'C2', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 145, format: 'yMd', editType: 'datepickeredit' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 140, editType: 'dropdownedit' }
            ]
        });
    grid.appendTo('#Grid');
