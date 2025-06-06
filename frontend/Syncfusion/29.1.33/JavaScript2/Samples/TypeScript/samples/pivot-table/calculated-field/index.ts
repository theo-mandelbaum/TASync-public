
import { PivotView, CalculatedField, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { Browser, enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);
PivotView.Inject(CalculatedField, FieldList);

/**
 * PivotView Sample with Calculated Fields.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;

    
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            dataSource: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' },
            { name: 'Sold', caption: 'Units Sold' }, { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            calculatedFieldSettings: [
                {
                    name: 'Total',
                    formula: '"Sum(In_Stock)"+"Sum(Sold)"'
                }]
        },
        allowCalculatedField: true,
        showFieldList: true,
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let button: Button = new Button({ isPrimary: true });
    button.appendTo('#calculated-field-btn');

    button.element.onclick = (): void => {
        if (Browser.isDevice) {
            (pivotObj.pivotFieldListModule.dialogRenderer as any).onShowFieldList();
        }
        else if (pivotObj.calculatedFieldModule) {
            pivotObj.calculatedFieldModule.createCalculatedFieldDialog();
        }
    };

