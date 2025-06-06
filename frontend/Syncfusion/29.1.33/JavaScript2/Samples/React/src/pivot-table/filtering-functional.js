"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./filtering.css");
/**
 * PivotView Filtering Sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }],
    dataSource: Pivot_Data,
    expandAll: false
};
var values = [
    { Member: "United States", Checked: "United States_false" },
    { Member: "United Kingdom", Checked: "United Kingdom_false" },
    { Member: "Germany", Checked: "Germany_false" },
    { Member: "France", Checked: "France_false" }
];
var fieldCollections = {};
var filterCollections = {};
var isInitial = true;
var type = ['Include', 'Exclude'];
var fields = ['Country', 'Products', 'Year'];
var pivotObj;
var fieldsddl;
var applyBtn;
var typeddl;
var valuesddl;
var field = { text: 'Member' };
function Filtering() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    /** To get the checked members here as string array */
    function getSelectedMembers(field) {
        var membersColl = [];
        var members = fieldCollections[field];
        var memLength = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Checked'] === members[memLength]['Member'] + '_' + true) {
                membersColl.push(members[memLength]['Member'].toString());
            }
            memLength--;
        }
        return membersColl;
    }
    /** To set the checked status of the members maintained in the object fieldCollections */
    function setMemberCheckedState(field, member, checkedState) {
        var members = fieldCollections[field];
        var memLength = members.length - 1;
        while (memLength > -1) {
            if (members[memLength]['Member'] === member) {
                members[memLength]['Checked'] = checkedState;
                break;
            }
            memLength--;
        }
    }
    /** To set disabled/enabled state in the Apply button. */
    function setApplyBtnState() {
        var fieldArray = ['Country', 'Products', 'Year'];
        var loopCount = fieldArray.length - 1;
        var isSelected = false;
        var isFiltersAvail = false;
        while (loopCount > -1) {
            if (getSelectedMembers(fieldArray[loopCount]).length > 0) {
                isSelected = true;
                break;
            }
            if (pivotObj.dataSourceSettings.filterSettings &&
                pivotObj.dataSourceSettings.filterSettings[loopCount] &&
                pivotObj.dataSourceSettings.filterSettings[loopCount].items.length > 0) {
                isFiltersAvail = true;
            }
            loopCount--;
        }
        applyBtn.disabled = (!isSelected && isFiltersAvail) ? isSelected : !isSelected;
    }
    function select(args) {
        applyBtn.disabled = false;
        setMemberCheckedState(fieldsddl.itemData, args.item.textContent, args.item.textContent + '_' + true);
    }
    function removed(args) {
        setMemberCheckedState(fieldsddl.itemData, args.item.textContent, args.item.textContent + '_' + false);
        setApplyBtnState();
    }
    function open(args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    }
    function onClick(args) {
        /** You can set your filter settings here */
        var filterItems0 = getSelectedMembers(fields[0]);
        var filterItems1 = getSelectedMembers(fields[1]);
        var filterItems2 = getSelectedMembers(fields[2]);
        pivotObj.dataSourceSettings.filterSettings = [
            { name: fields[0], items: getSelectedMembers(fields[0]), type: updateFilterType(fields[0]) },
            { name: fields[1], items: getSelectedMembers(fields[1]), type: updateFilterType(fields[1]) },
            { name: fields[2], items: getSelectedMembers(fields[2]), type: updateFilterType(fields[2]) },
        ];
        if (filterItems0.length === 0 && filterItems1.length === 0 && filterItems2.length === 0) {
            applyBtn.disabled = true;
        }
    }
    function updateFilterType(fieldName) {
        if (fieldsddl.itemData === fieldName) {
            return typeddl.itemData;
        }
        else if (filterCollections[fieldName]) {
            return filterCollections[fieldName].type;
        }
        else {
            return 'Exclude';
        }
    }
    function onChange(args) {
        valuesddl.dataSource = fieldCollections[args.value.toString()];
        valuesddl.value = getSelectedMembers(args.value.toString());
        if (filterCollections[args.value.toString()]) {
            typeddl.value = filterCollections[args.value.toString()].type;
        }
        valuesddl.dataBind();
        typeddl.dataBind();
    }
    function rendereComplete() {
        if (applyBtn) {
            applyBtn.disabled = true;
            applyBtn.refresh();
        }
    }
    function ondataBound(args) {
        if (isInitial) {
            /** To fill the members for each fields into the object fieldCollections */
            var fieldCnt = fields.length - 1;
            while (fieldCnt > -1) {
                var members = Object.keys(this.engineModule.fieldList[fields[fieldCnt]].members);
                var memberCnt = members.length - 1;
                var memberColl = [];
                while (memberCnt > -1) {
                    memberColl.push({ Member: members[memberCnt], Checked: members[memberCnt] + '_' + false });
                    memberCnt--;
                }
                fieldCollections[fields[fieldCnt]] = memberColl;
                fieldCnt--;
            }
            values = fieldCollections[fields[0]];
            isInitial = false;
        }
        for (var _i = 0, _a = pivotObj.dataSourceSettings.filterSettings; _i < _a.length; _i++) {
            var field_1 = _a[_i];
            filterCollections[field_1.name] = field_1;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
            React.createElement("div", { className: 'col-lg-8 adaptive' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', dataBound: ondataBound, gridSettings: { columnWidth: 140 } },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_pivotview_1.FieldList] }))),
            React.createElement("div", { className: 'col-lg-4 property-section pivottable-property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null, "Fields:"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { fieldsddl = scope; }, index: 0, width: '98%', id: "etype", change: onChange.bind(this), dataSource: fields })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null, "Members:"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", placeholder: "Select members", ref: function (scope) { valuesddl = scope; }, dataSource: values, fields: field, mode: "CheckBox", showClearButton: true, enableSelectionOrder: false, showDropDownIcon: true, select: select.bind(this), removed: removed.bind(this), open: open.bind(this), "aria-expanded": 'false' },
                                            React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null, "Filter Type:"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { typeddl = scope; }, index: 1, width: '98%', id: "etype", dataSource: type })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { float: 'right', marginRight: '4px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { applyBtn = scope; }, onClick: onClick.bind(this), isPrimary: true }, "Apply"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates filtering row and column headers either by including or excluding them from the pivot table.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, any field can be selected from",
                React.createElement("b", null, " Fields"),
                " dropdown list along with its members from be subsequent",
                React.createElement("b", null, " Members"),
                " dropdown list and finally select whether to include or exclude them from filtering. It can be achieved using the",
                React.createElement("code", null, " name"),
                " and",
                React.createElement("code", null, " items"),
                " options inside the",
                React.createElement("code", null, " filterSettings"),
                " property in the pivot table."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the filtering can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/filtering" }, "documentation section"),
                "."))));
}
exports.default = Filtering;
