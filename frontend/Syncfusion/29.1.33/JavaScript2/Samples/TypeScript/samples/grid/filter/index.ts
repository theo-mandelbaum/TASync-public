import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Grid, Filter, Page, Selection, Sort } from '@syncfusion/ej2-grids';
import { categoryData } from './data-source';
import { CheckBox } from '@syncfusion/ej2-buttons';

Grid.Inject(Filter, Page, Selection, Sort);

/**
 * Filtering sample
 */

    
    let grid: Grid = new Grid(
        {
            dataSource: categoryData,
            allowPaging: true,
            allowFiltering: true,
            allowSorting: true,
            columns: [
                { field: 'CategoryName', headerText: 'Category Name', width: 150 },
                { field: 'ProductName', headerText: 'Product Name', width: 150 },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 150, textAlign: 'Right' },
                {
                    field: 'Discontinued', headerText: 'Discontinued', width: 150,
                    textAlign: 'Center', displayAsCheckBox: true, type: 'boolean'
                }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');

    let filterbarOperator: CheckBox = new CheckBox();
    filterbarOperator.appendTo('#filterBarOperator');

    document.getElementById('filterBarOperator').onclick = () => {
        if (filterbarOperator.checked) {
            grid.filterSettings.showFilterBarOperator = true;
        } else {
            grid.filterSettings.showFilterBarOperator = false;
        }
        grid.clearFiltering();
    };

