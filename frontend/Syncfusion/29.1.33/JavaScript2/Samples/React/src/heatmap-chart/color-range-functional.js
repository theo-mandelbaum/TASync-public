"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./color-range-sample-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }";
// custom code end
var ColorRange = function () {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Gradient'), paletteType = _a[0], setPaletteType = _a[1];
    var heatmap = (0, react_1.useRef)(null);
    var title = {
        text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
        textStyle: {
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit',
            size: '15px',
        }
    };
    var xAxis = {
        labels: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        labelIntersectAction: 'None',
        labelRotation: 45,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var yAxis = {
        labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior', 'Justice', 'NASA', 'Transportation'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var paletteSettings = {
        palette: [
            { startValue: 5, endValue: 15, minColor: '#FFFFDA', maxColor: '#EDF8B6' },
            { startValue: 15, endValue: 20, minColor: '#CAE8B4', maxColor: '#78D1BD' },
            { startValue: 20, endValue: 31.7, minColor: '#36BCC6', maxColor: '#208FC6' },
        ],
        type: paletteType
    };
    var cellSettings = {
        border: { width: 0 },
        showLabel: false
    };
    var fixed = function () {
        setPaletteType('Fixed');
        heatmap.current.dataBind();
    };
    var gradient = function () {
        setPaletteType('Gradient');
        heatmap.current.dataBind();
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
        if (args.heatmap.element.offsetWidth < 500) {
            args.heatmap.xAxis.labelRotation = 0;
            args.heatmap.xAxis.labelIntersectAction = 'Trim';
        }
        else {
            args.heatmap.xAxis.labelRotation = 45;
            args.heatmap.xAxis.labelIntersectAction = 'None';
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: heatmap, titleSettings: title, legendSettings: { textStyle: { fontFamily: 'inherit' } }, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, xAxis: xAxis, yAxis: yAxis, dataSource: data.colorRangeSample, paletteSettings: paletteSettings, cellSettings: cellSettings, load: load.bind(_this) },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Palette Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'fixed', label: 'Fixed', name: 'paletteType', value: "Fixed", change: fixed })),
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'gradient', checked: true, label: 'Gradient', name: 'paletteType', value: "Gradient", change: gradient }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample visualizes the energy consumption in trillion British thermal units (btu) by the various public sectors in US government over the years. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to change palette type in Heatmap by means of radio button.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "This example explains how to provide a specific color for specific range in heatmap. The ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#startvalue", target: "_blank" }, " startValue "),
                " and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#endvalue", target: "_blank" }, " endValue "),
                " properties are used to define the range start and end values. The ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#mincolor", target: "_blank" }, " minColor "),
                " and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#maxcolor", target: "_blank" }, " maxColor "),
                " properties represent the colors of given range."),
            React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend" }, "Legend"),
                " module using the ",
                React.createElement("code", null, '<Inject services={[Tooltip, Legend]} />'),
                " method."))));
};
exports.default = ColorRange;
