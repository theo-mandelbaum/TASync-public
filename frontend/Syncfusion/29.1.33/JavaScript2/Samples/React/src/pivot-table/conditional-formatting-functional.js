"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
/**
 * PivotView Sample with Calculated Fields.
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}\n#conditional-formatting-btn {\n    width: 80%;\n    margin-left: 20px;\n}\n#reset-format {\n    width: 80%;\n    margin-left: 20px;\n}\n.e-control.e-btn.e-lib.e-small.e-round.e-format-condition-button.e-icon-btn.e-flat {\n    padding: 0 0 4px 0 !important;\n}\n#PivotViewcontainerwrapper {\n    height: auto !important;\n}";
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' },
        { name: 'Sold', caption: 'Units Sold' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    conditionalFormatSettings: [
        {
            measure: 'In_Stock',
            value1: 5000,
            conditions: 'LessThan',
            style: {
                backgroundColor: '#80cbc4',
                color: 'black',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            }
        },
        {
            value1: 3400,
            value2: 40000,
            measure: 'Sold',
            conditions: 'Between',
            style: {
                backgroundColor: '#f48fb1',
                color: 'black',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            }
        }
    ]
};
function ConditionalFormattingClass() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    function applyFormat() {
        pivotObj.conditionalFormattingModule.showConditionalFormattingDialog();
    }
    function resetFormat() {
        if (pivotObj.dataSourceSettings.conditionalFormatSettings.length > 0) {
            pivotObj.setProperties({ dataSourceSettings: { conditionalFormatSettings: [] } }, true);
            pivotObj.renderPivotGrid();
        }
        pivotObj.conditionalFormattingModule.destroy();
        document.getElementById('reset-format').blur();
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-9 adaptive' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, showFieldList: true, width: '100%', height: '300', allowConditionalFormatting: true, gridSettings: { columnWidth: 100 } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.ConditionalFormatting, ej2_react_pivotview_1.FieldList] }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'conditional-formatting-btn', cssClass: 'e-primary', onClick: applyFormat.bind(this) }, "APPLY FORMAT"))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'reset-format', cssClass: 'e-primary', onClick: resetFormat.bind(this) }, "RESET ALL")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates formatting the appearance of pivot table cells with user-defined styles based on applied conditions. The ",
                React.createElement("b", null, "Conditional Formatting"),
                " dialog is invoked to add conditions and styles for the conditions. The formatting can be added, removed, and reset dynamically as well.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Conditional formatting works only for cells with values, allowing the users to change its appearance such as background color, font color, font family, and font size based on specific conditions. Conditional formatting can be applied either through UI or code behind. To enable this option in UI, set",
                React.createElement("code", null, " allowConditionalFormatting"),
                " to true and invoke",
                React.createElement("code", null, " showConditionalFormattingDialog"),
                " method to view the UI. To achieve this in code-behind, set",
                React.createElement("code", null, " allowConditionalFormatting"),
                " to true and use the",
                React.createElement("code", null, " conditionalFormatSettings"),
                " object in the pivot table along with the following properties. Both options are enabled in this sample."),
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "measure :")),
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } }, "Specifies the value field name for which style will be applied.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "condition :")),
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } }, "Specifies the operator type like equals, greater than, less than, etc.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "value1 :")),
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } }, "Specifies the start value.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "value2 :")),
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } }, "Specifies the end value.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "style :")),
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } }, "Specifies the style for the cell.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "applyGrandTotals :")),
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } }, "Enabled by default. Allows conditional formatting to be applied to row and column grand totals."))),
            React.createElement("br", null),
            React.createElement("p", null, "Also, user can clear the entire style applied for the value cell using reset all option."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("strong", null, "Injecting Module:")),
            React.createElement("p", null,
                "The pivot table features are segregated into individual modules. To enable conditional formatting, inject",
                React.createElement("code", null, " ConditionalFormatting"),
                " module using the",
                React.createElement("code", null, " services"),
                " tag."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the conditional formatting can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/conditional-formatting" }, "documentation section"),
                "."))));
}
exports.default = ConditionalFormattingClass;
