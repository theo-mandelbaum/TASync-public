import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Edit, Page, CommandColumn, Sort, Filter } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

/**
 * Command column sample
 */
Grid.Inject(Edit, Page, CommandColumn, Sort, Filter);


    
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false },
            allowPaging: true,
            pageSettings: {pageCount: 5},
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                    validationRules: { required: true }, width: 120
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
                    field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit',
                    format: 'yMd', width: 170
                },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit: { params: { popupHeight: '300px' } }
                },
                { headerText: 'Manage Records', width: 160,
                    commands: [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
                        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
                        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
                        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }]
                }
            ]
        });
    grid.appendTo('#Grid');
