"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./sorting.css");
/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    dataSource: Pivot_Data,
    expandAll: false,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
    columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
function DrillDown() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var fieldCollections = {};
    var isInitial = true;
    var storeMembers = { 'Country': [], 'Year': [] };
    var isRowSelect = false;
    var isColumnSelect = false;
    var values = [];
    var index;
    var fieldsddl;
    var membersOrder;
    var optionsdll;
    var field1;
    var applyBtn;
    var checkBoxObj;
    var fields = [
        { Field: 'Country', expandAll: false },
        { Field: 'Year', expandAll: false }
    ];
    var options = [
        { value: 'allHeaders', text: 'All headers' },
        { value: 'rowHeaders', text: 'Row headers' },
        { value: 'columnHeader', text: 'Column headers' },
        { value: 'specificFields', text: 'Specific fields' },
        { value: 'specificHeaders', text: 'Specific headers' }
    ];
    function onChange(e) {
        membersOrder.dataSource = fieldCollections[e.itemData['Field']];
        membersOrder.value = getSelectedMembers(e.itemData['Field']);
        membersOrder.dataBind();
        field1.dataBind();
    }
    /* jshint ignore:start */
    function dataBound(args) {
        if (isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            var fieldCnt = fields.length - 1;
            while (fieldCnt > -1) {
                var members = Object.keys(pivotObj.engineModule.fieldList[fields[fieldCnt].Field].members);
                var memberCnt = members.length;
                var membersCollection = [];
                for (var i = 0; i < memberCnt; i++) {
                    membersCollection.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                fieldCollections[fields[fieldCnt].Field] = membersCollection;
                fieldCnt--;
            }
            values = fieldCollections[fields[0].Field];
            membersOrder.dataSource = values;
            membersOrder.dataBind();
            fieldsddl.dataBind();
            isInitial = false;
        }
    }
    /* jshint ignore:end */
    function onChangeOption(args) {
        document.querySelector('.field_cls').style.display = 'none';
        document.querySelector('.field_cls_1').style.display = 'none';
        document.querySelector('.members_cls').style.display = 'none';
        document.querySelector('.apply_cls').style.display = 'none';
        if (args.value == 'allHeaders') {
            clear();
            pivotObj.setProperties({ dataSourceSettings: { expandAll: true, drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            pivotObj.refreshData();
        }
        else if (args.value == 'rowHeaders') {
            clear();
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, true, false);
        }
        else if (args.value == 'columnHeader') {
            clear();
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, false, true);
        }
        else if (args.value == 'specificFields') {
            document.querySelector('.field_cls').style.display = '';
        }
        else if (args.value == 'specificHeaders') {
            document.querySelector('.field_cls_1').style.display = '';
            document.querySelector('.members_cls').style.display = '';
            document.querySelector('.apply_cls').style.display = '';
        }
    }
    function onMembersSelect(args) {
        setMemberCheckedState(field1.itemData.Field, args['item'].textContent, args['item'].textContent + '_' + true);
        applyBtn.disabled = false;
        storeMembers[field1.itemData.Field].push(args.itemData['Member']);
    }
    function onMembersRemove(args) {
        setMemberCheckedState(field1.itemData.Field, args['item'].textContent, args['item'].textContent + '_' + false);
        index = storeMembers[field1.itemData.Field].indexOf(args.itemData['Member']);
        if (storeMembers[field1.itemData.Field].indexOf(args.itemData['Member']) > -1) {
            storeMembers[field1.itemData.Field].splice(index, 1);
        }
    }
    function onFieldSelect(args) {
        membersOrder.value = [];
        if (storeMembers['Country'].length > 0 || storeMembers['Year'].length > 0) {
            storeMembers = { 'Country': [], 'Year': [] };
            isInitial = true;
        }
        if (args.itemData['Field'] === 'Country') {
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, true, isColumnSelect);
            isRowSelect = true;
        }
        else if (args.itemData['Field'] === 'Year') {
            pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            updateRowColumn(false, isRowSelect, true);
            isColumnSelect = true;
        }
    }
    function onFieldRemove(args) {
        if (args.itemData['Field'] === 'Country') {
            updateRowColumn(false, false, isColumnSelect);
            isRowSelect = false;
        }
        else if (args.itemData['Field'] === 'Year') {
            updateRowColumn(false, isRowSelect, false);
            isColumnSelect = false;
        }
    }
    function open(args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    }
    function onClick() {
        fieldsddl.value = [];
        isRowSelect = false;
        isColumnSelect = false;
        pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: storeMembers['Country'] }, { name: 'Year', items: storeMembers['Year'] }] } }, true);
        updateRowColumn(false, false, false);
    }
    /** To set the checked status of the members maintained in the object fieldCollections. */
    function setMemberCheckedState(field, member, checkedState) {
        var members = fieldCollections[field];
        var membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Member === member) {
                members[membersLength].Checked = checkedState;
                break;
            }
            membersLength--;
        }
    }
    /** To get the checked members/status here as string array. */
    function getSelectedMembers(field) {
        var membersCollection = [];
        var members = fieldCollections[field];
        var membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Checked === members[membersLength].Member + '_' + true) {
                membersCollection.push(members[membersLength].Member.toString());
            }
            membersLength--;
        }
        return membersCollection;
    }
    function updateRowColumn(isExpand, isRowExpand, isColumnExpand) {
        pivotObj.setProperties({
            dataSourceSettings: {
                expandAll: isExpand, rows: [
                    { name: 'Country', expandAll: fieldsddl.dataSource[0].expandAll = isRowExpand },
                    { name: 'Products' }
                ], columns: [
                    { name: 'Year', expandAll: fieldsddl.dataSource[1].expandAll = isColumnExpand },
                    { name: 'Order_Source' }
                ]
            }
        }, true);
        pivotObj.refreshData();
    }
    function clear() {
        fieldsddl.value = [];
        isRowSelect = false;
        isColumnSelect = false;
        membersOrder.value = [];
        if (storeMembers['Country'].length > 0 || storeMembers['Year'].length > 0) {
            storeMembers = { 'Country': [], 'Year': [] };
            isInitial = true;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
            React.createElement("div", { className: 'col-lg-8 adaptive' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', gridSettings: { columnWidth: 140 }, dataBound: dataBound.bind(this) })),
            React.createElement("div", { className: 'col-lg-4 property-section pivot-property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', height: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel', style: { height: '50px' } }, "Drill Down:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { optionsdll = scope; }, type: "text", tabIndex: 0, change: onChangeOption.bind(this), width: "98%", id: "etype", dataSource: options, fields: { value: 'value', text: 'text' }, value: 'rowHeaders' })))),
                            React.createElement("tr", { className: 'field_cls', style: { height: '50px', display: 'none' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel' }, "Fields:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (scope) { fieldsddl = scope; }, select: onFieldSelect.bind(this), removed: onFieldRemove.bind(this), open: open.bind(this), width: "98%", placeholder: "Select fields", id: "etype", type: 'text', tabIndex: 1, dataSource: fields, mode: 'CheckBox', showDropDownIcon: true, showClearButton: false, enableSelectionOrder: false, fields: { text: 'Field' } },
                                            React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                            React.createElement("tr", { className: 'field_cls_1', style: { height: '50px', display: 'none' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel' }, "Fields:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { field1 = scope; }, placeholder: "Select fields", change: onChange.bind(this), width: "100%", id: "etype", type: 'text', tabIndex: 1, dataSource: fields, fields: { text: 'Field' }, value: "Country" })))),
                            React.createElement("tr", { className: 'members_cls', style: { height: '50px', display: 'none' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel' }, "Headers:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (scope) { membersOrder = scope; }, select: onMembersSelect.bind(this), removed: onMembersRemove.bind(this), open: open.bind(this), width: "98%", placeholder: "Select headers", id: "etype", type: 'text', tabIndex: 1, dataSource: values, mode: 'CheckBox', showDropDownIcon: true, showClearButton: false, enableSelectionOrder: false, fields: { text: 'Member' } },
                                            React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                            React.createElement("tr", { className: 'apply_cls', style: { height: '50px', display: "none" } },
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { float: 'right' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { applyBtn = scope; }, onClick: onClick.bind(this), isPrimary: true }, "Apply"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to drill down on all headers, column headers only, row headers only, specific field(s), and specific member(s) within the specific field(s).")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, drill down can be performed based on the option selected from the ",
                React.createElement("b", null, "Drill Down"),
                " dropdown list. The available options are described in detail below."),
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '10px 0', width: '150px' } },
                        React.createElement("code", null, "All headers :")),
                    React.createElement("td", { style: { paddingTop: '10px' } },
                        "Allows to expand all headers of row and column axes in the pivot table. It can be achieved by setting the ",
                        React.createElement("code", null, "expandAll"),
                        " property to ",
                        React.createElement("b", null, "true"),
                        " in the ",
                        React.createElement("code", null, "dataSourceSettings"),
                        ".")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "Row headers :")),
                    React.createElement("td", { style: { paddingTop: '2px' } },
                        "Allows to expand all row headers in the pivot table. It can be achieved by setting the ",
                        React.createElement("code", null, "expandAll"),
                        " property to ",
                        React.createElement("b", null, "true"),
                        " for row fields only.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "Column headers :")),
                    React.createElement("td", { style: { paddingTop: '2px' } },
                        "Allows to expand all column headers in the pivot table. It can be achieved by setting the ",
                        React.createElement("code", null, "expandAll"),
                        " property to ",
                        React.createElement("b", null, "true"),
                        " for column fields only.")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "Specific fields :")),
                    React.createElement("td", { style: { paddingTop: '3px' } },
                        "Allows to expand specific field(s) in the pivot table's row or column axes. It can be achieved by setting the ",
                        React.createElement("code", null, "expandAll"),
                        " property for the relevant field(s) in the row and column axes to ",
                        React.createElement("b", null, "true"),
                        ".")),
                React.createElement("tr", null,
                    React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                        React.createElement("code", null, "Specific headers :")),
                    React.createElement("td", { style: { paddingTop: '3px' } },
                        "Allows to expand specific header(s) within the respective field available in the pivot table's row or column axes. It can be achieved by specifying the respective field name and its member(s), aka header name(s), inside the ",
                        React.createElement("code", null, "drilledMembers"),
                        " property in the ",
                        React.createElement("code", null, "dataSourceSettings"),
                        "."))),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the drill down can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/drill-down" }, "documentation section"),
                "."))));
}
exports.default = DrillDown;
