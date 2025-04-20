define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-pivotview", "@syncfusion/ej2-base", "./pivot-data/Pivot_Data.json", "@syncfusion/ej2-buttons"], function (require, exports, culture_loader_1, ej2_pivotview_1, ej2_base_1, pivotData, ej2_buttons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, ej2_base_1.enableRipple)(false);
    ej2_pivotview_1.PivotView.Inject(ej2_pivotview_1.GroupingBar, ej2_pivotview_1.FieldList);
    var Pivot_Data = pivotData.data;
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var pivotObj = new ej2_pivotview_1.PivotView({
            dataSourceSettings: {
                enableSorting: true,
                columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
                rows: [{ name: 'Country' }, { name: 'Products' }],
                formatSettings: [{ name: 'Amount', format: 'C0' }],
                drilledMembers: [{ name: 'Country', items: ['France'] }],
                filterSettings: [{
                        name: 'Products', type: 'Include', items: ['Bottles and Cages', 'Cleaners', 'Fenders', 'Gloves', 'Helmets',
                            'Hydration Packs', 'Jerseys', 'Mountain Bikes']
                    }],
                dataSource: Pivot_Data,
                expandAll: false,
                values: [{ name: 'Sold', caption: 'Units Sold' },
                    { name: 'Amount', caption: 'Sold Amount' }],
                filters: []
            },
            width: '100%',
            height: 450,
            showFieldList: true,
            showGroupingBar: true,
            gridSettings: {
                columnWidth: ej2_base_1.Browser.isDevice ? 100 : 140,
                layout: 'Tabular'
            }
        });
        pivotObj.appendTo('#PivotView1');
        var layoutSwitch = new ej2_buttons_1.Switch({
            checked: true,
            cssClass: 'pivot-layout-switch',
            change: function (args) {
                if (pivotObj.gridSettings.layout === 'Compact') {
                    pivotObj.gridSettings.layout = 'Tabular';
                }
                else {
                    pivotObj.gridSettings.layout = 'Compact';
                }
            }
        });
        layoutSwitch.appendTo('#layout-switch');
    };
});
