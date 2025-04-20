"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .imageStyle {\n        width: 16px;\n        height: 16px;\n        margin-top: 4px;\n    }\n        \n    .fontDes {\n        float: right;\n        padding-left: 5px;\n        font-size:20px;\n        font-family:inherit\";\n    }\n    .fontDes1 {\n        color:#9E9E9E;\n        font-size:16px;\n        font-family: inherit\";\n    }";
var SampleData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataGrid = (0, react_1.useRef)(null);
    var sampleGaugeOne = (0, react_1.useRef)(null);
    var sampleGaugeTwo = (0, react_1.useRef)(null);
    var sampleGaugeThree = (0, react_1.useRef)(null);
    var dataIntervalOne;
    var dataIntervalTwo;
    var orderData = [
        {
            'Country': 'Germany',
            'Sales': 500,
            'Target': 400,
            'vsTarget': 300
        }, {
            'Country': 'USA',
            'Sales': 1000,
            'Target': 600,
            'vsTarget': 360
        }, {
            'Country': 'UK',
            'Sales': 600,
            'Target': 700,
            'vsTarget': -100
        }
    ];
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var onChartLoad = function (args) {
        dataIntervalOne = setInterval(function () {
            var randomValue = Math.random();
            var value1 = Math.round((randomValue * 35) + 55);
            var value2 = Math.round((randomValue * 15) + 60);
            var value3 = Math.round((randomValue * 30) + 10);
            var gridData1 = 4 * value1;
            var gridData2 = 6 * value2;
            var gridData3 = -7 * value3;
            var newVal = Math.random() * (90 - 20) + 20;
            if (document.getElementById('sample1-container') && !(0, ej2_base_1.isNullOrUndefined)(sampleGaugeOne) && !(0, ej2_base_1.isNullOrUndefined)(sampleGaugeOne.current)) {
                sampleGaugeOne.current.axes[0].pointers[0].animation.enable = true;
                sampleGaugeTwo.current.axes[0].pointers[0].animation.enable = true;
                sampleGaugeThree.current.axes[0].pointers[0].animation.enable = true;
                sampleGaugeOne.current.setPointerValue(0, 0, value1);
                sampleGaugeTwo.current.setPointerValue(0, 0, value2);
                sampleGaugeThree.current.setPointerValue(0, 0, -value3);
                sampleGaugeOne.current.setAnnotationValue(0, 0, sampleGaugeOne.current.axes[0].annotations[0].content);
                sampleGaugeTwo.current.setAnnotationValue(0, 0, sampleGaugeTwo.current.axes[0].annotations[0].content);
                sampleGaugeThree.current.setAnnotationValue(0, 0, sampleGaugeThree.current.axes[0].annotations[0].content);
                orderData = [
                    {
                        'Country': 'Germany',
                        'Sales': 500,
                        'Target': 400,
                        'vsTarget': gridData1
                    }, {
                        'Country': 'USA',
                        'Sales': 1000,
                        'Target': 600,
                        'vsTarget': gridData2
                    }, {
                        'Country': 'UK',
                        'Sales': 600,
                        'Target': 700,
                        'vsTarget': gridData3
                    }
                ];
            }
            else {
                clearInterval(+dataIntervalOne);
            }
        }, 2000);
    };
    var onGridLoad = function (args) {
        dataIntervalTwo = setInterval(function () {
            if (document.getElementById('sample1-container') && !(0, ej2_base_1.isNullOrUndefined)(dataGrid) && !(0, ej2_base_1.isNullOrUndefined)(dataGrid.current)) {
                dataGrid.current.dataSource = orderData;
                dataGrid.current.refresh();
            }
            else {
                clearInterval(+dataIntervalTwo);
            }
        }, 2000);
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-12" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, background: 'transparent', ref: sampleGaugeOne, id: 'sample1-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: -100, maximum: 100, lineStyle: { width: 0, color: 'transparent' }, majorTicks: { width: 0, height: 0 }, minorTicks: { width: 0, height: 0 }, labelStyle: { format: 'positive {value}', position: 'Outside', font: { size: '0', color: 'transparent' } } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Positive arrow', content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for Germany"/><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Germany', content: '<div class="fontDes1">Germany</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -100, end: 0, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 75, radius: '60%', color: '#777777', animation: { enable: false, duration: 900 }, pointerWidth: 5, cap: { radius: 6, color: '#777777', border: { width: 0 } }, needleTail: { length: '25%', color: '#777777' } })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, background: 'transparent', ref: sampleGaugeTwo, id: 'sample2-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: -100, maximum: 100, lineStyle: { width: 0, color: 'transparent' }, majorTicks: { width: 0, height: 0 }, minorTicks: { width: 0, height: 0 }, labelStyle: { format: 'positive {value} ', position: 'Outside', font: { size: '0', color: 'transprent' } } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: ' Positive arrow ', content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for USA" /><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'USA', content: '<div class="fontDes1">USA</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -100, end: 0, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 60, radius: '60%', color: '#777777', animation: { enable: false, duration: 900 }, pointerWidth: 5, cap: { radius: 6, color: '#777777', border: { width: 0 } }, needleTail: { length: '25%', color: '#777777' } })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, background: 'transparent', ref: sampleGaugeThree, loaded: onChartLoad.bind(_this), id: 'sample3-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: -100, maximum: 100, lineStyle: { width: 0, color: 'transparent' }, majorTicks: { width: 0, height: 0 }, minorTicks: { width: 0, height: 0 }, labelStyle: { format: 'negative {value}', position: 'Outside', font: { size: '0', color: 'transparent' } } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Negative arrow', content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/negative.png" alt="Negative value for UK" /><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'UK', content: '<div class="fontDes1">UK</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -100, end: 0, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 25, radius: '60%', color: '#777777', animation: { enable: false, duration: 900 }, pointerWidth: 5, cap: { radius: 6, color: '#777777', border: { width: 0 } }, needleTail: { length: '25%', color: '#777777' } }))))))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-12" },
                        React.createElement("div", { className: "row" },
                            React.createElement(ej2_react_grids_1.GridComponent, { dataBound: onGridLoad.bind(_this), ref: dataGrid, dataSource: orderData.slice(0, 30) },
                                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '80' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Sales', headerText: 'Sales $', width: '80' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Target', headerText: 'Target $', width: '80' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'vsTarget', headerText: 'vs Target', width: '80' })))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample shows live stock price data displayed in multiple circular gauges.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "The pointer value in the circular gauge can be dynamically updated using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#setpointervalue" }, "setPointerValue"),
                " method. In this example, the stock price changes across countries are displayed in multiple circular gauges."),
            React.createElement("p", null,
                "More information on the circular gauge can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = SampleData;
