import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Grid, Selection, GridLine, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';

Grid.Inject(Selection, Sort, Filter, Edit, Toolbar);

/**
 * Grid Lines sample
 */

    
    let lines: { [key: string]: Object }[] = [
        { id: 'Default', type: 'Default' },
        { id: 'Both', type: 'Both' },
        { id: 'None', type: 'None' },
        { id: 'Horizontal', type: 'Horizontal' },
        { id: 'Vertical', type: 'Vertical' }
    ];

    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            gridLines: 'Default',
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 140, isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'FirstName', headerText: 'Name', width: 125, validationRules: { required: true, minLength: 5 } },
                { field: 'Title', headerText: 'Title', width: 180 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'Right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }, editType: 'datepickeredit'
                }
            ]
        });
    grid.appendTo('#Grid');

    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: lines,
        fields: { text: 'type', value: 'id' },
        value: 'Default',
        change: (e: ChangeEventArgs) => {
            grid.gridLines = <GridLine>e.value;
            grid.dataBind();
            grid.refresh();
        },
    });
    dropDownListObject.appendTo('#ddlelement');


