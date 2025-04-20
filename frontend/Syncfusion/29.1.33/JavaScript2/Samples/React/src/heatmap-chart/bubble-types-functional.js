"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./table-bubble-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }";
// custom code end
var BubbleTypes = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var heatmap = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'Size' },
        { value: 'Color' },
        { value: 'Sector' }
    ];
    var title = {
        text: 'Female Participation Rate in Labor Force for the Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    var xAxis = {
        labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: { fontFamily: 'inherit' }
    };
    var cellSettings = {
        border: {
            width: 1
        },
        showLabel: false,
        tileType: 'Bubble',
        bubbleType: 'Size'
    };
    var paletteSettings = {
        palette: [
            { value: 35, color: '#50A3B1' },
            { value: 45, color: '#78D1BD' },
            { value: 55, color: '#CAE8B4' },
            { value: 65, color: '#EDF8B6' },
            { value: 78, color: '#FFFFDA' }
        ]
    };
    var change = function (e) {
        var type = document.getElementById('LegendPosition');
        heatmap.current.cellSettings.bubbleType = type.value;
        heatmap.current.refresh();
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var legendTooltip = function (args) {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + ' %'];
    };
    return (React.createElement("main", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: heatmap, titleSettings: title, xAxis: xAxis, yAxis: { labels: ['1995', '2000', '2005', '2010', '2015'], textStyle: { fontFamily: 'inherit' } }, dataSource: data.tableBubbleData, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, cellSettings: cellSettings, tooltipRender: legendTooltip, paletteSettings: paletteSettings, load: load.bind(_this), legendSettings: { visible: true, textStyle: { fontFamily: 'inherit' } } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://data.worldbank.org", target: '_blank' }, "https://data.worldbank.org/"))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', role: "none", className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null, "Bubble Type:")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "LegendPosition", change: change.bind(_this), dataSource: droplist, fields: { text: 'value', value: 'value' }, text: "Size", value: "Size" }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample visualizes the female participation rate of the total female population in the country\u2019s work force. In Bubble Heatmap, the data points can be visualized using bubble size, bubble shade and sector view types. In property panel, the options are available to change the view of the data points in the bubble Heatmap by means of dropdown.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to display the data points in bubble heatmap using multiple views such as bubble size, bubble shade and the sector. You can change the cell type to bubble by using the ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#tiletype" }, "tileType"),
                " property in ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/" }, "cellSettings"),
                " , and you can change the view of the bubble heatmap by using the ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#bubbletype" }, "bubbleType"),
                " property in ",
                React.createElement("code", null, "cellSettings"),
                "."),
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
exports.default = BubbleTypes;
