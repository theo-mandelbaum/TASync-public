"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Customization samples for sparkline
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #axis > * {\n         padding: 0px !important;\n     }";
var slidercss = "  \n     .content-wrapper {\n         width: 40%;\n         margin: 0 auto;\n         min-width: 170px;\n     }";
function Customization() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var percentage;
    var sales;
    var sparklineElement;
    var allElement;
    var negativeElement;
    var firstElement;
    var lastElement;
    var highElement;
    var lowElement;
    var markerElement;
    var datalabelElement;
    var tooltipElement;
    var tracklineElement;
    var axislineElement;
    var axisElement;
    var rtlElement;
    // Code for Property Panel
    var droplist = [
        { value: 'Sales Percentage' },
        { value: 'Sales Count' },
    ];
    function sparklineChange() {
        var element1 = document.getElementById('spark');
        if (element1.value === 'Sales Percentage') {
            axisElement.value = percentage.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 10;
        }
        else {
            axisElement.value = sales.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 5000000;
        }
        if ((element1.value === 'Sales Percentage' && percentage.markerSettings.visible.length) ||
            (element1.value === 'Sales Count' && sales.markerSettings.visible.length)) {
            markerElement.checked = true;
        }
        else {
            markerElement.checked = false;
        }
        markerChange();
        if ((element1.value === 'Sales Percentage' && percentage.dataLabelSettings.visible.length) ||
            (element1.value === 'Sales Count' && sales.dataLabelSettings.visible.length)) {
            datalabelElement.checked = true;
        }
        else {
            datalabelElement.checked = false;
        }
        var all = allElement;
        var negative = negativeElement;
        var first = firstElement;
        var last = lastElement;
        var high = highElement;
        var low = lowElement;
        var label = datalabelElement;
        var marker = markerElement;
        var rtl = rtlElement;
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        if (!marker.checked && !label.checked) {
            all.checked = false;
            negative.checked = false;
            first.checked = false;
            last.checked = false;
            high.checked = false;
            low.checked = false;
        }
        if (marker.checked) {
            var spark_1 = element1.value === 'Sales Percentage' ? percentage : sales;
            all.checked = spark_1.markerSettings.visible.indexOf('All') > -1;
            negative.checked = spark_1.markerSettings.visible.indexOf('Negative') > -1;
            first.checked = spark_1.markerSettings.visible.indexOf('Start') > -1;
            last.checked = spark_1.markerSettings.visible.indexOf('End') > -1;
            high.checked = spark_1.markerSettings.visible.indexOf('High') > -1;
            low.checked = spark_1.markerSettings.visible.indexOf('Low') > -1;
        }
        if (label.checked) {
            var spark_2 = element1.value === 'Sales Percentage' ? percentage : sales;
            all.checked = spark_2.dataLabelSettings.visible.indexOf('All') > -1;
            negative.checked = spark_2.dataLabelSettings.visible.indexOf('Negative') > -1;
            first.checked = spark_2.dataLabelSettings.visible.indexOf('Start') > -1;
            last.checked = spark_2.dataLabelSettings.visible.indexOf('End') > -1;
            high.checked = spark_2.dataLabelSettings.visible.indexOf('High') > -1;
            low.checked = spark_2.dataLabelSettings.visible.indexOf('Low') > -1;
        }
        datalabelChange();
        if ((element1.value === 'Sales Percentage' && percentage.tooltipSettings.visible === true) ||
            (element1.value === 'Sales Count' && sales.tooltipSettings.visible === true)) {
            tooltipElement.checked = true;
        }
        else {
            tooltipElement.checked = false;
        }
        tooltipChange();
        if ((element1.value === 'Sales Percentage' && percentage.tooltipSettings.trackLineSettings.visible === true) ||
            (element1.value === 'Sales Count' && sales.tooltipSettings.trackLineSettings.visible === true)) {
            tracklineElement.checked = true;
        }
        else {
            tracklineElement.checked = false;
        }
        tracklineChange();
        if ((element1.value === 'Sales Percentage' && percentage.axisSettings.lineSettings.visible === true) ||
            (element1.value === 'Sales Count' && sales.axisSettings.lineSettings.visible === true)) {
            axislineElement.checked = true;
        }
        else {
            axislineElement.checked = false;
        }
        axislineChange();
        rtlChange();
        if ((element1.value === 'Sales Percentage' && percentage.enableRtl === true) ||
            (element1.value === 'Sales Count' && sales.enableRtl === true)) {
            rtlElement.checked = true;
        }
        else {
            rtlElement.checked = false;
        }
        if (element1.value === 'Sales Percentage' && percentage.axisSettings.value !== 0) {
            axisElement.value = percentage.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 10;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + percentage.axisSettings.value;
        }
        if (element1.value === 'Sales Count' && sales.axisSettings.value !== 0) {
            axisElement.value = sales.axisSettings.value;
            axisElement.min = 0;
            axisElement.max = 5000000;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + sales.axisSettings.value;
        }
        axisChange();
        all.checked = !(negative.checked || high.checked || low.checked || first.checked || last.checked);
        negative.disabled = high.disabled = low.disabled = first.disabled = last.disabled = all.checked;
    }
    function allColorChange() {
        var negative = negativeElement;
        var first = firstElement;
        var last = lastElement;
        var high = highElement;
        var low = lowElement;
        if (allElement.checked == true) {
            negativeElement.disabled = true;
            firstElement.disabled = true;
            lastElement.disabled = true;
            highElement.disabled = true;
            lowElement.disabled = true;
        }
        else {
            negativeElement.disabled = false;
            firstElement.disabled = false;
            lastElement.disabled = false;
            highElement.disabled = false;
            lowElement.disabled = false;
        }
        var marker = markerElement;
        var label = datalabelElement;
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.markerSettings.visible = (true && marker.checked) ? ['All'] : (marker.checked) ? getVisible() : [];
        spark.dataLabelSettings.visible = (true && label.checked) ? ['All'] : (label.checked) ? getVisible() : [];
        spark.refresh();
    }
    function colorChange() {
        processMarkerLabel();
    }
    function processMarkerLabel() {
        var marker = markerElement;
        var label = datalabelElement;
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        if (marker.checked) {
            spark.markerSettings.visible = getVisible();
            spark.refresh();
        }
        if (label.checked) {
            spark.dataLabelSettings.visible = getVisible();
            spark.refresh();
        }
    }
    function getVisible() {
        var visible = [];
        if (allElement.checked)
            return ['All'];
        else {
            if (negativeElement.checked)
                visible.push("Negative");
            if (firstElement.checked)
                visible.push("Start");
            if (lastElement.checked)
                visible.push("End");
            if (firstElement.checked)
                visible.push("High");
            if (lowElement.checked)
                visible.push("Low");
        }
        return visible;
    }
    function markerChange() {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.markerSettings.visible = markerElement.checked ? getVisible() : [];
        spark.refresh();
    }
    function datalabelChange() {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.dataLabelSettings.visible = datalabelElement.checked ? getVisible() : [];
        spark.refresh();
    }
    function rtlChange() {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.enableRtl = rtlElement.checked ? true : false;
        spark.refresh();
    }
    function tooltipChange() {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.tooltipSettings.visible = tooltipElement.checked;
        spark.tooltipSettings.format = '${xval}: ${yval}';
        spark.refresh();
    }
    function tracklineChange() {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.tooltipSettings.trackLineSettings.visible = tracklineElement.checked;
        spark.tooltipSettings.trackLineSettings.color = 'red';
        spark.tooltipSettings.trackLineSettings.width = 1;
        spark.refresh();
    }
    function axislineChange() {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.axisSettings.lineSettings.visible = axislineElement.checked;
        spark.axisSettings.lineSettings.color = 'red';
        spark.axisSettings.lineSettings.width = 2;
        spark.refresh();
    }
    function axisChange() {
        var value = parseInt(axisElement.value.toString(), 10);
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? percentage : sales;
        spark.axisSettings.value = value;
        document.getElementById('axisval').innerHTML = "Axis Value <span>" + value;
        spark.refresh();
    }
    function load(args) {
        (0, theme_color_1.loadSparkLineTheme)(args);
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { id: "spark-container", className: "row" },
                React.createElement("div", { className: "cols-sample-area", style: { "margin": "auto", "textAlign": "center" } },
                    React.createElement("p", { style: { "fontSize": "18px" } }, " Worldwide car sales by brand - 2017"),
                    React.createElement("table", { style: { "width": "100%", "margin": "auto" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { "margin": "auto" } }, "Sales Percentage"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_charts_1.SparklineComponent, { load: load.bind(this), ref: function (m) { return percentage = m; }, id: 'spark1-container', height: '200px', width: '200px', lineWidth: 1, type: 'Column', valueType: 'Category', tooltipSettings: {
                                            format: '${xval} : ${yval}',
                                            trackLineSettings: {
                                                color: 'red',
                                                width: 1
                                            }
                                        }, markerSettings: {
                                            fill: 'red',
                                            size: 5
                                        }, axisSettings: {
                                            lineSettings: {
                                                color: 'red',
                                                width: 2
                                            }
                                        }, dataSource: [
                                            { x: 0, xval: 'AUDI', yval: 1 },
                                            { x: 1, xval: 'BMW', yval: 5 },
                                            { x: 2, xval: 'BUICK', yval: -1 },
                                            { x: 3, xval: 'CETROEN', yval: -6 },
                                            { x: 4, xval: 'CHEVROLET', yval: 0 },
                                            { x: 5, xval: 'FIAT', yval: 1 },
                                            { x: 6, xval: 'FORD', yval: -2 },
                                            { x: 7, xval: 'HONDA', yval: 7 },
                                            { x: 8, xval: 'HYUNDAI', yval: -9 },
                                            { x: 9, xval: 'JEEP', yval: 0 },
                                            { x: 10, xval: 'KIA', yval: -10 },
                                            { x: 11, xval: 'MAZDA', yval: 3 },
                                            { x: 12, xval: 'MERCEDES', yval: 13 },
                                            { x: 13, xval: 'NISSAN', yval: 5 },
                                            { x: 14, xval: 'OPEL/VHALL', yval: -6 },
                                            { x: 15, xval: 'PEUGEOT', yval: 0 },
                                            { x: 16, xval: 'RENAULT', yval: 7 },
                                            { x: 17, xval: 'SKODA', yval: 5 },
                                            { x: 18, xval: 'SUBARU', yval: 5 },
                                            { x: 19, xval: 'SUZUKI', yval: 11 },
                                            { x: 20, xval: 'TOYOTA', yval: 5 },
                                            { x: 21, xval: 'VOLKSWAGEN', yval: 3 },
                                        ], xName: 'xval', yName: 'yval' },
                                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { "margin": "auto" } }, "Sales Count"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_charts_1.SparklineComponent, { load: load.bind(this), ref: function (m) { return sales = m; }, id: 'spark2-container', height: '200px', width: '200px', lineWidth: 1, type: 'Column', valueType: 'Category', tooltipSettings: {
                                            format: '${xval} : ${yval}',
                                            trackLineSettings: {
                                                color: 'red',
                                                width: 1
                                            }
                                        }, markerSettings: {
                                            fill: 'red',
                                            size: 5
                                        }, axisSettings: {
                                            lineSettings: {
                                                color: 'red',
                                                width: 2
                                            }
                                        }, dataSource: [
                                            { x: 0, xval: 'AUDI', yval: 1847613 },
                                            { x: 1, xval: 'BMW', yval: 2030331 },
                                            { x: 2, xval: 'BUICK', yval: 1465823 },
                                            { x: 3, xval: 'CETROEN', yval: 999888 },
                                            { x: 4, xval: 'CHEVROLET', yval: 3857388 },
                                            { x: 5, xval: 'FIAT', yval: 1503806 },
                                            { x: 6, xval: 'FORD', yval: 5953122 },
                                            { x: 7, xval: 'HONDA', yval: 4967689 },
                                            { x: 8, xval: 'HYUNDAI', yval: 3951176 },
                                            { x: 9, xval: 'JEEP', yval: 1390130 },
                                            { x: 10, xval: 'KIA', yval: 2511293 },
                                            { x: 11, xval: 'MAZDA', yval: 1495557 },
                                            { x: 12, xval: 'MERCEDES', yval: 2834181 },
                                            { x: 13, xval: 'NISSAN', yval: 4834694 },
                                            { x: 14, xval: 'OPEL/VHALL', yval: 996559 },
                                            { x: 15, xval: 'PEUGEOT', yval: 1590300 },
                                            { x: 16, xval: 'RENAULT', yval: 2275227 },
                                            { x: 17, xval: 'SKODA', yval: 1180672 },
                                            { x: 18, xval: 'SUBARU', yval: 1050390 },
                                            { x: 19, xval: 'SUZUKI', yval: 2891415 },
                                            { x: 20, xval: 'TOYOTA', yval: 7843423 },
                                            { x: 21, xval: 'VOLKSWAGEN', yval: 6639250 },
                                        ], xName: 'xval', yName: 'yval' },
                                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] })))))))),
            React.createElement("div", { style: { "float": "right", "marginRight": "10px" } },
                "Source: ",
                React.createElement("a", { href: " http://carsalesbase.com/global-car-sales-2017", target: "_blank", "aria-label": "Navigate to the documentation for car sales base" }, "carsalesbase.com"))),
        React.createElement("div", { className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", null,
                                React.createElement("div", null, " Sparkline ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "spark", width: "100%", index: 0, change: sparklineChange.bind(this), ref: function (d) { return sparklineElement = d; }, dataSource: droplist, fields: { text: 'value', value: 'value' } })))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " Special Points ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("table", null,
                                    React.createElement("tbody", null,
                                        React.createElement("tr", null,
                                            React.createElement("td", { style: { "padding": "5px" } }, "All"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: allColorChange.bind(this), ref: function (d) { return allElement = d; }, id: 'all', checked: true })),
                                            React.createElement("td", { style: { "padding": "5px" } }, "Negative"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: colorChange.bind(this), ref: function (d) { return negativeElement = d; }, id: 'negative', disabled: true }))),
                                        React.createElement("tr", null,
                                            React.createElement("td", { style: { "padding": "5px" } }, "First"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: colorChange.bind(this), ref: function (d) { return firstElement = d; }, id: 'first', disabled: true })),
                                            React.createElement("td", { style: { "padding": "5px" } }, "Last"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: colorChange.bind(this), ref: function (d) { return lastElement = d; }, id: 'last', disabled: true }))),
                                        React.createElement("tr", null,
                                            React.createElement("td", { style: { "padding": "5px" } }, "High"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: colorChange.bind(this), ref: function (d) { return highElement = d; }, id: 'high', disabled: true })),
                                            React.createElement("td", { style: { "padding": "5px" } }, "Low"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: colorChange.bind(this), ref: function (d) { return lowElement = d; }, id: 'low', disabled: true }))))))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " Marker ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: markerChange.bind(this), ref: function (d) { return markerElement = d; }, id: 'marker', disabled: false })))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " Data Label ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: datalabelChange.bind(this), ref: function (d) { return datalabelElement = d; }, id: 'datalabel', disabled: false })))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " EnableRTL ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: rtlChange.bind(this), ref: function (d) { return rtlElement = d; }, id: 'rtl', disabled: false })))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " Tooltip ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: tooltipChange.bind(this), ref: function (d) { return tooltipElement = d; }, id: 'tooltip', disabled: false })))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " Track Line ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: tracklineChange.bind(this), ref: function (d) { return tracklineElement = d; }, id: 'trackline', disabled: false })))),
                        React.createElement("tr", { style: { "height": "30px" } },
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null, " Axis Line ")),
                            React.createElement("td", { style: { "width": "50%" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: axislineChange.bind(this), ref: function (d) { return axislineElement = d; }, id: 'axis1', disabled: false })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { id: 'axisval' },
                                    "Axis Value ",
                                    React.createElement("span", null, "\u00A0\u00A0\u00A00"),
                                    " ")),
                            React.createElement("td", null,
                                React.createElement("div", { className: "content-wrapper" },
                                    React.createElement("style", null,
                                        " ",
                                        slidercss,
                                        " "),
                                    React.createElement(ej2_react_inputs_1.SliderComponent, { change: axisChange.bind(this), ref: function (slider) { return axisElement = slider; }, type: 'MinRange', step: 1, id: "axis", value: 0, min: 0, max: 10, style: { width: '100px' }, disabled: false })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample depicts the various customization options available in sparklines.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices."))));
}
exports.default = Customization;
