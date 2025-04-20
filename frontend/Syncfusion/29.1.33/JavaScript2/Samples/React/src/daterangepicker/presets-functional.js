"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./preset-style.css");
var getInitialLabels = function (culture) {
    var labels = {
        en: {
            thisWeek: "This Week",
            thisMonth: "This Month",
            lastMonth: "Last Month",
            lastYear: "Last Year",
        },
        de: {
            thisWeek: "Diese Woche",
            thisMonth: "Dieser Monat",
            lastMonth: "Letzter Monat",
            lastYear: "Letztes Jahr",
        },
        "fr-CH": {
            thisWeek: "Cette semaine",
            thisMonth: "Ce mois-ci",
            lastMonth: "Le mois dernier",
            lastYear: "L'année dernière",
        },
        ar: {
            thisWeek: "هذا الأسبوع",
            thisMonth: "هذا الشهر",
            lastMonth: "الشهر الماضي",
            lastYear: "السنة الماضية",
        },
        zh: {
            thisWeek: "本周",
            thisMonth: "本月",
            lastMonth: "上个月",
            lastYear: "去年",
        },
    };
    return labels[culture] || labels.en;
};
var Presets = function () {
    // Cast the element to the correct type
    var currentCultureElement = document.getElementById("sb-setting-culture_hidden");
    var currentCulture = (currentCultureElement === null || currentCultureElement === void 0 ? void 0 : currentCultureElement.value) || "en";
    var labels = (0, react_1.useState)(function () { return getInitialLabels(currentCulture); })[0];
    var dates = (0, react_1.useMemo)(function () {
        var weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        var weekEnd = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        var monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
        var monthEnd = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString());
        var lastStart = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
        var lastEnd = new Date(new Date(new Date().setDate(0)).toDateString());
        var yearStart = new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString());
        var yearEnd = new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString());
        return { weekStart: weekStart, weekEnd: weekEnd, monthStart: monthStart, monthEnd: monthEnd, lastStart: lastStart, lastEnd: lastEnd, yearStart: yearStart, yearEnd: yearEnd };
    }, [labels]);
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { placeholder: 'Select a range' },
                    React.createElement(ej2_react_calendars_1.PresetsDirective, null,
                        React.createElement(ej2_react_calendars_1.PresetDirective, { label: labels.thisWeek, start: dates.weekStart, end: dates.weekEnd }),
                        React.createElement(ej2_react_calendars_1.PresetDirective, { label: labels.thisMonth, start: dates.monthStart, end: dates.monthEnd }),
                        React.createElement(ej2_react_calendars_1.PresetDirective, { label: labels.lastMonth, start: dates.lastStart, end: dates.lastEnd }),
                        React.createElement(ej2_react_calendars_1.PresetDirective, { label: labels.lastYear, start: dates.yearStart, end: dates.yearEnd }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "Click/Touch the DateRangePicker popup icon to view and select the list of custom preset ranges. Select the custom range option which is provided at the end of this list to open date range picker popup calendar for selecting custom ranges.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "DateRangePicker"),
                " component has presets support to display the collection of required ranges in the popup element. User can select a required range from the list and the selected range value will be updated in the component."),
            React.createElement("p", null,
                "More information on the DateRangePicker presets support can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/customization/#preset-ranges", target: "_blank" }, "documentation section"),
                "."))));
};
exports.default = Presets;
