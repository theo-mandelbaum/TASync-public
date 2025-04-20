import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, freezeDirection, Column, Sort, Freeze, Filter, Edit, Toolbar} from '@syncfusion/ej2-grids';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { orderData } from './data-source';

Grid.Inject(Sort, Freeze, Filter, Edit, Toolbar);

/**
 * Grid frozen rows and columns sample
 */

    
    let data: Object = new DataManager(orderData as JSON[]).executeLocal(new Query().take(50));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            height: 410,
            enableHover: false,
            frozenRows: 2,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', freeze: 'Left', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'Freight', width: 125, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'CustomerID', headerText: 'Customer ID', width: 130, freeze: 'Right', validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 150, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'ShipName', headerText: 'Ship Name', width: 300 },
                { field: 'ShipAddress', headerText: 'Ship Address', width: 270, freeze: 'Fixed' },
                { field: 'ShipCity', headerText: 'Ship City', width: 250 },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 250, editType: 'dropdownedit' }
            ]
        });
    grid.appendTo('#Grid');

    let alertDialogObj: Dialog = new Dialog({
        header: 'Frozen',
        content: 'Atleast one Column should be Movable',
        showCloseIcon: false,
        target: '.control-section',
        buttons: [{
            click: alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true }
        }],
        width: '300px',
        visible: false,
        animationSettings: { effect: 'None' }
    });
    alertDialogObj.appendTo('#alertDialog');
    function alertDlgBtnClick(): void {
        alertDialogObj.hide();
    }

    let columnNames: { [key: string]: Object }[] = [
        { id: 'OrderID', name: 'Order ID' },
        { id: 'Freight', name: 'Freight' },
        { id: 'CustomerID', name: 'Customer ID' },
        { id: 'OrderDate', name: 'Order Date' },
        { id: 'ShipName', name: 'Ship Name' },
        { id: 'ShipAddress', name: 'Ship Address' },
        { id: 'ShipCity', name: 'Ship City' },
        { id: 'ShipCountry', name: 'Ship Country' }
    ];
    let directions: { [key: string]: Object }[] = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' },
        { id: 'Fixed', name: 'Fixed' }
    ];
    let refresh: boolean = true;
    let columnChange: DropDownList = new DropDownList({
        dataSource: columnNames,
        fields: { text: 'name', value: 'id' },
        value: 'OrderID',
        change: (e: ChangeEventArgs) => {
            let columnName: any = e.value;
            let column: Column = grid.getColumnByField(columnName);
            let value: string = column.freeze === undefined ? 'Center' : column.freeze;
            refresh = dropDownDirection.value === value;
            dropDownDirection.value = value;

        }
    });
    columnChange.appendTo('#column');

    let dropDownDirection: DropDownList = new DropDownList({
        dataSource: directions,
        fields: { text: 'name', value: 'id' },
        value: 'Left',
        change: (e: ChangeEventArgs) => {
            if (refresh) {
                let value: string = 'Left';
                let columnName: any = columnChange.value;
                let mvblColumns: Column[] = grid.getMovableColumns();
                if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
                    alertDialogObj.show();
                    refresh = false;
                    value = 'Center';
                    dropDownDirection.refresh();
                } else {
                    grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
                    grid.refreshColumns();
                }
            }
            refresh = true;
        }
    });
    dropDownDirection.appendTo('#FreezeDirection');


