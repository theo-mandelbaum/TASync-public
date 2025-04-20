"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data_1 = require("./data");
require("./live-data.css");
var sample_base_1 = require("../common/sample-base");
function LiveStream() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var grid;
    var isDataBound = true;
    var updateButton;
    var clearButton;
    var feedDelayInput;
    var timerID;
    var initial = true;
    var load = function (args) {
        this.on('data-ready', function () {
            var _a;
            if (initial) {
                (_a = document.getElementById('update1')) === null || _a === void 0 ? void 0 : _a.click();
                initial = false;
                feedDelayInput.element.addEventListener('keypress', function (e) {
                    if (e && e.key === 'Enter' && feedDelayInput.element.parentElement.classList.contains('e-input-focus')) {
                        feedDelayInput.value = parseInt(feedDelayInput.element.value);
                        feedDelayInput.focusOut();
                        updateButton.element.click();
                    }
                });
            }
        });
        this.on('destroy', function () {
            if (clearButton && clearButton.element) {
                clearButton.element.click();
            }
        });
    };
    var queryCellInfo = function (args) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_a = args.column) === null || _a === void 0 ? void 0 : _a.field) === 'NetIncome') {
            if (args.data['Net'] < 0) {
                (_b = args.cell) === null || _b === void 0 ? void 0 : _b.classList.remove('e-increase');
                (_c = args.cell) === null || _c === void 0 ? void 0 : _c.classList.add('e-decrease');
            }
            else if (args.data['Net'] > 0) {
                (_d = args.cell) === null || _d === void 0 ? void 0 : _d.classList.remove('e-decrease');
                (_e = args.cell) === null || _e === void 0 ? void 0 : _e.classList.add('e-increase');
            }
        }
        else if (((_f = args.column) === null || _f === void 0 ? void 0 : _f.field) === 'Change') {
            if (args.data['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            }
            else {
                updateCellDetails(args.cell, 'above-0');
            }
        }
        else if (((_g = args.column) === null || _g === void 0 ? void 0 : _g.field) === 'Net') {
            if (args.data['Net'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            }
            else {
                updateCellDetails(args.cell, 'above-0');
            }
        }
        else if (isDataBound) {
            if (((_h = args.column) === null || _h === void 0 ? void 0 : _h.field) === 'Rating') {
                args.cell.innerHTML = '';
                var span = document.createElement('span');
                var span2 = document.createElement('span');
                if (args.data['Change'] === 0) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-intermediate-state-2', 'neutral', 'ic', 'side-space'], 'neutral', 'Neutral');
                }
                else if (args.data['Change'] < -2 && args.data['Net'] < 0) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-negc', 'e-chevron-down-double', 'below-0', 'ic', 'side-space'], 'below-0', 'Strongly Sell');
                }
                else if (args.data['Net'] < 0) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-negc', 'e-chevron-down', 'below-0', 'ic', 'side-space'], 'below-0', 'Sell');
                }
                else if (args.data['Change'] > 5 && args.data['Net'] > 10) {
                    customizeRatingCell(span, span2, ['e-icons', 'e-posc', 'e-chevron-up-double', 'above-0', 'ic', 'side-space'], 'above-0', 'Strongly Buy');
                }
                else {
                    customizeRatingCell(span, span2, ['e-icons', 'e-posc', 'e-chevron-up', 'above-0', 'ic', 'side-space'], 'above-0', 'Buy');
                }
                args.cell.appendChild(span);
                args.cell.appendChild(span2);
            }
        }
        isDataBound = true;
    };
    var customizeRatingCell = function (span1, span2, span1_class, span2_class, span2_text) {
        span1_class.forEach(function (item) { return span1.classList.add(item); });
        span2.classList.add(span2_class);
        span2.innerText = span2_text;
    };
    var updateCellDetails = function (cell, className) {
        var div = document.createElement('div');
        var span1 = document.createElement('span');
        span1.classList.add('rowcell-left');
        div.classList.add(className);
        span1.innerHTML = cell.innerHTML;
        cell.innerHTML = '';
        div.appendChild(span1);
        cell.appendChild(div);
    };
    var updateCellValues = function () {
        var oldValue;
        var newValue;
        for (var i = 0; grid && i < (grid === null || grid === void 0 ? void 0 : grid.currentViewData.length); i++) {
            if ((grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]) === undefined) {
                return;
            }
            var num = Math.floor(Math.random() * 99) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['Net'];
            if (i % 2 === 0) {
                num = num * 0.25;
            }
            else if (i % 3 === 0) {
                num = num * 0.83;
            }
            else if (i % 5 === 0) {
                num = num * 0.79;
            }
            else if (i % 4 === 0) {
                num = num * 0.42;
            }
            else {
                num = num * 0.51;
            }
            isDataBound = true;
            grid === null || grid === void 0 ? void 0 : grid.setCellValue(grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['id'], 'Net', parseFloat(num.toFixed(2)));
            isDataBound = true;
            newValue = parseFloat(((grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['Net']) - oldValue).toString().substring(0, 2));
            grid === null || grid === void 0 ? void 0 : grid.setCellValue(grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['id'], 'Change', parseFloat(newValue.toFixed(2)));
            isDataBound = true;
            var ratingValue = (grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['Net']) < 0 ? 'Sell' : 'Buy';
            grid === null || grid === void 0 ? void 0 : grid.setCellValue(grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['id'], 'Rating', ratingValue);
            var val = num + newValue;
            grid === null || grid === void 0 ? void 0 : grid.setCellValue(grid === null || grid === void 0 ? void 0 : grid.currentViewData[i]['id'], 'NetIncome', val);
        }
    };
    var data = data_1.getTradeData;
    var updateClick = function () {
        if (!timerID) {
            updateButton.disabled = true;
            feedDelayInput.enabled = false;
            clearButton.disabled = false;
            timerID = setInterval(updateCellValues, feedDelayInput.value);
        }
    };
    var clearClick = function () {
        if (timerID) {
            updateButton.disabled = false;
            feedDelayInput.enabled = true;
            clearButton.disabled = true;
            clearInterval(timerID);
            timerID = undefined;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { style: { marginBottom: '10px' } },
                React.createElement("label", { style: { display: 'inline-block', fontSize: '14px', paddingLeft: '5px' } }, "Feed Delay(ms):"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: "N0", value: 1000, min: 10, max: 5000, step: 1, width: '150px', style: { marginLeft: '7px' }, ref: function (scope) {
                        feedDelayInput = scope;
                    }, "aria-label": "Feed delay" }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "update1", ref: function (scope) {
                        updateButton = scope;
                    }, onClick: updateClick, style: { marginLeft: '10px' } }, "Start Data Update"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", ref: function (scope) {
                        clearButton = scope;
                    }, onClick: clearClick, style: { marginLeft: '10px' } }, "Stop Data Update")),
            React.createElement(ej2_react_grids_1.GridComponent, { id: "livestream", dataSource: data, enableVirtualization: true, enableVirtualMaskRow: false, enableHover: false, rowHeight: 38, height: 500, ref: function (g) {
                    grid = g;
                }, allowSelection: false, queryCellInfo: queryCellInfo, load: load },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "id", headerText: "ID", width: "140", isPrimaryKey: true, visible: false }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "CountryCode", headerText: "Ticker", width: "70" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Change", headerText: "Change % 1D", width: "100", format: "N0", textAlign: "Right" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Net", headerText: "Net", width: "100", format: "C2", type: "number", textAlign: "Right" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Rating", width: "150", headerText: "Technical Rating 1D" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "NetIncome", headerText: "Net Income", width: "150", format: "C2", type: "number", textAlign: "Right" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Sector", width: "160", headerText: "Sector" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "EmployeeCount", width: "130", headerText: "Employee Count", textAlign: "Right" })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.VirtualScroll] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how frequently Grid cells are updated in real-time data at a set interval.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " The updating of Grid cells can be done without any performance lagging by using the ",
                React.createElement("code", null, "setCellValue"),
                "method. The style of Grid cells can be customized using the ",
                React.createElement("code", null, "queryCellInfo"),
                " event."),
            React.createElement("p", null, "In this demo,"),
            React.createElement("ul", null,
                React.createElement("li", null, " Clicking the start update button triggers automatic updates of Grid cells at the interval set in the feed delay text box which is a milliseconds format."),
                React.createElement("li", null, " Clicking the stop update button will halt the automatic updating of Grid cells.")),
            React.createElement("p", null,
                "More information on the queryCellInfo can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#querycellinfo" }, " documentation section"),
                "."))));
}
exports.default = LiveStream;
