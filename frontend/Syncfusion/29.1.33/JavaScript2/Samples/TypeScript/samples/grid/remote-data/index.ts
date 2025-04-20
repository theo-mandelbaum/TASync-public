import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { Switch } from '@syncfusion/ej2-buttons';

Grid.Inject(Page, Selection);

/**
 * RemoteData sample
 */

    
    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/api/orders';
    let data: Object = new DataManager({
        url: hostUrl,
        adaptor: new WebApiAdaptor ,
        crossDomain: true
    });
    let grid: Grid = new Grid(
        {
            dataSource: data,
            allowPaging: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 130, textAlign: 'Right' },
                { field: 'CustomerID', headerText: 'Customer ID', width: 170 },
                { field: 'EmployeeID', headerText: 'Employee ID', width: 135, textAlign: 'Right' },
                { field: 'Freight', headerText: 'Freight', width: 160, textAlign: 'Right', format: 'C2' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, textAlign: 'Center' },
            ]
        });
    grid.appendTo('#Grid');

    
    let isEnableCache: Switch = new Switch({
        change: cacheModeChange,
    });
    isEnableCache.appendTo("#checked");

    function cacheModeChange(args: any) {
        grid.dataSource = new DataManager({
            url: hostUrl,
            adaptor: new WebApiAdaptor,
            crossDomain: true,
            enableCache : args.checked
        });
    }



