import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Group, LazyLoadGroup, InfiniteScroll, Sort } from '@syncfusion/ej2-grids';
import { lazyLoadData, createLazyLoadData } from './data-source';
/**
 * lazy load grouping sample
 */
Grid.Inject(Group, LazyLoadGroup, InfiniteScroll, Sort);


    
    /* create lazyLoadData */
    createLazyLoadData();
    let grid: Grid = new Grid(
        {
            dataSource: lazyLoadData,
            allowGrouping: true,
            height: 400,
            allowSorting: true,
            enableInfiniteScrolling: true,
            groupSettings: { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, allowGrouping: false },
                { field: 'ProductName', headerText: 'Product Name', width: 160 },
                { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
                { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 }
            ]
        });
    grid.appendTo('#Grid');

