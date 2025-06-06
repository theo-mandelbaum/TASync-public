"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
/**
 * PivotView Default Sample.
 */
var SAMPLE_CSS = "\n.e-pivotview {\n    width: 100%;\n    height: 100%;\n}\n\n.image {\n    position: absolute;\n    background-repeat: no-repeat;\n    background-image: url('src/grid/images/spinner.gif');\n    background-position: center;\n    width: 16px;\n    height: 28px;\n}\n\n.e-bigger .image {\n    height: 36px;\n}\n\n#popup {\n    position: absolute;\n    background-color: transparent;\n    display: none;\n    z-index: 100;\n}\n\n#performanceTime {\n    float: right;\n    margin-top: 3px;\n    margin-right: 27px;\n}\n\n.e-bigger #performanceTime{\n    margin-top: 8px;\n}";
var dataSourceSettings = {
    dataSource: [],
    enableSorting: false,
    expandAll: true,
    formatSettings: [{ name: 'Price', format: 'C0' }],
    rows: [{ name: 'ProductID' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
};
var customername = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
    'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
var city = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
    'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
var applyBtn;
var pivotObj;
var date1;
var date2;
var isInit;
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
        if (dt / 2 == 1) {
            dt = 0;
        }
    }
    return result;
}
;
function show() {
    document.getElementById('popup').style.display = 'inline-block';
}
;
function VirtualScrolling() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function onClick(args) {
        show();
        isInit = true;
        pivotObj.dataSourceSettings.dataSource = data(100000);
        date1 = new Date().getTime();
    }
    function onDataBound() {
        if (pivotObj.dataSourceSettings.dataSource.length > 0) {
            if (date1 && isInit) {
                date2 = new Date().getTime();
                document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) / 1000 + ' sec';
            }
            isInit = false;
            applyBtn.disabled = true;
            document.getElementById('popup').style.display = 'none';
        }
        if (ej2_base_1.Browser.isDevice && pivotObj && pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "btn-control", style: { marginBottom: '5px' } },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', className: 'e-info', ref: function (scope) { applyBtn = scope; }, onClick: onClick.bind(this), isPrimary: true }, "Load 100K Data"),
                React.createElement("span", { id: "popup" },
                    React.createElement("span", { id: "gif", className: "image" })),
                React.createElement("span", { id: "performanceTime" }, "Time Taken: 0 sec")),
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, enableVirtualization: true, width: '100%', height: 300, dataBound: onDataBound, virtualScrollSettings: { allowSinglePage: true } },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.VirtualScroll] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the virtual scrolling option available for vertically and horizontally loading records and showing a large number of records with ease.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The pivot table provides an optimized way to render rows and columns inside the view-port alone without calculating the value of the entire pivot. To enable virtual scrolling, set ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#enablevirtualization" }, "enableVirtualization"),
                " property to ",
                React.createElement("b", null, "true"),
                "."),
            React.createElement("p", null,
                "In this sample, the ",
                React.createElement("code", null, "allowSinglePage"),
                " property is enabled by default, allowing only the current page data to be displayed in the pivot table view. Previously, we were showing both the previous and next pages along with the current page. The recent change has been introduced to enhance performance."),
            React.createElement("p", null,
                React.createElement("strong", null, "Injecting Module:")),
            React.createElement("p", null,
                "The pivot table features are segregated into individual modules. To use the virtual scrolling option, we need to inject the",
                React.createElement("code", null, " VirtualScroll"),
                " module using the",
                React.createElement("code", null, " services"),
                " tag."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the virtual scrolling can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/virtual-scrolling" }, "documentation section"),
                "."))));
}
exports.default = VirtualScrolling;
