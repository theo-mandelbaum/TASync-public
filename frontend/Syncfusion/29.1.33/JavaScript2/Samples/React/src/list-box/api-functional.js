"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var data = require("./dataSource.json");
require("./api.css");
var Api = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)({
        sortOrder: 'None',
        selectionSettings: { mode: 'Multiple' }
    }), state = _a[0], setState = _a[1];
    // Set the vegetableData to the data source.
    var dataA = data["vegetableData"];
    var ddlData1 = data["sort"];
    var ddlData2 = data["selectionMode"];
    // Map the appropriate columns to fields property along with groupBy option.
    var fields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    var ddlFields = { text: 'type', value: 'type' };
    var sortChange = function (args) {
        setState(__assign(__assign({}, state), { sortOrder: args.value }));
    };
    var selectionChange = function (args) {
        setState(__assign(__assign({}, state), { selectionSettings: { mode: args.value } }));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { id: "listbox-api-control" },
                React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: dataA, fields: fields, sortOrder: state.sortOrder, selectionSettings: state.selectionSettings }))),
        React.createElement("div", { className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                React.createElement("div", null, "Sort order")),
                            React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                React.createElement("div", { style: { maxWidth: '200px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: ddlData1, fields: ddlFields, change: sortChange, value: 'None', popupHeight: '200px' })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                React.createElement("div", null, "Selection Mode")),
                            React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                React.createElement("div", { style: { maxWidth: '200px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: ddlData2, fields: ddlFields, change: selectionChange, value: 'Multiple', popupHeight: '200px' })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This sample demonstrates the API functionalities of the ListBox component by using its properties from the property pane. Select any combination of properties from the property pane to achieve desired functionalities in ListBox.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, a ListBox is rendered with grouping feature by setting the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/fieldSettingsModel/#groupby" },
                    React.createElement("code", null, "groupBy")),
                " property in ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#fields" },
                    React.createElement("code", null, "fields")),
                " property. This sample has been showcased with following set of properties,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "You can switch to ",
                    React.createElement("code", null, "Single"),
                    " or ",
                    React.createElement("code", null, "Multiple"),
                    " selection mode by selecting the mode from the selection mode dropdown list."),
                React.createElement("li", null,
                    "You can switch to ",
                    React.createElement("code", null, "None"),
                    ", ",
                    React.createElement("code", null, "Ascending"),
                    ", or ",
                    React.createElement("code", null, "Descending"),
                    " sort orders by selecting the sort order from the sort order dropdown list.")),
            React.createElement("p", null, "In this sample, by default, grouping is enabled and vegetableData is grouped based on its category. The user can change the sort order and selection type using dropdownlist."),
            React.createElement("p", null,
                "More information about the ListBox api can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/list-box/", target: "_blank" }, " documentation"),
                " section."))));
};
exports.default = Api;
