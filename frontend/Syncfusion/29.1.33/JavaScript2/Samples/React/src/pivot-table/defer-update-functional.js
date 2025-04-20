"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
/**
 * Pivot Field List default sample
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 58%;\n    height: 100%;\n    float: left;\n}\n.e-pivotfieldlist {\n    width: 42%;\n    height: 100%;\n    float: right;\n}\n.e-pivotfieldlist .e-static {\n    width: 100% !important;\n}";
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowValueFilter: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany', 'United States'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};
function DeferUpdate() {
    var fieldlistObj;
    var pivotObj;
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    function afterPopulate() {
        if (fieldlistObj && pivotObj) {
            if (fieldlistObj.isRequiredUpdate) {
                fieldlistObj.updateView(pivotObj);
            }
            pivotObj.notify('ui-update', pivotObj);
            if (!ej2_base_1.Browser.isDevice) {
                fieldlistObj.notify('tree-view-update', fieldlistObj);
            }
        }
    }
    function afterPivotPopulate() {
        if (!ej2_base_1.Browser.isDevice && fieldlistObj && pivotObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function rendereComplete() {
        fieldlistObj.updateView(pivotObj);
        fieldlistObj.update(pivotObj);
    }
    function ondataBound() {
        pivotObj.tooltip.destroy();
        if (ej2_base_1.Browser.isDevice) {
            pivotObj.element.style.width = '100%';
            pivotObj.allowCalculatedField = true;
            pivotObj.showFieldList = true;
        }
        pivotObj.refresh();
    }
    function onLoad() {
        if (ej2_base_1.Browser.isDevice) {
            this.renderMode = 'Popup';
            this.target = '.control-section';
            (0, ej2_base_1.setStyleAttribute)(document.getElementById('PivotFieldList'), {
                'width': 0,
                'height': 0,
                'float': 'left',
                'display': 'none'
            });
        }
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return pivotObj = d; }, enginePopulated: afterPivotPopulate.bind(this), width: '99%', height: '620', allowDeferLayoutUpdate: true, gridSettings: { columnWidth: 140 } },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.FieldList] })),
            React.createElement(ej2_react_pivotview_1.PivotFieldListComponent, { id: 'PivotFieldList', ref: function (d) { return fieldlistObj = d; }, enginePopulated: afterPopulate.bind(this), dataSourceSettings: dataSourceSettings, renderMode: "Fixed", allowDeferLayoutUpdate: true, allowCalculatedField: true, load: onLoad, dataBound: ondataBound.bind(this) },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.CalculatedField] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the defer layout update feature of the pivot table. The defer layout update allows users to refresh the pivot table on-demand instead of during every UI interaction.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Deferring a layout update can be useful when you need to remove or add multiple fields in a report and you don't want to update the pivot table after each change. Now, you can update a pivot table after performing all changes at the report level in the field list resulting in better performance."),
            React.createElement("p", null,
                "In this sample, the ",
                React.createElement("b", null, "Defer Layout Update"),
                " option can be enabled or disabled via field list UI."),
            React.createElement("p", null,
                "In general, this feature can be enabled by setting  ",
                React.createElement("code", null, "allowDeferLayoutUpdate"),
                " as true."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the defer layout update can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/defer-update" }, "documentation section"),
                "."))));
}
exports.default = DeferUpdate;
