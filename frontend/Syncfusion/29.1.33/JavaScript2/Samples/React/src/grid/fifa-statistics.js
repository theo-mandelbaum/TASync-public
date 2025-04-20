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
exports.FIFAStatistics = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./fifa-statistics.css");
function ImageTemplate(props) {
    var value = '';
    var field = props.rowDetails.column.field;
    switch (field) {
        case 'Host':
            value = props.rowDetails['Host'];
            break;
        case 'Champions':
        case 'Coach':
            value = props.rowDetails['Champions'];
            break;
        case 'TopScorer':
            value = props.rowDetails['TopScorerCountry'];
            break;
        case 'BestPlayerAward':
            value = props.rowDetails['BestPlayerCountry'];
            break;
    }
    var className = (field === 'Coach' || field === 'TopScorer' || field === 'BestPlayerAward') ? 'infotooltip' : '';
    var src = '/src/grid/images/country/' + (data_1.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
    return (React.createElement("img", { alt: '', src: src, decoding: 'async', title: value, width: '23', height: '15', className: className, "data-file-width": '945', "data-file-height": '630' }));
}
var FIFAStatistics = /** @class */ (function (_super) {
    __extends(FIFAStatistics, _super);
    function FIFAStatistics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FIFAStatistics.prototype.colTemplate = function (args) {
        var host = args[args.column.field].split(',');
        var newRowData = [];
        host.forEach(function (item) {
            var obj = Object.assign({}, args);
            obj[args.column.field] = item;
            newRowData.push(obj);
        });
        return (React.createElement("div", null, host.map(function (item, index) { return (React.createElement("div", { key: index },
            React.createElement("span", null,
                React.createElement(ImageTemplate, { rowDetails: newRowData[index] })),
            ' ',
            React.createElement("a", { className: 'infotooltip', title: item, href: 'https://ej2.syncfusion.com/', onClick: function (e) { return e.preventDefault(); } }, item))); })));
    };
    ;
    FIFAStatistics.prototype.topScoreTemplate = function (args) {
        var players = args[args.column.field].split(',');
        var country = args['TopScorerCountry'].split(',');
        var newRowData = [];
        players.forEach(function (item, index) {
            var obj = Object.assign({}, args);
            obj['TopScorer'] = item;
            obj['TopScorerCountry'] = country[index];
            newRowData.push(obj);
        });
        var renderScoreIcons = function () {
            var listItems = [];
            for (var i = 0; i < args['TotalGoal']; i++) {
                listItems.push(React.createElement("svg", { key: i + 1, className: 'goal', width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM9.45103 9.48743L11.9038 9.65149C12.3112 8.95696 12.5764 8.16672 12.6584 7.32454L10.5776 6.01477C10.46 5.93821 10.3698 5.82336 10.326 5.68938C10.2823 5.5554 10.2877 5.41047 10.3397 5.27922L11.253 2.99875C10.7088 2.38625 10.0334 1.89133 9.27329 1.55774L7.38384 3.13274C7.2772 3.22297 7.13774 3.27219 6.99829 3.27219C6.85884 3.27219 6.72212 3.22297 6.61274 3.13274L4.72329 1.55774C3.96313 1.89133 3.28774 2.38625 2.7436 2.99875L3.65415 5.27922C3.7061 5.41047 3.71157 5.5554 3.66782 5.68938C3.62407 5.82336 3.53657 5.93821 3.41626 6.01477L1.33813 7.32454C1.41743 8.16672 1.6854 8.95696 2.09282 9.65149L4.54556 9.48743C4.68774 9.47922 4.82993 9.51751 4.94204 9.60227C5.05415 9.68704 5.13618 9.80735 5.17173 9.94407L5.77329 12.3284C6.16978 12.4132 6.5772 12.4597 6.99829 12.4597C7.41938 12.4597 7.82954 12.4159 8.22329 12.3284L8.82485 9.94407C8.85767 9.80462 8.9397 9.68704 9.05454 9.60227C9.16938 9.51751 9.30884 9.47922 9.45103 9.48743ZM5.30298 5.81516L6.61274 4.86633C6.84243 4.69954 7.15415 4.69954 7.38384 4.86633V4.8636L8.6936 5.81516C8.92329 5.98196 9.01899 6.27727 8.93149 6.54797L8.4311 8.08743C8.3436 8.35813 8.09204 8.54133 7.80767 8.54133H6.18892C5.90454 8.54133 5.65298 8.35813 5.56548 8.08743L5.06509 6.54797C4.97759 6.27727 5.07329 5.98196 5.30298 5.81516Z" })));
            }
            return listItems;
        };
        return (React.createElement("div", null,
            players.map(function (item, index) { return (React.createElement("div", { key: index },
                React.createElement("span", null,
                    !(args.column.field === 'TopScorer' &&
                        item.indexOf('Players') > -1) && (React.createElement(ImageTemplate, { rowDetails: newRowData[index] })),
                    ' '),
                args.column.field === 'TopScorer' &&
                    (item.indexOf('Players') > -1 || item.indexOf('Ronaldo') > -1) ? (React.createElement("span", null, item)) : (React.createElement("a", { className: 'infotooltip', title: item, href: 'https://ej2.syncfusion.com/', onClick: function (e) { return e.preventDefault(); } }, item)))); }),
            renderScoreIcons()));
    };
    ;
    FIFAStatistics.prototype.awardTemplate = function (args) {
        return (React.createElement("span", null,
            React.createElement("span", null,
                !(args.column.field === 'BestPlayerAward' &&
                    args[args.column.field] === 'Not awarded') && (React.createElement("span", null,
                    React.createElement("span", null,
                        React.createElement(ImageTemplate, { rowDetails: args })))),
                ' '),
            args.column.field === 'BestPlayerAward' &&
                (args[args.column.field] === 'Not awarded' || args[args.column.field] === 'Mario Kempes' ||
                    args[args.column.field] === 'Paolo Rossi' || args[args.column.field] === 'Salvatore Schillaci') ? (React.createElement("span", null,
                " ",
                args[args.column.field])) : (React.createElement("a", { className: 'infotooltip', href: 'https://ej2.syncfusion.com/', onClick: function (e) { return e.preventDefault(); } }, args[args.column.field]))));
    };
    ;
    FIFAStatistics.prototype.beforeRender = function (args) {
        var rowInfo = this.fifaGridIns.getRowInfo(args.target.closest('td'));
        var field = rowInfo.column.field;
        var value = rowInfo.rowData[field];
        var imageSource = '';
        var cellInfo = '';
        var hideImage = false;
        if (value) {
            switch (field) {
                case 'Host':
                    value = args.target.title;
                    imageSource = '/src/grid/images/country/' + (data_1.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
                    cellInfo = data_1.countryInfo[0][value.replace(/ /g, '_')];
                    break;
                case 'Champions':
                    imageSource = '/src/grid/images/team/' + value + '.png';
                    cellInfo = data_1.teamInfo[0][value.replace(/ /g, '_')];
                    break;
                case 'Coach':
                    if (args.target.tagName === 'IMG') {
                        value = rowInfo.rowData['Champions'];
                        imageSource = '/src/grid/images/country/' + (data_1.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
                        cellInfo = data_1.countryInfo[0][value.replace(/ /g, '_')];
                    }
                    else {
                        if (value === 'Juan López') {
                            hideImage = true;
                        }
                        imageSource = '/src/grid/images/coach/' + value + (value === 'Aymoré Moreira' ? '.png' : '.jpg');
                        cellInfo = data_1.coachInfo[0][value.replace(/ /g, '_')];
                    }
                    break;
                case 'TopScorer':
                    value = args.target.title;
                    if (args.target.tagName === 'IMG') {
                        if (value === 'Croatia') {
                            hideImage = true;
                        }
                        imageSource = '/src/grid/images/team/' + value + '.png';
                        cellInfo = data_1.teamInfo[0][value.replace(/ /g, '_')];
                    }
                    else {
                        imageSource = '/src/grid/images/top_scorer/' + value + '.jpg';
                        cellInfo = data_1.topScrorerInfo[0][value.replace(/ /g, '_')];
                    }
                    break;
                case 'BestPlayerAward':
                    if (args.target.tagName === 'IMG') {
                        value = rowInfo.rowData['BestPlayerCountry'];
                        if (value === 'Croatia') {
                            hideImage = true;
                        }
                        imageSource = '/src/grid/images/team/' + value + '.png';
                        cellInfo = data_1.teamInfo[0][value.replace(/ /g, '_')];
                    }
                    else {
                        imageSource = '/src/grid/images/best_player/' + value + '.jpg';
                        cellInfo = data_1.bestPlayerInfo[0][value.replace(/ /g, '_')];
                    }
                    break;
            }
            if ((args.target.tagName === 'IMG' && field === 'Coach') || field === 'Host') {
                this.isverticalPopup = true;
                this.tooltipObj.content = "\n          <div>\n            <div style='border-bottom: 1px solid #e0e0e0; '>\n              <img\n                alt=''\n                src='".concat(imageSource, "'\n                decoding='async'\n                width='275'\n                height='175'\n                class='mw-file-element'\n                data-file-width='945'\n                data-file-height='630'\n              />\n            </div>\n              <div style='padding: 12px'>\n                ").concat(cellInfo, "\n              </div>\n          </div>");
            }
            else {
                this.isverticalPopup = false;
                var display = hideImage ? 'none' : 'inline';
                this.tooltipObj.content = "\n          <div style='display: inline;'>\n            <div style='display: ".concat(display, "; float: right; border-left: 1px solid #e0e0e0; margin: 0 0 0 12px;'>\n              <img\n                alt=''\n                src='").concat(imageSource, "'\n                decoding='async'\n                width='190'\n                height='245'\n               class='mw-file-element'\n               data-file-width='945'\n               data-file-height='630'\n             />\n            </div>\n            <div style='padding: 12px 0 12px 12px'>\n              ").concat(cellInfo, "\n            </div>\n         </div>");
            }
        }
    };
    ;
    FIFAStatistics.prototype.beforeOpen = function (args) {
        args.element.style.maxWidth = this.isverticalPopup ? '275px' : '425px';
        args.element.style.width = this.isverticalPopup ? '275px' : '425px';
    };
    FIFAStatistics.prototype.queryCellInfo = function (args) {
        var _a, _b, _c;
        if (((_a = args.column) === null || _a === void 0 ? void 0 : _a.field) === 'BestPlayerAward') {
            var rowIndex = parseInt((_b = args.cell) === null || _b === void 0 ? void 0 : _b.getAttribute('index'));
            if (rowIndex > 0) {
                if (((_c = this.fifaGridIns.current) === null || _c === void 0 ? void 0 : _c.currentViewData[rowIndex - 1])[args.column.field] !== args.data[args.column.field]) {
                    args.rowSpan = this.calculateRowspan(args, rowIndex);
                }
            }
            else {
                args.rowSpan = this.calculateRowspan(args, rowIndex);
            }
        }
    };
    FIFAStatistics.prototype.calculateRowspan = function (args, rowIndex) {
        var _a, _b, _c, _d, _e;
        var rowspan = 1;
        for (var i = rowIndex + 1, j = 0; i < ((_a = this.fifaGridIns) === null || _a === void 0 ? void 0 : _a.currentViewData.length); i++, j++) {
            if (!(args.data[(_b = args.column) === null || _b === void 0 ? void 0 : _b.field] === ((_c = this.fifaGridIns) === null || _c === void 0 ? void 0 : _c.currentViewData[i])[(_d = args.column) === null || _d === void 0 ? void 0 : _d.field])) {
                rowspan = j + 1;
                break;
            }
            if (i === ((_e = this.fifaGridIns) === null || _e === void 0 ? void 0 : _e.currentViewData.length) - 1) {
                rowspan = j + 2;
                break;
            }
        }
        return rowspan;
    };
    FIFAStatistics.prototype.dataBound = function () {
        var _a;
        var tableEle = (_a = this.fifaGridIns) === null || _a === void 0 ? void 0 : _a.element.querySelector('.e-gridcontent table');
        if (tableEle) {
            tableEle.classList.add('tournament');
        }
    };
    FIFAStatistics.prototype.load = function (args) {
        args.requireTemplateRef = false;
    };
    FIFAStatistics.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_popups_1.TooltipComponent, { id: 'tooltip', cssClass: 'fifa_tooltip', target: '.infotooltip', beforeRender: this.beforeRender.bind(this), beforeOpen: this.beforeOpen.bind(this), ref: function (t) { return _this.tooltipObj = t; }, opensOn: 'Hover', width: 275 },
                    React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return _this.fifaGridIns = g; }, id: 'fifa_grid', dataSource: data_1.fifaData, gridLines: 'Both', allowSorting: true, enableStickyHeader: true, allowTextWrap: true, textWrapSettings: { wrapMode: 'Content' }, enableAltRow: true, enableHover: false, allowSelection: false, queryCellInfo: this.queryCellInfo.bind(this), dataBound: this.dataBound.bind(this), load: this.load.bind(this) },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Year', headerText: 'Year', width: '100', textAlign: 'Right' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Host', headerText: 'Organizer', template: this.colTemplate.bind(this), width: '140' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Champions', headerText: 'Champions', template: this.colTemplate.bind(this), width: '140' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Coach', headerText: 'Winning Coach', template: this.colTemplate.bind(this), width: '185' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'TopScorer', headerText: 'Most Scorer(s)', template: this.topScoreTemplate.bind(this), width: '185' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'BestPlayerAward', headerText: 'Player of season', template: this.awardTemplate.bind(this), width: '170' })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Sort] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null,
                    "In this demo, the Syncfusion DataGrid displays comprehensive FIFA World Cup records and statistics, covering the entire history of the tournament from 1930 to 2022. The FIFA World Cup statistics and data utilized in this application are sourced from",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://en.wikipedia.org/wiki/FIFA_World_Cup_records_and_statistics" }, "Wikipedia")),
                    ". We sincerely thank Wikipedia for their invaluable resource, which has been instrumental in preparing this demonstration.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "This section provides detailed information about the FIFA World Cup, including the year, host country, champion team, top scorer, best player, and winning coach. The data is enhanced with flags, icons, and hyperlinks for easy access to more details. The Grid",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#template" }, "column template")),
                    "feature allows custom content in grid cells, creating a rich, interactive display."))));
    };
    return FIFAStatistics;
}(sample_base_1.SampleBase));
exports.FIFAStatistics = FIFAStatistics;
