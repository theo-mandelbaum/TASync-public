"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
/**
 * PivotView Performance Sample.
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}\n\n#performanceTime {\n    float: right;\n    margin-top: 7px;\n    margin-right: 27px;\n}\n\n.e-bigger #performanceTime{\n    margin-top: 8px;\n}\n\n@media(max-width: 440px) {\n    .control-pane .control-section .performance-time-container {\n        margin-bottom: 30px !important;\n\n        #performanceTime {\n            float: left;\n        }\n    }\n}";
var pivotObj;
var ddObj;
var date1;
var date2;
var isInit = true;
var ddlData = [
    { text: '10,000 Rows and 10 Columns', value: 10000 },
    { text: '1,00,000 Rows and 10 Columns', value: 100000 },
    { text: '1,000,000 Rows and 10 Columns', value: 1000000 }
];
var fields = { text: 'text', value: 'value' };
var customername = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
    'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
var city = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
    'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
var dataSourceSettings = {
    dataSource: data(10000),
    enableSorting: false,
    expandAll: true,
    formatSettings: [{ name: 'Price', format: 'C0' }],
    rows: [{ name: 'ProductID' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
};
function data(count) {
    var result = [];
    var dt = 0;
    for (var i = 1; i < (count + 1); i++) {
        dt++;
        var round = void 0;
        var toString_1 = i.toString();
        if (toString_1.length === 1) {
            round = '0000' + (i);
        }
        else if (toString_1.length === 2) {
            round = '000' + i;
        }
        else if (toString_1.length === 3) {
            round = '00' + i;
        }
        else if (toString_1.length === 4) {
            round = '0' + i;
        }
        else {
            round = toString_1;
        }
        result.push({
            ProductID: 'PRO-' + round,
            City: city[Math.round(Math.random() * city.length)] || city[0],
            Year: "FY " + (dt + 2013),
            CustomerName: customername[Math.round(Math.random() * customername.length)] || customername[0],
            Price: Math.round(Math.random() * 5000) + 5000,
            Sold: Math.round(Math.random() * 80) + 10,
        });
        if (dt / 4 == 1) {
            dt = 0;
        }
    }
    return result;
}
;
function Performance() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function onChange(args) {
        isInit = true;
        pivotObj.dataSourceSettings.dataSource = data(args.value);
        date1 = new Date().getTime();
    }
    function onDataBound() {
        if (pivotObj.dataSourceSettings.dataSource.length > 0) {
            if (date1 && isInit) {
                date2 = new Date().getTime();
                document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) / 1000 + ' sec';
            }
            isInit = false;
        }
        if (ej2_base_1.Browser.isDevice && pivotObj && pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
    }
    function load() {
        if (isInit) {
            date1 = new Date().getTime();
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'performance-time-container', style: { marginBottom: '15px' } },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "performance", width: '240', dataSource: ddlData, index: 0, ref: function (dropdownlist) { ddObj = dropdownlist; }, fields: fields, change: onChange.bind(this), placeholder: "Select a Data Range", popupHeight: "240px" }),
                React.createElement("span", { id: "performanceTime" }, "Time Taken: 0 sec")),
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, enableVirtualization: true, width: '100%', height: 300, gridSettings: { columnWidth: 120 }, dataBound: onDataBound, load: load },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.VirtualScroll] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how the pivot table loads a large amount of data with ease using virtual scrolling.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample demonstrates how the pivot table performs when bound with a million rows in a highly optimized manner by only displaying rows and columns to the current view port using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#enablevirtualization" }, "enableVirtualization"),
                " property. By choosing from the dropdown list options, a different number of rows can be loaded into the pivot table."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("strong", null, "Injecting Module:")),
            React.createElement("p", null,
                "The pivot table features are segregated into individual modules. To use the virtual scrolling option, we need to inject the ",
                React.createElement("code", null, " VirtualScroll"),
                " module using the ",
                React.createElement("code", null, " services"),
                " tag."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the virtual scrolling can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/virtual-scrolling" }, "documentation section"),
                "."))));
}
exports.default = Performance;
