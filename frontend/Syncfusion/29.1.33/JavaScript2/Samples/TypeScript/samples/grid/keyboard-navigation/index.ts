import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Group, Page, Selection, Sort, Toolbar } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';
import { Reorder } from '@syncfusion/ej2-grids';
import { Filter } from '@syncfusion/ej2-grids';
import { Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Selection, Sort, Group, Filter, Reorder, Edit, Toolbar);



    
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            allowGrouping: true,
            allowSorting: true,
            height: 365,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
            allowFiltering: true,
            filterSettings: { type: 'Menu' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 120
                },
                {
                    field: 'CustomerID', headerText: 'Customer ID',
                    validationRules: { required: true }, width: 140
                },
                {
                    field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit',
                    width: 120, format: 'C2', validationRules: { required: true }
                },
                {
                    field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', textAlign: 'Right',
                    format: 'yMd', width: 170, allowGrouping: false
                },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit:  { params:  {  popupHeight:  '300px' } }
                }],
            pageSettings: { pageCount: 5 },
        });
    grid.appendTo('#Grid');
