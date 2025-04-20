ej.base.enableRipple(window.ripple)
/**
 * Remote data binding sample.
 */


    var fieldsOrder = ["OrderID", "CustomerID", "Freight", "ShipName", "ShipCity", "ShipCountry"];

    //Initialize Query to select required columns with defined record count.
    var query = new ej.data.Query().from('Orders').take(20);

    //Initialize DataManager.
    var data = new ej.data.DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ej.data.ODataV4Adaptor(), 
        crossDomain: true
    });

    //Initialize Spreadsheet component.
    var spreadsheet = new ej.spreadsheet.Spreadsheet({
        sheets: [{
            name: 'Shipment Details',
            rows: [{
                cells: [{ value: 'Order ID' }, { value: 'Customer Name' }, { value: 'Freight' }, { value: 'Ship Name' },
                { value: 'Ship City' }, { value: 'Ship Country' }]
            }],
            ranges: [{ dataSource: data, fieldsOrder: fieldsOrder, query: query, showFieldAsHeader: false, startCell: 'A2' }],
            columns: [{ width: 100 }, { width: 130 }, { width: 100 }, { width: 220 }, { width: 150 }, { width: 180 }]
        }],
        openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open',
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
        created: function () {
            //Apply style to a range
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        }
    });

    //Render initialized Spreadsheet component.
    spreadsheet.appendTo('#spreadsheet');
