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
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./live-data.css");
/**
 * PivotView LiveData Sample.
 */
function LiveData() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var timerID;
    var initial = true;
    var previousPivotValues;
    var updateButton;
    var clearButton;
    var feedDelayInput;
    var colourScheme = ['bg-fade', 'bg-fade1', 'bg-fade2'];
    var REGIONS = [
        {
            "Region": "North America",
            "Countries": ["Canada", "United States", "Mexico"]
        },
        {
            "Region": "Middle East",
            "Countries": ["Turkey", "Saudi Arabia"]
        },
        {
            "Region": "Europe",
            "Countries": ["Russia", "Germany", "France", "United Kingdom", "Italy"]
        },
        {
            "Region": "Africa",
            "Countries": ["South Africa"]
        },
        {
            "Region": "Asia Pacific",
            "Countries": ["Australia", "China", "India", "Indonesia",
                "Japan", "South Korea"]
        },
        {
            "Region": "South America",
            "Countries": ["Brazil"]
        },
    ];
    var DATA = [
        {
            "Category": "Agriculture",
            "Type": "Corn",
            "Spread": 0.01,
            "Open Price": 379.50,
            "Price": 379.8026,
            "Buy": 379.7976,
            "Sell": 379.8076,
            "Change": 0.3026,
            "Change(%)": 0.0797,
            "Volume": 11266
        },
        {
            "Category": "Agriculture",
            "Type": "Rice",
            "Spread": 0.01,
            "Open Price": 11.245,
            "Price": 10.4154,
            "Buy": 10.4104,
            "Sell": 10.4204,
            "Change": -0.8296,
            "Change(%)": -7.3779,
            "Volume": 220
        },
        {
            "Category": "Agriculture",
            "Type": "Wheat",
            "Spread": 0.01,
            "Open Price": 465.50,
            "Price": 465.52,
            "Buy": 465.50,
            "Sell": 465.50,
            "Change": 0.02,
            "Change(%)": 0.0043,
            "Volume": 4318
        },
        {
            "Category": "Agriculture",
            "Type": "Soybean",
            "Spread": 0.01,
            "Open Price": 1038.00,
            "Price": 1038.6171,
            "Buy": 1038.6121,
            "Sell": 1038.6221,
            "Change": 0.6171,
            "Change(%)": 0.0595,
            "Volume": 20356
        },
        {
            "Category": "Agriculture",
            "Type": "Coffee",
            "Spread": 0.01,
            "Open Price": 125.70,
            "Price": 125.69,
            "Buy": 125.70,
            "Sell": 125.70,
            "Change": -0.01,
            "Change(%)": -0.008,
            "Volume": 1654
        },
        {
            "Category": "Agriculture",
            "Type": "Cocoa",
            "Spread": 0.01,
            "Open Price": 307.00,
            "Price": 307.03,
            "Buy": 307.00,
            "Sell": 307.00,
            "Change": 0.03,
            "Change(%)": 0.001,
            "Volume": 978
        },
    ];
    var dataSourceSettings = {
        dataSource: generateData(),
        enableSorting: true,
        columns: [{ name: 'Type' }],
        values: [{ name: 'Volume', caption: 'Volume' }, { name: 'Price', caption: 'Price' }, { name: 'Change', type: 'Avg', caption: 'Change(%)' }],
        rows: [{ name: 'Country' }],
        filters: [{ name: 'Category' }],
        formatSettings: [{ name: 'Price', format: 'C2' }, { name: 'Open Price', format: 'C2' }, { name: 'Change', format: "###.##'%'" }, { name: 'Volume', format: 'N0' }],
        expandAll: false,
        showSubTotals: false,
        showGrandTotals: false,
        emptyCellsTextContent: 'Revising',
        sortSettings: [{ name: 'Type', order: 'Ascending', membersOrder: ['Corn', 'Rice', 'Wheat', 'Soybean', 'Coffee', 'Cocoa'] }]
    };
    function generateData() {
        var count = 1000;
        var currData = [];
        var j = 0;
        for (var i = 0; i < count; i++) {
            var rand = Math.floor(Math.random() * Math.floor(DATA.length));
            var region = REGIONS[j];
            for (var k = 0; k < region.Countries.length; k++) {
                var data = Object.assign({}, DATA[rand]);
                var dataObj = __assign(__assign({}, data), { Region: region.Region, Country: region.Countries[k] });
                randomizeObjectData(dataObj);
                currData.push(dataObj);
            }
            j++;
            j = j > 5 ? 0 : j;
        }
        return currData;
    }
    function onLoad() {
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
            if (timerID) {
                clearInterval(timerID);
                timerID = undefined;
            }
        });
    }
    function randomizeObjectData(dataObj) {
        var changeP = "Change(%)";
        var res = generateNewPrice(dataObj.Price, dataObj.Volume);
        dataObj.Change = res.Price - dataObj.Price;
        dataObj.Price = res.Price;
        dataObj[changeP] = res.ChangePercent;
        dataObj.Volume = res.Volume;
    }
    function generateNewPrice(oldPrice, oldVolume) {
        var rnd = Math.random();
        rnd = Math.round(rnd * 100) / 100;
        var volatility = 15;
        var newPrice = 0;
        var newVolume = 0;
        var changePercent = 2 * volatility * rnd;
        if (changePercent > volatility) {
            changePercent -= (2 * volatility);
        }
        var changeVolumnPercent = 2 * (volatility - 5) * rnd;
        if (changeVolumnPercent > (volatility - 5)) {
            changeVolumnPercent -= (2 * (volatility - 5));
        }
        var changeAmount = oldPrice * (changePercent / 100);
        newPrice = oldPrice + changeAmount;
        var changeVolume = oldVolume * (changeVolumnPercent / 100);
        newVolume = oldVolume + changeVolume;
        newPrice = Math.round(newPrice * 100) / 100;
        newVolume = Math.round((newVolume * 100) / 100);
        var result = { Price: 0, ChangePercent: 0, Volume: 0 };
        changePercent = Math.round(changePercent * 100) / 100;
        result.Price = newPrice;
        result.ChangePercent = changePercent;
        result.Volume = newVolume;
        return result;
    }
    function updateCellValues() {
        if (!(0, ej2_base_1.isNullOrUndefined)(pivotObj)) {
            if (pivotObj.pivotValues.length > 0) {
                if (!previousPivotValues) {
                    previousPivotValues = pivotObj.pivotValues;
                }
                previousPivotValues = pivotObj.pivotValues;
            }
            pivotObj.dataSourceSettings.dataSource = generateData();
        }
    }
    ;
    function updateClick() {
        if (!timerID) {
            updateButton.disabled = true;
            feedDelayInput.enabled = false;
            clearButton.disabled = false;
            timerID = setInterval(updateCellValues, feedDelayInput.value);
        }
    }
    ;
    function clearClick() {
        if (timerID) {
            updateButton.disabled = false;
            feedDelayInput.enabled = true;
            clearButton.disabled = true;
            clearInterval(timerID);
            timerID = undefined;
        }
    }
    ;
    function cellTemplate(args) {
        if (args != null && args.cellInfo) {
            if (args.cellInfo.axis === 'value') {
                if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum && args.cellInfo.actualText === 'Change') {
                    args.targetCell.classList.add(cellColour(args.cellInfo.value));
                }
            }
        }
    }
    ;
    function cellColour(value) {
        var colorIndex = value < 0 ? 0 : value > 0 ? 1 : 2;
        return colourScheme[colorIndex];
    }
    ;
    function chartOnLoad(args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    ;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { style: { marginBottom: '10px' } },
                React.createElement("div", { style: { display: 'inline-block', fontSize: '14px', paddingLeft: '5px' } },
                    React.createElement("strong", null, "Feed Delay(ms)"),
                    ":"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: "N0", value: 5000, min: 5000, step: 1000, width: '150px', style: { marginLeft: '7px' }, placeholder: '0', ref: function (scope) { feedDelayInput = scope; } }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "update1", ref: function (scope) { updateButton = scope; }, onClick: updateClick, className: 'update-btn' }, "Start Updating..."),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", ref: function (scope) { clearButton = scope; }, onClick: clearClick, className: 'update-btn' }, "Stop Updating...")),
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView-LiveData', dataSourceSettings: dataSourceSettings, displayOption: { view: 'Both' }, width: '100%', height: '350', gridSettings: { columnWidth: 100 }, chartSettings: {
                    value: 'Price',
                    legendSettings: { visible: false },
                    chartSeries: { type: "Column" }, load: chartOnLoad.bind(this),
                    zoomSettings: {
                        enableScrollbar: false,
                        toolbarItems: [],
                        enableSelectionZooming: false,
                    },
                }, load: onLoad, ref: function (g) { pivotObj = g; }, cellTemplate: cellTemplate.bind(this) },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.PivotChart] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, " This sample demonstrates how frequently the pivot table and the pivot chart are updated with real-time data at a given time interval.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Both the pivot table and the pivot chart are receiving real-time data and periodically updating themselves every 5000 milliseconds. Furthermore, in this demonstration,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "The ",
                    React.createElement("strong", null, "\"Feed Delay\""),
                    " numeric text box can be used to change the time interval."),
                React.createElement("li", null,
                    "The ",
                    React.createElement("strong", null, "\"Start Updating...\""),
                    " button causes the pivot table to automatically update at the interval specified in the ",
                    React.createElement("strong", null, "\"Feed Delay\""),
                    " numeric text box, which is measured in milliseconds."),
                React.createElement("li", null,
                    "The pivot table's automatic updating can be stopped by selecting the ",
                    React.createElement("strong", null, "\"Stop Updating...\""),
                    " button."),
                React.createElement("li", null,
                    "Displayed the ",
                    React.createElement("strong", null, "\"Change(%)\""),
                    " values in the pivot table as red for negative values and green for positive values using the cell template concept.")),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the Essential",
                React.createElement("sup", null, "\u00AE"),
                " JS2 Pivot Table can be found in these ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#cell-template" }, "Cell Template"),
                " & ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/pivot-chart" }, "Pivot Chart"),
                " documentation section."))));
}
;
exports.default = LiveData;
