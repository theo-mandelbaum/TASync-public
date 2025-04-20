define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-pivotview", "@syncfusion/ej2-base", "./pivot-data/Pivot_Data.json"], function (require, exports, culture_loader_1, ej2_pivotview_1, ej2_base_1, pivotData) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, ej2_base_1.enableRipple)(false);
    ej2_pivotview_1.PivotView.Inject(ej2_pivotview_1.GroupingBar, ej2_pivotview_1.FieldList);
    var Pivot_Data = pivotData.data;
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var pivotObj = new ej2_pivotview_1.PivotView({
            dataSourceSettings: {
                dataSource: Pivot_Data,
                expandAll: false,
                enableSorting: true,
                formatSettings: [{ name: 'Amount', format: 'C0' }],
                values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
                    { name: 'Amount', caption: 'Sold Amount' }],
                filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
                columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
                rows: [{ name: 'Country' }, { name: 'Products' }],
            },
            width: '100%',
            height: 300,
            allowCalculatedField: true,
            showGroupingBar: true,
            showFieldList: true,
            enableRtl: true,
            gridSettings: { columnWidth: 140 }
        });
        pivotObj.appendTo('#PivotView');
    };
});
