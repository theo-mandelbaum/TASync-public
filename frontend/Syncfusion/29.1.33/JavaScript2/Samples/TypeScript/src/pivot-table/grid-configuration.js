define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-pivotview", "@syncfusion/ej2-buttons", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-base", "./pivot-data/defaultData.json"], function (require, exports, culture_loader_1, ej2_pivotview_1, ej2_buttons_1, ej2_dropdowns_1, ej2_base_1, pData) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, ej2_base_1.enableRipple)(false);
    ej2_pivotview_1.PivotView.Inject(ej2_pivotview_1.FieldList);
    var defaultData = pData.data;
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var pivotObj = new ej2_pivotview_1.PivotView({
            dataSourceSettings: {
                rows: [{ name: 'Country' }, { name: 'Products' }],
                formatSettings: [{ name: 'Amount', format: 'C0' }],
                enableSorting: true,
                columns: [{ name: 'Year' }, { name: 'Quarter' }],
                valueSortSettings: { headerDelimiter: ' - ' },
                values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
                dataSource: defaultData,
                expandAll: false,
                filters: []
            },
            width: '100%',
            height: 300,
            showFieldList: true,
            gridSettings: {
                allowReordering: true,
                allowResizing: true,
                columnWidth: 140
            }
        });
        pivotObj.appendTo('#PivotView');
        var reorder = new ej2_buttons_1.CheckBox({ label: 'Allow Reordering', checked: true, change: onChange });
        reorder.appendTo('#reorder');
        var resize = new ej2_buttons_1.CheckBox({ label: 'Allow Resizing', checked: true, change: onChange });
        resize.appendTo('#resize');
        var autowrap = new ej2_buttons_1.CheckBox({ label: 'Allow Text Wrap', checked: false, change: onChange });
        autowrap.appendTo('#autowrap');
        var lines = [
            { id: 'Default', type: 'Default' },
            { id: 'Both', type: 'Both' },
            { id: 'None', type: 'None' },
            { id: 'Horizontal', type: 'Horizontal' },
            { id: 'Vertical', type: 'Vertical' }
        ];
        var gridlines = new ej2_dropdowns_1.DropDownList({
            placeholder: 'GridLines',
            floatLabelType: 'Auto',
            dataSource: lines,
            fields: { text: 'type', value: 'id' },
            value: 'Both',
            change: function (e) {
                pivotObj.gridSettings.gridLines = e.value;
            },
        });
        gridlines.appendTo('#gridlines');
        function onChange(args) {
            if (args.event.target.id === 'reorder') {
                pivotObj.gridSettings.allowReordering = args.checked;
            }
            else if (args.event.target.id === 'resize') {
                pivotObj.gridSettings.allowResizing = args.checked;
            }
            else {
                pivotObj.gridSettings.allowTextWrap = args.checked;
            }
        }
    };
});
