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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.headertext = exports.scatterdata4 = exports.scatterdata3 = exports.scatterdata2 = exports.scatterdata1 = exports.scatterdata = exports.bubbledata = exports.steplinedata = exports.rangecolumndata = exports.bardata = exports.areadata = exports.columndata = exports.linedata = exports.splinedata = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.splinedata = [
    { x: '1', y: 30 },
    { x: '2', y: 10 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 5 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
];
exports.linedata = [
    { x: '1', y: 10 },
    { x: '2', y: 30 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
];
exports.columndata = [
    { x: '1', y: 90 },
    { x: '2', y: 10 },
    { x: '3', y: 50 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 70 },
    { x: '7', y: 9 }
];
exports.areadata = [
    { x: '1', y: 10 },
    { x: '2', y: 20 },
    { x: '3', y: 80 },
    { x: '4', y: 15 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 }
];
exports.bardata = [
    { x: '1', y: 90 },
    { x: '2', y: 10 },
    { x: '3', y: 50 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 70 },
    { x: '7', y: 9 }
];
exports.rangecolumndata = [
    { x: '1', low: 30, high: 60 },
    { x: '2', low: 42, high: 73 },
    { x: '3', low: 35, high: 80 },
    { x: '4', low: 20, high: 50 },
    { x: '5', low: 30, high: 80 },
    { x: '6', low: 10, high: 40 },
    { x: '7', low: 15, high: 69 }
];
exports.steplinedata = [
    { x: '1', y: 10 },
    { x: '2', y: 30 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
];
exports.bubbledata = [
    { x: '1.5', y: 80, size: 5 },
    { x: '2', y: 60, size: 10 },
    { x: '3', y: 70, size: 8 },
    { x: '4', y: 13, size: 6 },
    { x: '5', y: 30, size: 9 },
    { x: '6', y: 20, size: 7 },
    { x: '6.5', y: 40, size: 11 }
];
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
;
;
exports.scatterdata = shuffleArray([
    { x: '1', y: 15, y1: 10 },
    { x: '1.25', y: 35, y1: 20 },
    { x: '1.5', y: 60, y1: 50 },
    { x: '1.75', y: 25, y1: 15 },
    { x: '2', y: 25, y1: 35 },
    { x: '2.25', y: 30, y1: 30 },
    { x: '2.5', y: 45, y1: 30 },
    { x: '2.75', y: 40, y1: 20 },
    { x: '3', y: 30, y1: 45 },
    { x: '3.25', y: 55, y1: 35 },
    { x: '3.5', y: 65, y1: 20 },
    { x: '3.75', y: 40, y1: 50 },
    { x: '4', y: 40, y1: 60 },
    { x: '4.25', y: 60, y1: 25 },
    { x: '4.5', y: 15, y1: 25 },
    { x: '4.75', y: 75, y1: 55 },
    { x: '5', y: 50, y1: 40 },
    { x: '5.25', y: 45, y1: 30 },
    { x: '5.5', y: 20, y1: 15 },
    { x: '5.75', y: 65, y1: 35 },
    { x: '6', y: 65, y1: 65 },
    { x: '6.25', y: 35, y1: 50 },
    { x: '6.5', y: 70, y1: 35 },
    { x: '6.75', y: 50, y1: 40 },
    { x: '7', y: 25, y1: 60 },
    { x: '7.25', y: 60, y1: 45 },
    { x: '7.5', y: 45, y1: 20 },
    { x: '7.75', y: 30, y1: 15 },
    { x: '8', y: 60, y1: 50 },
    { x: '8.25', y: 25, y1: 35 },
    { x: '8.5', y: 30, y1: 10 },
    { x: '8.75', y: 45, y1: 25 },
    { x: '9', y: 75, y1: 45 },
    { x: '9.25', y: 40, y1: 50 },
    { x: '9.5', y: 20, y1: 15 },
    { x: '9.75', y: 30, y1: 40 },
    { x: '10', y: 60, y1: 25 }
]);
exports.scatterdata1 = shuffleArray([
    { x: '1', y: 60, y1: 45 },
    { x: '1.25', y: 40, y1: 30 },
    { x: '1.5', y: 25, y1: 10 },
    { x: '1.75', y: 15, y1: 50 },
    { x: '2', y: 15, y1: 65 },
    { x: '2.25', y: 35, y1: 50 },
    { x: '2.5', y: 40, y1: 30 },
    { x: '2.75', y: 60, y1: 25 },
    { x: '3', y: 65, y1: 25 },
    { x: '3.25', y: 30, y1: 15 },
    { x: '3.5', y: 20, y1: 60 },
    { x: '3.75', y: 50, y1: 40 },
    { x: '4', y: 50, y1: 35 },
    { x: '4.25', y: 55, y1: 50 },
    { x: '4.5', y: 75, y1: 15 },
    { x: '4.75', y: 45, y1: 60 },
    { x: '5', y: 45, y1: 50 },
    { x: '5.25', y: 35, y1: 30 },
    { x: '5.5', y: 30, y1: 20 },
    { x: '5.75', y: 55, y1: 40 },
    { x: '6', y: 70, y1: 55 },
    { x: '6.25', y: 60, y1: 25 },
    { x: '6.5', y: 15, y1: 40 },
    { x: '6.75', y: 40, y1: 15 },
    { x: '7', y: 30, y1: 25 },
    { x: '7.25', y: 60, y1: 35 },
    { x: '7.5', y: 60, y1: 35 },
    { x: '7.75', y: 25, y1: 15 },
    { x: '8', y: 25, y1: 10 },
    { x: '8.25', y: 50, y1: 30 },
    { x: '8.5', y: 45, y1: 65 },
    { x: '8.75', y: 55, y1: 20 },
    { x: '9', y: 50, y1: 60 },
    { x: '9.25', y: 30, y1: 45 },
    { x: '9.5', y: 10, y1: 20 },
    { x: '9.75', y: 40, y1: 35 },
    { x: '10', y: 55, y1: 15 }
]);
exports.scatterdata2 = shuffleArray([
    { x: '1', y: 70, y1: 25 },
    { x: '1.25', y: 55, y1: 40 },
    { x: '1.5', y: 45, y1: 40 },
    { x: '1.75', y: 30, y1: 45 },
    { x: '2', y: 20, y1: 55 },
    { x: '2.25', y: 30, y1: 45 },
    { x: '2.5', y: 10, y1: 35 },
    { x: '2.75', y: 25, y1: 15 },
    { x: '3', y: 50, y1: 20 },
    { x: '3.25', y: 60, y1: 30 },
    { x: '3.5', y: 25, y1: 60 },
    { x: '3.75', y: 50, y1: 45 },
    { x: '4', y: 30, y1: 15 },
    { x: '4.25', y: 55, y1: 20 },
    { x: '4.5', y: 65, y1: 75 },
    { x: '4.75', y: 45, y1: 35 },
    { x: '5', y: 60, y1: 45 },
    { x: '5.25', y: 35, y1: 10 },
    { x: '5.5', y: 15, y1: 30 },
    { x: '5.75', y: 30, y1: 60 },
    { x: '6', y: 55, y1: 50 },
    { x: '6.25', y: 25, y1: 45 },
    { x: '6.5', y: 35, y1: 10 },
    { x: '6.75', y: 20, y1: 30 },
    { x: '7', y: 40, y1: 65 },
    { x: '7.25', y: 30, y1: 45 },
    { x: '7.5', y: 30, y1: 60 },
    { x: '7.75', y: 45, y1: 30 },
    { x: '8', y: 60, y1: 45 },
    { x: '8.25', y: 50, y1: 40 },
    { x: '8.5', y: 20, y1: 25 },
    { x: '8.75', y: 70, y1: 15 },
    { x: '9', y: 75, y1: 15 },
    { x: '9.25', y: 30, y1: 50 },
    { x: '9.5', y: 50, y1: 35 },
    { x: '9.75', y: 55, y1: 20 },
    { x: '10', y: 15, y1: 70 }
]);
exports.scatterdata3 = shuffleArray([
    { x: '1', y: 20, y1: 30 },
    { x: '1.25', y: 30, y1: 20 },
    { x: '1.5', y: 35, y1: 60 },
    { x: '1.75', y: 40, y1: 30 },
    { x: '2', y: 55, y1: 20 },
    { x: '2.25', y: 45, y1: 35 },
    { x: '2.5', y: 60, y1: 45 },
    { x: '2.75', y: 25, y1: 30 },
    { x: '3', y: 45, y1: 15 },
    { x: '3.25', y: 50, y1: 45 },
    { x: '3.5', y: 50, y1: 35 },
    { x: '3.75', y: 15, y1: 40 },
    { x: '4', y: 15, y1: 70 },
    { x: '4.25', y: 45, y1: 55 },
    { x: '4.5', y: 75, y1: 10 },
    { x: '4.75', y: 60, y1: 25 },
    { x: '5', y: 30, y1: 55 },
    { x: '5.25', y: 45, y1: 35 },
    { x: '5.5', y: 60, y1: 25 },
    { x: '5.75', y: 40, y1: 45 },
    { x: '6', y: 10, y1: 50 },
    { x: '6.25', y: 20, y1: 65 },
    { x: '6.5', y: 65, y1: 40 },
    { x: '6.75', y: 30, y1: 30 },
    { x: '7', y: 25, y1: 65 },
    { x: '7.25', y: 35, y1: 40 },
    { x: '7.5', y: 20, y1: 45 },
    { x: '7.75', y: 60, y1: 50 },
    { x: '8', y: 35, y1: 60 },
    { x: '8.25', y: 25, y1: 45 },
    { x: '8.5', y: 30, y1: 15 },
    { x: '8.75', y: 50, y1: 70 },
    { x: '9', y: 45, y1: 75 },
    { x: '9.25', y: 20, y1: 35 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 45, y1: 30 },
    { x: '10', y: 50, y1: 25 }
]);
exports.scatterdata4 = shuffleArray([
    { x: '1', y: 50, y1: 60 },
    { x: '1.25', y: 45, y1: 55 },
    { x: '1.5', y: 15, y1: 30 },
    { x: '1.75', y: 55, y1: 20 },
    { x: '2', y: 60, y1: 45 },
    { x: '2.25', y: 55, y1: 35 },
    { x: '2.5', y: 55, y1: 20 },
    { x: '2.75', y: 30, y1: 50 },
    { x: '3', y: 70, y1: 50 },
    { x: '3.25', y: 25, y1: 35 },
    { x: '3.5', y: 30, y1: 35 },
    { x: '3.75', y: 45, y1: 60 },
    { x: '4', y: 65, y1: 15 },
    { x: '4.25', y: 20, y1: 70 },
    { x: '4.5', y: 25, y1: 75 },
    { x: '4.75', y: 35, y1: 25 },
    { x: '5', y: 40, y1: 60 },
    { x: '5.25', y: 50, y1: 30 },
    { x: '5.5', y: 20, y1: 10 },
    { x: '5.75', y: 35, y1: 40 },
    { x: '6', y: 35, y1: 45 },
    { x: '6.25', y: 30, y1: 25 },
    { x: '6.5', y: 30, y1: 70 },
    { x: '6.75', y: 60, y1: 20 },
    { x: '7', y: 45, y1: 25 },
    { x: '7.25', y: 40, y1: 35 },
    { x: '7.5', y: 20, y1: 55 },
    { x: '7.75', y: 50, y1: 40 },
    { x: '8', y: 50, y1: 40 },
    { x: '8.25', y: 35, y1: 55 },
    { x: '8.5', y: 60, y1: 35 },
    { x: '8.75', y: 30, y1: 60 },
    { x: '9', y: 10, y1: 65 },
    { x: '9.25', y: 25, y1: 50 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 30, y1: 25 },
    { x: '10', y: 65, y1: 30 },
]);
exports.headertext = [
    { text: "Line" },
    { text: "Column" },
    { text: "Spline" },
    { text: "Area" },
    { text: "Bar" },
    { text: "Bubble" },
    { text: "Scatter" },
    { text: "Step line" },
    { text: "Range column" }
];
function generateRandomValues(item) {
    var min = 10;
    var max = 95;
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return { x: item.x, y: value };
}
;
function generateRandomBubbleData(item) {
    var minYValue = 5;
    var maxYValue = 95;
    var randomYValue = Math.random() * (maxYValue - minYValue) + minYValue;
    var minSize = 3.5;
    var maxSize = 9.5;
    var randomSize = Math.random() * (maxSize - minSize) + minSize;
    return __assign(__assign({}, item), { y: randomYValue, size: randomSize });
}
;
/**
 * Series animation sample
 */
var SeriesAnimation = function () {
    var _a = (0, react_1.useState)(null), intervalId = _a[0], setIntervalId = _a[1];
    var _b = (0, react_1.useState)(null), splineIntervalId = _b[0], splineSetIntervalId = _b[1];
    var _c = (0, react_1.useState)(null), columnIntervalId = _c[0], columnSetIntervalId = _c[1];
    var _d = (0, react_1.useState)(null), areaIntervalId = _d[0], areaSetIntervalId = _d[1];
    var _e = (0, react_1.useState)(null), barIntervalId = _e[0], barSetIntervalId = _e[1];
    var _f = (0, react_1.useState)(null), rangeIntervalId = _f[0], rangeSetIntervalId = _f[1];
    var _g = (0, react_1.useState)(null), stepIntervalId = _g[0], stepSetIntervalId = _g[1];
    var _h = (0, react_1.useState)(null), scatterIntervalId = _h[0], scatterSetIntervalId = _h[1];
    var _j = (0, react_1.useState)(null), bubbleIntervalId = _j[0], bubbleSetIntervalId = _j[1];
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        return function () {
            clearIntervalFn();
        };
    }, []);
    var onsplineLoad = function (args) {
        var chart = document.getElementById('splineCharts');
        chart.setAttribute('title', '');
    };
    var splineLoad = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        splineClearIntervalFn();
        splineIntervalId = setInterval(function () {
            var container = document.getElementById('splineCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.splinedata.map(function (item) {
                    var min = 10;
                    var max = 90;
                    var value = Math.floor(Math.random() * (max - min + 1)) + min;
                    return { x: item.x, y: value };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                splineClearIntervalFn();
            }
        }, 2000);
    };
    var splineClearIntervalFn = function () {
        if (splineIntervalId) {
            clearInterval(splineIntervalId);
            splineSetIntervalId(null);
        }
    };
    var onlineLoad = function (args) {
        var chart = document.getElementById('lineCharts');
        chart.setAttribute('title', '');
    };
    var lineload = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        clearIntervalFn();
        intervalId = setInterval(function () {
            var container = document.getElementById('lineCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.linedata.map(generateRandomValues);
                if (args.chart && args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                clearIntervalFn();
            }
        }, 2000);
    };
    var clearIntervalFn = function () {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    var oncolumnLoad = function (args) {
        var chart = document.getElementById('columnCharts');
        chart.setAttribute('title', '');
    };
    var columnload = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        columnClearIntervalFn();
        columnIntervalId = setInterval(function () {
            var container = document.getElementById('columnCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.columndata.map(generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                columnClearIntervalFn();
            }
        }, 2000);
    };
    var columnClearIntervalFn = function () {
        if (columnIntervalId) {
            clearInterval(columnIntervalId);
            columnSetIntervalId(null);
        }
    };
    var onareaLoad = function (args) {
        var chart = document.getElementById('areaCharts');
        chart.setAttribute('title', '');
    };
    var areaload = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        areaClearIntervalFn();
        areaIntervalId = setInterval(function () {
            var container = document.getElementById('areaCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.areadata.map(generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                areaClearIntervalFn();
            }
        }, 2000);
    };
    var areaClearIntervalFn = function () {
        if (areaIntervalId) {
            clearInterval(areaIntervalId);
            areaSetIntervalId(null);
        }
    };
    var onbarLoad = function (args) {
        var chart = document.getElementById('barcharts');
        chart.setAttribute('title', '');
    };
    var barload = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        barClearIntervalFn();
        barIntervalId = setInterval(function () {
            var container = document.getElementById('barcharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.bardata.map(generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                barClearIntervalFn();
            }
        }, 2000);
    };
    var barClearIntervalFn = function () {
        if (barIntervalId) {
            clearInterval(barIntervalId);
            barSetIntervalId(null);
        }
    };
    var onrangeLoad = function (args) {
        var chart = document.getElementById('rangecharts');
        chart.setAttribute('title', '');
    };
    var rangeload = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        rangeClearIntervalFn();
        rangeIntervalId = setInterval(function () {
            var container = document.getElementById('rangecharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.rangecolumndata.map(function (item) {
                    var highMin = 50;
                    var highMax = 95;
                    var lowMin = 5;
                    var lowMax = 45;
                    var highValue = Math.floor(Math.random() * (highMax - highMin + 1)) + highMin;
                    var lowValue = Math.floor(Math.random() * (lowMax - lowMin + 1)) + lowMin;
                    return { x: item.x, high: highValue, low: lowValue };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                rangeClearIntervalFn();
            }
        }, 2000);
    };
    var rangeClearIntervalFn = function () {
        if (rangeIntervalId) {
            clearInterval(rangeIntervalId);
            rangeSetIntervalId(null);
        }
    };
    var onStepLoad = function (args) {
        var chart = document.getElementById('stepcharts');
        chart.setAttribute('title', '');
    };
    var stepLoad = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        stepClearIntervalFn();
        stepIntervalId = setInterval(function () {
            var container = document.getElementById('stepcharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var newData = exports.steplinedata.map(generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                stepClearIntervalFn();
            }
        }, 2000);
    };
    var stepClearIntervalFn = function () {
        if (stepIntervalId) {
            clearInterval(stepIntervalId);
            stepSetIntervalId(null);
        }
    };
    var onScatterLoad = function (args) {
        var chart = document.getElementById('scattercharts');
        chart.setAttribute('title', '');
    };
    var scatterLoad = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        var index = 1;
        var datasets = [exports.scatterdata, exports.scatterdata1, exports.scatterdata2, exports.scatterdata3, exports.scatterdata4];
        scatterClearIntervalFn();
        scatterIntervalId = setInterval(function () {
            var container = document.getElementById('scattercharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                var scatterDataSource = datasets[index % datasets.length];
                index++;
                args.chart.series[0].setData(scatterDataSource, 2000);
                args.chart.series[1].setData(scatterDataSource, 2000);
            }
            else {
                scatterClearIntervalFn();
            }
        }, 2000);
    };
    var scatterClearIntervalFn = function () {
        if (scatterIntervalId) {
            clearInterval(scatterIntervalId);
            scatterSetIntervalId(null);
        }
    };
    var onBubbleLoad = function (args) {
        var chart = document.getElementById('bubblecharts');
        chart.setAttribute('title', '');
    };
    var bubbleLoad = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        bubbleClearIntervalFn();
        bubbleIntervalId = setInterval(function () {
            var container = document.getElementById('bubblecharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                if (args.chart.series.length > 0) {
                    var newBubbleData = exports.bubbledata.map(generateRandomBubbleData);
                    newBubbleData = shuffleArray(newBubbleData);
                    args.chart.series[0].setData(newBubbleData, 1400);
                }
            }
            else {
                bubbleClearIntervalFn();
            }
        }, 2000);
    };
    var bubbleClearIntervalFn = function () {
        if (bubbleIntervalId) {
            clearInterval(bubbleIntervalId);
            bubbleSetIntervalId(null);
        }
    };
    var pointRender = function (args) {
        (0, theme_color_1.bubblePointRender)(args);
    };
    var tabSelected = function (e) {
        var chartIds = [
            'lineCharts',
            'splineCharts',
            'columnCharts',
            'areaCharts',
            'barcharts',
            'rangecharts',
            'stepcharts',
            'scattercharts',
            'bubblecharts'
        ];
        chartIds.forEach(function (id, index) {
            if (index === e.selectedIndex) {
                var chartElement = document.getElementById(id);
                if (chartElement) {
                    var chart = chartElement.ej2_instances[0];
                    chart.refresh();
                }
            }
        });
    };
    var SplineTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'splineCharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, loaded: onsplineLoad.bind(_this), load: splineLoad.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.splinedata, width: 2.5, marker: { visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } }, xName: 'x', yName: "y", type: 'Spline', animation: { enable: true } })))); };
    var LineTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'lineCharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, loaded: onlineLoad.bind(_this), load: lineload.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.linedata, width: 2.5, marker: { visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } }, xName: 'x', yName: "y", type: 'Line', animation: { enable: true } })))); };
    var ColumnTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'columnCharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, loaded: oncolumnLoad.bind(_this), load: columnload.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.columndata, xName: 'x', yName: "y", type: 'Column', animation: { enable: true }, marker: { dataLabel: { visible: true, position: 'Outer' } }, cornerRadius: { topLeft: 4, topRight: 4 } })))); };
    var AreaTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'areaCharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, loaded: onareaLoad.bind(_this), load: areaload.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.areadata, xName: 'x', yName: "y", type: 'SplineArea', animation: { enable: true }, marker: { dataLabel: { visible: true, position: 'Outer' } } })))); };
    var BarTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'barcharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { lineStyle: { width: 0 }, labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', majorTickLines: { width: 0 } }, loaded: onbarLoad.bind(_this), load: barload.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BarSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.bardata, xName: 'x', yName: "y", type: 'Bar', animation: { enable: true }, marker: { dataLabel: { visible: true, position: 'Outer' } }, cornerRadius: { bottomRight: 4, topRight: 4 } })))); };
    var RangeColumnTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'rangecharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, loaded: onrangeLoad.bind(_this), load: rangeload.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.rangecolumndata, high: "high", low: "low", xName: 'x', columnSpacing: 0.1, type: 'RangeColumn', animation: { enable: true }, marker: { dataLabel: { visible: true, position: 'Outer' } }, cornerRadius: { bottomRight: 4, bottomLeft: 4, topLeft: 4, topRight: 4 } })))); };
    var StepLineTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'stepcharts', style: { marginTop: '10px' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', maximum: 100, minimum: 0, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, loaded: onStepLoad.bind(_this), load: stepLoad.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepLineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.steplinedata, width: 2.5, xName: 'x', yName: "y", type: 'StepLine', animation: { enable: true }, marker: { dataLabel: { visible: false, position: 'Outer' } } })))); };
    var ScatterTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'scattercharts', style: { marginTop: '10px' }, primaryXAxis: { minimum: 1, interval: 1, maximum: 10, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, primaryYAxis: { majorTickLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 0, maximum: 80, interval: 10, rangePadding: 'None' }, load: scatterLoad.bind(_this), loaded: onScatterLoad.bind(_this), chartArea: { border: { width: 0 } } },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Highlight] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.scatterdata, xName: 'x', yName: 'y', type: 'Scatter', marker: { visible: false, width: 8, height: 8, shape: 'Circle' }, animation: { enable: true } }),
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.scatterdata, xName: 'x', yName: 'y1', type: 'Scatter', marker: { visible: false, width: 8, height: 8, shape: 'Circle' }, animation: { enable: true } })))); };
    var BubbleTemplate = function () { return (React.createElement(ej2_react_charts_1.ChartComponent, { id: 'bubblecharts', style: { marginTop: '10px' }, pointRender: pointRender, chartArea: { border: { width: 0 } }, primaryXAxis: { minimum: 1, maximum: 7, interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, load: bubbleLoad.bind(_this), primaryYAxis: { minimum: 0, maximum: 100, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, legendSettings: { visible: false }, loaded: onBubbleLoad.bind(_this) },
        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BubbleSeries, ej2_react_charts_1.Category] }),
        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.bubbledata, type: 'Bubble', border: { width: 2 }, xName: 'x', yName: 'y', size: 'size', animation: { enable: true } })))); };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_navigations_1.TabComponent, { cssClass: 'responsive-mode', heightAdjustMode: 'None', overflowMode: "Scrollable", headerPlacement: "Top", height: "500px", selected: tabSelected.bind(_this) },
                React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[0], content: function () { return React.createElement(LineTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[1], content: function () { return React.createElement(ColumnTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[2], content: function () { return React.createElement(SplineTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[3], content: function () { return React.createElement(AreaTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[4], content: function () { return React.createElement(BarTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[5], content: function () { return React.createElement(BubbleTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[6], content: function () { return React.createElement(ScatterTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[7], content: function () { return React.createElement(StepLineTemplate, null); } }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: exports.headertext[8], content: function () { return React.createElement(RangeColumnTemplate, null); } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the animation capabilities of various chart series types in React Charts. The chart updates its data dynamically at regular intervals to showcase smooth transitions and animations.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, different types of chart series, such as Line, Column, Spline, Area, Bar, Bubble, Scatter, Step Line, and Range Column, are animated to demonstrate real-time data updates. The chart dynamically updates with random values using the ",
                React.createElement("code", null, "setData"),
                " method. Each chart type reflects its unique characteristics and enhances visual understanding through animations."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are divided into individual, feature-specific modules. To use a particular series, you need to inject the corresponding series module using the ",
                React.createElement("code", null, "Chart.Inject(LineSeries)"),
                " method."),
            React.createElement("p", null,
                "More information on the various chart types can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/line", "aria-label": "Navigate to the documentation for Line Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = SeriesAnimation;
