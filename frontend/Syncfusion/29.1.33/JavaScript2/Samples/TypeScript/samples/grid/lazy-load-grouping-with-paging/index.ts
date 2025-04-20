import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Page, Group, LazyLoadGroup, Sort } from '@syncfusion/ej2-grids';
import { lazyLoadData, createLazyLoadData } from './data-source';
/**
 * lazy load grouping sample
 */
Grid.Inject(Page, Group, LazyLoadGroup, Sort);


    
    /* create lazyLoadData */
    createLazyLoadData();
    let grid: Grid = new Grid(
        {
            dataSource: lazyLoadData,
            allowPaging: true,
            allowGrouping: true,
            allowSorting: true,
            groupSettings: { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] },
            height: 400,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, allowGrouping: false },
                { field: 'ProductName', headerText: 'Product Name', width: 160 },
                { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
                { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 }
            ]
        });
    grid.appendTo('#Grid');

