import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import * as dataSource from './sorting-and-filtering-data.json';

/**
 * Sorting and Filtering
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end

    

    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [{
            ranges: [{
                dataSource: (dataSource as any).sortingAndFiltering,
                showFieldAsHeader: true
            }],
            columns: [{
                width: 110
            },
            {
                width: 142
            },
            {
                width: 80
            },
            {
                width: 137
            },
            {
                width: 122
            },
            {
                width: 92
            },
            {
                width: 124
            }]
        }],
        openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open',
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
        created: () => {
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
            spreadsheet.numberFormat('m/d/yyyy', 'E2:E51');
            spreadsheet.numberFormat('$#,##0.00', 'F2:F51');
            // custom code start
            setTimeout(() => {
            // custom code end
            // Sorted B(Employee Name field) column in ascending order
            spreadsheet.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(() => {
                // Filtered D(Department  field) column with value 'Services'
                spreadsheet.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
            });
            // custom code start
            });
            // custom code end
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');

// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
