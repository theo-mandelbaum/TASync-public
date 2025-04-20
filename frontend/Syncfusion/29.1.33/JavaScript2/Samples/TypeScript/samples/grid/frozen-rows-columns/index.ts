import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import { Grid, Selection, Freeze, Sort, Resize, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { orderData } from './data-source';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { Browser } from '@syncfusion/ej2-base';

Grid.Inject(Selection, Freeze, Sort, Resize, Filter, Edit, Toolbar);

/**
 * Grid frozen rows and columns sample
 */

    let data: Object = new DataManager(orderData as JSON[]).executeLocal(new Query().take(50));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            height: 410,
            allowSelection: false,
            enableHover: false,
            allowSorting: true,
            allowMultiSorting: false,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            allowResizing: true,
            frozenColumns: 1,
            frozenRows: 2,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', minWidth: 10, isPrimaryKey: true },
                { field: 'Freight', width: 125, format: 'C2', minWidth: 10 },
                { field: 'CustomerID', headerText: 'Customer ID', width: 150, minWidth: 10 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 180, minWidth: 10 },
                { field: 'OrderDate', headerText: 'Order Date', width: 150, format: 'yMd', textAlign: 'Right', minWidth: 10 },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 180, format: 'yMd', textAlign: 'Right', minWidth: 10 },
                { field: 'ShipName', headerText: 'Ship Name', width: 300, minWidth: 10 },
                { field: 'ShipAddress', headerText: 'Ship Address', width: 270, minWidth: 10 },
                { field: 'ShipCity', headerText: 'Ship City', width: 250, minWidth: 10 },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 250, minWidth: 10 }
            ]
        });
    grid.appendTo('#Grid');

    //Render NumericTextbox component with specific range for frozen rows.
    let rows: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 5,
        validateDecimalOnType: true,
        decimals: 0,
        format: 'n',
        value: 2
    });
    rows.appendTo('#rows');

    //Render NumericTextbox component with specific range for frozen columns.
    let columns: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 2,
        validateDecimalOnType: true,
        decimals: 0,
        format: 'n',
        value: 1
    });
    columns.appendTo('#columns');

    //Render Button component in properties panel
    let buttonSet : Button = new Button();
    buttonSet.appendTo('#buttonSet');

    if (Browser.isDevice) {
        columns.max = 1;
        rows.max = 5;
    }

    //After clicking 'Set' button, the `frozenRows` and `frozenColumns` values will be updated in Grid.
    document.getElementById('buttonSet').onclick = (): void => {
        grid.frozenColumns = columns.value;
        grid.frozenRows = rows.value;
    };

