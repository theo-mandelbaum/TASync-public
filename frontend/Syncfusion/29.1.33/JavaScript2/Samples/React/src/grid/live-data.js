"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveStream = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data_1 = require("./data");
require("./live-data.css");
var sample_base_1 = require("../common/sample-base");
function updateCellDetails(cell, className) {
    var div = document.createElement('div');
    var span1 = document.createElement('span');
    span1.classList.add('rowcell-left');
    div.classList.add(className);
    span1.innerHTML = cell.innerHTML;
    cell.innerHTML = '';
    div.appendChild(span1);
    cell.appendChild(div);
}
function customizeRatingCell(span1, span2, span1_class, span2_class, span2_text) {
    span1_class.forEach(function (item) { return span1.classList.add(item); });
    span2.classList.add(span2_class);
    span2.innerText = span2_text;
}
var LiveStream = /** @class */ (function (_super) {
    __extends(LiveStream, _super);
    function LiveStream() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDataBound = true;
        _this.data = data_1.getTradeData;
        _this.initial = true;
        return _this;
    }
    LiveStream.prototype.destroyClear = function (args) {
        if (this.clearButton && this.clearButton.element) {
            this.clearButton.element.click();
        }
    };
    LiveStream.prototype.dataBound = function (args) {
        var _this = this;
        var _a;
        if (this.initial) {
            (_a = document.getElementById('update1')) === null || _a === void 0 ? void 0 : _a.click();
            this.initial = false;
            this.feedDelayInput.element.addEventListener('keypress', function (e) {
                if (e && e.key === 'Enter' && _this.feedDelayInput.element.parentElement.classList.contains('e-input-focus')) {
                    _this.feedDelayInput.value = parseInt(_this.feedDelayInput.element.value);
                    _this.feedDelayInput.focusOut();
                    _this.updateButton.element.click();
                }
            });
        }
    };
    LiveStream.prototype.queryCellInfo = function (args) {
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
        else if (this.isDataBound) {
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
        this.isDataBound = true;
    };
    LiveStream.prototype.updateCellValues = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var oldValue;
        var newValue;
        for (var i = 0; this.grid && i < ((_a = this.grid) === null || _a === void 0 ? void 0 : _a.currentViewData.length); i++) {
            if (((_b = this.grid) === null || _b === void 0 ? void 0 : _b.currentViewData[i]) === undefined) {
                return;
            }
            var num = Math.floor(Math.random() * 99) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = (_c = this.grid) === null || _c === void 0 ? void 0 : _c.currentViewData[i]['Net'];
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
            this.isDataBound = true;
            (_d = this.grid) === null || _d === void 0 ? void 0 : _d.setCellValue((_e = this.grid) === null || _e === void 0 ? void 0 : _e.currentViewData[i]['id'], 'Net', parseFloat(num.toFixed(2)));
            this.isDataBound = true;
            newValue = parseFloat((((_f = this.grid) === null || _f === void 0 ? void 0 : _f.currentViewData[i]['Net']) - oldValue).toString().substring(0, 2));
            (_g = this.grid) === null || _g === void 0 ? void 0 : _g.setCellValue((_h = this.grid) === null || _h === void 0 ? void 0 : _h.currentViewData[i]['id'], 'Change', parseFloat(newValue.toFixed(2)));
            this.isDataBound = true;
            var ratingValue = ((_j = this.grid) === null || _j === void 0 ? void 0 : _j.currentViewData[i]['Net']) < 0 ? 'Sell' : 'Buy';
            (_k = this.grid) === null || _k === void 0 ? void 0 : _k.setCellValue((_l = this.grid) === null || _l === void 0 ? void 0 : _l.currentViewData[i]['id'], 'Rating', ratingValue);
            var val = num + newValue;
            (_m = this.grid) === null || _m === void 0 ? void 0 : _m.setCellValue((_o = this.grid) === null || _o === void 0 ? void 0 : _o.currentViewData[i]['id'], 'NetIncome', val);
        }
    };
    LiveStream.prototype.updateClick = function () {
        if (!this.timerID) {
            this.updateButton.disabled = true;
            this.feedDelayInput.enabled = false;
            this.clearButton.disabled = false;
            this.timerID = setInterval(this.updateCellValues.bind(this), this.feedDelayInput.value);
        }
    };
    LiveStream.prototype.clearClick = function () {
        if (this.timerID) {
            this.updateButton.disabled = false;
            this.feedDelayInput.enabled = true;
            this.clearButton.disabled = true;
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    };
    LiveStream.prototype.render = function () {
        var _this = this;
        this.updateClick = this.updateClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.queryCellInfo = this.queryCellInfo.bind(this);
        this.dataBound = this.dataBound.bind(this);
        this.destroyClear = this.destroyClear.bind(this);
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { style: { marginBottom: '10px' } },
                    React.createElement("label", { style: { display: 'inline-block', fontSize: '14px', paddingLeft: '5px' } }, "Feed Delay(ms):"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: "N0", value: 1000, min: 10, max: 5000, step: 1, width: '150px', style: { marginLeft: '7px' }, ref: function (scope) {
                            _this.feedDelayInput = scope;
                        }, "aria-label": "Feed delay" }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "update1", ref: function (scope) {
                            _this.updateButton = scope;
                        }, onClick: this.updateClick, style: { marginLeft: '10px' } }, "Start Data Update"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", ref: function (scope) {
                            _this.clearButton = scope;
                        }, onClick: this.clearClick, style: { marginLeft: '10px' } }, "Stop Data Update")),
                React.createElement(ej2_react_grids_1.GridComponent, { id: "livestream", dataSource: data_1.getTradeData, enableVirtualization: true, enableVirtualMaskRow: false, enableHover: false, rowHeight: 38, height: 500, ref: function (g) {
                        _this.grid = g;
                    }, allowSelection: false, queryCellInfo: this.queryCellInfo, destroyed: this.destroyClear, dataBound: this.dataBound },
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
    };
    return LiveStream;
}(sample_base_1.SampleBase));
exports.LiveStream = LiveStream;
