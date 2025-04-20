import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
/**
 * DropdownTree remote data sample
 */

    
    // Use data manager to get tree data from remote source
    let data: DataManager = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor,
        crossDomain: true,
    });
    // Set queries to filter and fetch remote data
    let query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    let query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);

    // Render the DropDownTree with remote data source
    let ddTreeObj: DropDownTree = new DropDownTree({
        fields: {
            dataSource: data, query: query, value: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
            child: { dataSource: data, query: query1, value: 'OrderID', parentValue: 'EmployeeID', text: 'ShipName' }
        },
        popupHeight: '200px',
        placeholder: 'Select a name',

    });
    ddTreeObj.appendTo('#ddtremote');
