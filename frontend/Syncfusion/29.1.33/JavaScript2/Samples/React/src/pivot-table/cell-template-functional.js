"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var localData = require("./pivot-data/rData.json");
require("./cell-template.css");
/**
 * PivotView Cell Template Sample.
 */
/* tslint:disable */
var data = localData.data;
var dataSourceSettings = {
    expandAll: true,
    enableSorting: true,
    drilledMembers: [{ name: 'Year', items: ['FY 2015', 'FY 2017', 'FY 2018'] }],
    formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
    rows: [
        { name: 'Year', caption: 'Production Year' },
        { name: 'HalfYear', caption: 'Half Year' }
    ],
    columns: [
        { name: 'EnerType', caption: 'Energy Type' },
        { name: 'EneSource', caption: 'Energy Source' }
    ],
    values: [
        { name: 'ProCost', caption: 'Revenue Growth' }
    ],
    filters: []
};
function CellTemplate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var cellTemplate = '<span class="tempwrap e-pivot-trend-neutral pv-icons"></span>';
    /* jshint ignore:start */
    function trend() {
        var cTable = [].slice.call(document.getElementsByClassName("e-table"));
        var colLen = pivotObj.pivotValues[3].length;
        var cLen = cTable[1].children[0].children.length - 1;
        var rLen = cTable[1].children[1].children.length;
        var rowIndx;
        for (var k = 0; k < rLen; k++) {
            if (pivotObj.pivotValues[k] && pivotObj.pivotValues[k][0] !== undefined) {
                rowIndx = (pivotObj.pivotValues[k][0]).rowIndex;
                break;
            }
        }
        var rowHeaders = [].slice.call(cTable[1].children[1].querySelectorAll('.e-rowsheader'));
        var rows = pivotObj.dataSourceSettings.rows;
        if (rowHeaders.length > 1) {
            for (var i = 0, Cnt = rows; i < Cnt.length; i++) {
                var fields = {};
                var fieldHeaders = [];
                for (var j = 0, Lnt = rowHeaders; j < Lnt.length; j++) {
                    var header = rowHeaders[j];
                    if (header.className.indexOf('e-gtot') === -1 && header.className.indexOf('e-rowsheader') > -1 && header.getAttribute('fieldname') === rows[i].name) {
                        var headerName = rowHeaders[j].getAttribute('fieldname') + '_' + rowHeaders[j].textContent;
                        fields[rowHeaders[j].textContent] = j;
                        fieldHeaders.push(rowHeaders[j].textContent);
                    }
                }
                if (i === 0) {
                    for (var rnt = 0, Lnt_1 = fieldHeaders; rnt < Lnt_1.length; rnt++) {
                        if (rnt !== 0) {
                            var row_1 = fields[fieldHeaders[rnt]];
                            var prevRow = fields[fieldHeaders[rnt - 1]];
                            for (var j = 1, ci = 1; j < cLen && ci < colLen; j++, ci++) {
                                if (!cTable[1].children[1].children[row_1]) {
                                    break;
                                }
                                var node = cTable[1].children[1].children[row_1].childNodes[j];
                                var prevNode = cTable[1].children[1].children[prevRow].childNodes[j];
                                var ri = undefined;
                                var prevRi = undefined;
                                if (node) {
                                    ri = node.getAttribute("index");
                                }
                                if (prevNode) {
                                    prevRi = prevNode.getAttribute("index");
                                }
                                if (ri && ri < [].slice.call(pivotObj.pivotValues).length) {
                                    if ((pivotObj.pivotValues[prevRi][ci]).value > (pivotObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap')) {
                                        var trendElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-loss');
                                    }
                                    else if ((pivotObj.pivotValues[prevRi][ci]).value < (pivotObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap')) {
                                        var trendElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-profit');
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var rnt = 0, Lnt_2 = fieldHeaders; rnt < Lnt_2.length; rnt++) {
                        var row = fields[fieldHeaders[rnt]];
                        for (var j_1 = 1, ci_1 = 1; j_1 < cLen && ci_1 < colLen; j_1++, ci_1++) {
                            if (!cTable[1].children[1].children[row]) {
                                break;
                            }
                            var node = cTable[1].children[1].children[row].childNodes[j_1];
                            var prevNode = cTable[1].children[1].children[row - 1].childNodes[j_1];
                            var ri = undefined;
                            var prevRi = undefined;
                            if (node) {
                                ri = node.getAttribute("index");
                            }
                            if (prevNode) {
                                prevRi = prevNode.getAttribute("index");
                            }
                            if (ri < [].slice.call(pivotObj.pivotValues).length) {
                                var cRowFieldName = cTable[1].children[1].children[row].childNodes[0].getAttribute('fieldname');
                                var prevRowFieldName = cTable[1].children[1].children[row - 1].childNodes[0].getAttribute('fieldname');
                                if ((pivotObj.pivotValues[prevRi][ci_1]).value > (pivotObj.pivotValues[ri][ci_1]).value && node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    var trendElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-loss');
                                }
                                else if ((pivotObj.pivotValues[prevRi][ci_1]).value < (pivotObj.pivotValues[ri][ci_1]).value && node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    var trendElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('e-pivot-trend-neutral', 'e-pivot-trend-profit');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /* jshint ignore:end */
    function onLoad(args) {
        if (data[0].Year === undefined) {
            var date = void 0;
            for (var ln = 0, lt = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                var dtYr = date.getFullYear();
                var dtMn = date.getMonth();
                var dtdv = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2 ' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        args.dataSourceSettings.dataSource = data;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: 'pivot-table-section' },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', dataSourceSettings: dataSourceSettings, width: '100%', height: '300', gridSettings: { columnWidth: 140 }, load: onLoad, dataBound: trend.bind(this), ref: function (pivotview) { pivotObj = pivotview; }, cellTemplate: cellTemplate })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "In this sample, we demonstrate on how to provide templates for each pivot table value cell based on user requirement.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Pivot Table provides a custom layout for each cell's display using the cell template feature. The ",
                React.createElement("code", null, "cellTemplate"),
                " property accepts either an HTML string or the element's ID, which can be used to append additional HTML elements in order to showcase each cell with a template. Using cell templates in this sample, we are representing the revenue cost for each year with trend icons. To calculate the trend, we have applied conditions for each cell using pivot values from a",
                React.createElement("code", null, "dataBound"),
                " event. Based on the applied condition, we are showing the appropriate trend icons."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the cell template can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#cell-template" }, "documentation section"),
                "."))));
}
exports.default = CellTemplate;
