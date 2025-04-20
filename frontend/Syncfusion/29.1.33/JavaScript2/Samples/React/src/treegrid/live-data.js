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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
require("./live-data.css");
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
var LiveStream = /** @class */ (function (_super) {
    __extends(LiveStream, _super);
    function LiveStream() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDataBound = true;
        _this.data = data_1.getTradeData;
        _this.initial = true;
        return _this;
    }
    LiveStream.prototype.load = function () {
        var _a;
        (_a = document.getElementById('update1')) === null || _a === void 0 ? void 0 : _a.click();
    };
    LiveStream.prototype.created = function (args) {
        var _this = this;
        this.grid.on('data-ready', function () {
            if (_this.grid.initial) {
                _this.initial = false;
                _this.feedDelayInput.element.addEventListener('keypress', function (e) {
                    if (e && e.key === 'Enter' && _this.feedDelayInput.element.parentElement.classList.contains('e-input-focus')) {
                        _this.feedDelayInput.value = parseInt(_this.feedDelayInput.element.value);
                        _this.feedDelayInput.focusOut();
                        _this.updateButton.element.click();
                    }
                });
            }
        });
        this.grid.on('destroy', function () {
            if (this.timerID) {
                clearInterval(this.timerID);
                this.timerID = undefined;
            }
        });
    };
    LiveStream.prototype.queryCellInfo = function (args) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_a = args.column) === null || _a === void 0 ? void 0 : _a.field) === 'Ltp') {
            if (args.data['Ltp'] < 3000) {
                (_b = args.cell) === null || _b === void 0 ? void 0 : _b.classList.remove('e-increase');
                (_c = args.cell) === null || _c === void 0 ? void 0 : _c.classList.add('e-decrease');
            }
            else if (args.data['Ltp'] > 3000) {
                (_d = args.cell) === null || _d === void 0 ? void 0 : _d.classList.remove('e-decrease');
                (_e = args.cell) === null || _e === void 0 ? void 0 : _e.classList.add('e-increase');
            }
        }
        else if (((_f = args.column) === null || _f === void 0 ? void 0 : _f.field) === 'PercentageChange') {
            if (args.data['PercentageChange'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            }
            else {
                updateCellDetails(args.cell, 'above-0');
            }
        }
        else if (((_g = args.column) === null || _g === void 0 ? void 0 : _g.field) === 'Change') {
            if (args.data['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            }
            else {
                updateCellDetails(args.cell, 'above-0');
            }
        }
        else if (((_h = args.column) === null || _h === void 0 ? void 0 : _h.field) === 'Index Funds' && args.data['hasChildRecords']) {
            args.cell.getElementsByClassName('e-treecell')[0].classList.add('e-parent');
        }
        this.isDataBound = true;
    };
    LiveStream.prototype.updateCellValues = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var oldValue;
        for (var i = 0; i < ((_a = this.treegrid) === null || _a === void 0 ? void 0 : _a.grid.currentViewData.length); i++) {
            if (((_b = this.treegrid) === null || _b === void 0 ? void 0 : _b.grid.currentViewData[i]) === undefined) {
                return;
            }
            var num = Math.floor(Math.random() * 40) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = (_c = this.treegrid) === null || _c === void 0 ? void 0 : _c.grid.currentViewData[i]['Change'];
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
            var maxChange = 2 - ((_d = this.treegrid) === null || _d === void 0 ? void 0 : _d.grid.currentViewData[i]['Change']);
            var minChange = -2 - ((_e = this.treegrid) === null || _e === void 0 ? void 0 : _e.grid.currentViewData[i]['Change']);
            var newChange = Math.max(Math.min(num, maxChange), minChange);
            (_f = this.treegrid) === null || _f === void 0 ? void 0 : _f.grid.setCellValue((_g = this.treegrid) === null || _g === void 0 ? void 0 : _g.grid.currentViewData[i]['id'], 'Change', parseFloat(newChange.toFixed(2)));
            this.isDataBound = true;
            var newPercentageChange = void 0;
            if (this.treegrid.grid.currentViewData[i]['indexfunds'] === "NIFTY 50") {
                newPercentageChange = Math.max(Math.min(newChange, 2), -2);
            }
            else if (this.treegrid.grid.currentViewData[i]['indexfunds'] === "NIFTY BANK") {
                newPercentageChange = Math.max(Math.min(newChange, 4), -4);
            }
            else {
                var maxPercentageChange = 2 - this.treegrid.grid.currentViewData[i]['PercentageChange'];
                var minPercentageChange = -2 - this.treegrid.grid.currentViewData[i]['PercentageChange'];
                newPercentageChange = Math.max(Math.min(newChange, maxPercentageChange), minPercentageChange);
            }
            (_h = this.treegrid) === null || _h === void 0 ? void 0 : _h.grid.setCellValue((_j = this.treegrid) === null || _j === void 0 ? void 0 : _j.grid.currentViewData[i]['id'], 'PercentageChange', parseFloat(newPercentageChange.toFixed(2)));
            this.isDataBound = true;
            var val = ((_k = this.treegrid) === null || _k === void 0 ? void 0 : _k.grid.currentViewData[i]['Ltp']) + newPercentageChange;
            (_l = this.treegrid) === null || _l === void 0 ? void 0 : _l.grid.setCellValue((_m = this.treegrid) === null || _m === void 0 ? void 0 : _m.grid.currentViewData[i]['id'], 'Ltp', val);
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
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { style: { marginBottom: '10px' } },
                    React.createElement("label", { htmlFor: "feedDelayInput", style: { display: 'inline-block', fontSize: '14px', paddingLeft: '5px' } },
                        React.createElement("b", null, "Feed Delay(ms):")),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "feedDelayInput", format: "N0", value: 1000, min: 100, max: 5000, step: 1, width: '150px', style: { marginLeft: '7px' }, ref: function (scope) {
                            _this.feedDelayInput = scope;
                        }, "aria-label": "Feed Delay in milliseconds" }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "update", ref: function (scope) {
                            _this.updateButton = scope;
                        }, onClick: this.updateClick, style: { marginLeft: '10px' }, "aria-label": "Start Data Update" }, "Start Data Update"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", ref: function (scope) {
                            _this.clearButton = scope;
                        }, onClick: this.clearClick, style: { marginLeft: '10px' }, "aria-label": "Stop Data Update" }, "Stop Data Update"),
                    React.createElement("br", null)),
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { id: "livestream", dataSource: data_1.getTradeData, enableHover: false, treeColumnIndex: 1, childMapping: 'subtasks', height: 350, ref: function (g) {
                        _this.treegrid = g;
                    }, allowSelection: false, queryCellInfo: this.queryCellInfo, load: this.load, created: this.created.bind(this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "id", headerText: "ID", width: "140", isPrimaryKey: true, visible: false }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "indexfunds", headerText: "Index Funds", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Ltp", headerText: "Last Traded Price", width: "150", format: "C2", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Change", headerText: "Change", width: "100", format: "C2", type: "number", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "PercentageChange", width: "110", headerText: "% Change", format: "N0", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Open", headerText: "Open Price", width: "150" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "High", width: "190", headerText: "High Price" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Low", width: "150", headerText: "Low Price" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Weekhigh", width: "130", headerText: "52W H" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Weeklow", width: "130", headerText: "52W L" }))),
                React.createElement("br", null),
                React.createElement("div", null,
                    React.createElement("p", null,
                        React.createElement("b", null, "Disclaimer :"),
                        "The index fund data showcased in this sample is for demonstration purposes only and does not reflect actual or real-time data."))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how frequently Tree Grid cells are updated in real-time data at a set interval.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " The updating of Tree Grid cells can be done without any performance lagging by using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/treegrid/#setcellvalue" }, "setCellValue"),
                    " method. The style of Tree Grid cells can be customized using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/treegrid/#querycellinfo" }, "queryCellInfo"),
                    " event."),
                React.createElement("p", null, "In this demo,"),
                React.createElement("ul", null,
                    React.createElement("li", null, " Clicking the start update button triggers automatic updates of Tree Grid cells at the interval set in the feed delay text box which is a milliseconds format."),
                    React.createElement("li", null, " Clicking the stop update button will halt the automatic updating of Tree Grid cells.")),
                React.createElement("p", null,
                    "More information on the Tree Grid instantiation can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/treegrid/getting-started/' }, " documentation section.")))));
    };
    return LiveStream;
}(sample_base_1.SampleBase));
exports.LiveStream = LiveStream;
