ej.base.enableRipple(window.ripple)

    /* create window.lazyLoadData */
    createLazyLoadData();
    var grid = new ej.grids.Grid({
        dataSource: window.lazyLoadData,
        allowPaging: true,
        allowSorting: true,
        allowGrouping: true,
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

