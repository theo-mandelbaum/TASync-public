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
exports.SampleData = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .imageStyle {\n        width: 16px;\n        height: 16px;\n        margin-top: 4px;\n    }\n        \n    .fontDes {\n        float: right;\n        padding-left: 5px;\n        font-size:20px;\n        font-family:inherit\";\n    }\n    .fontDes1 {\n        color:#9E9E9E;\n        font-size:16px;\n        font-family: inherit\";\n    }\n    ";
var SampleData = /** @class */ (function (_super) {
    __extends(SampleData, _super);
    function SampleData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.orderData = [
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
        return _this;
    }
    SampleData.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    SampleData.prototype.onChartLoad = function (args) {
        var _this = this;
        this.dataIntervalOne = setInterval(function () {
            var randomValue = Math.random();
            var value1 = Math.round((randomValue * 35) + 55);
            var value2 = Math.round((randomValue * 15) + 60);
            var value3 = Math.round((randomValue * 30) + 10);
            var gridData1 = 4 * value1;
            var gridData2 = 6 * value2;
            var gridData3 = -7 * value3;
            var newVal = Math.random() * (90 - 20) + 20;
            if (document.getElementById('sample1-container')) {
                _this.sampleGaugeOne.axes[0].pointers[0].animation.enable = true;
                _this.sampleGaugeTwo.axes[0].pointers[0].animation.enable = true;
                _this.sampleGaugeThree.axes[0].pointers[0].animation.enable = true;
                _this.sampleGaugeOne.setPointerValue(0, 0, value1);
                _this.sampleGaugeTwo.setPointerValue(0, 0, value2);
                _this.sampleGaugeThree.setPointerValue(0, 0, -value3);
                _this.sampleGaugeOne.setAnnotationValue(0, 0, _this.sampleGaugeOne.axes[0].annotations[0].content);
                _this.sampleGaugeTwo.setAnnotationValue(0, 0, _this.sampleGaugeTwo.axes[0].annotations[0].content);
                _this.sampleGaugeThree.setAnnotationValue(0, 0, _this.sampleGaugeThree.axes[0].annotations[0].content);
                _this.orderData = [
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
                clearInterval(+_this.dataIntervalOne);
            }
        }, 2000);
    };
    ;
    SampleData.prototype.onGridLoad = function (args) {
        var _this = this;
        this.dataIntervalTwo = setInterval(function () {
            if (document.getElementById('sample1-container')) {
                _this.dataGrid.dataSource = _this.orderData;
                _this.dataGrid.refresh();
            }
            else {
                clearInterval(+_this.dataIntervalTwo);
            }
        }, 2000);
    };
    SampleData.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-12" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-sm-4" },
                                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, background: 'transparent', ref: function (gauge) { return _this.sampleGaugeOne = gauge; }, id: 'sample1-container' },
                                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: -100, maximum: 100, lineStyle: {
                                                    width: 0,
                                                    color: 'transparent'
                                                }, majorTicks: {
                                                    width: 0,
                                                    height: 0
                                                }, minorTicks: {
                                                    width: 0,
                                                    height: 0
                                                }, labelStyle: {
                                                    format: 'positive {value}',
                                                    position: 'Outside',
                                                    font: { size: '0', color: 'transparent' }
                                                } },
                                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Positive arrow', content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for Germany"/><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Germany', content: '<div class="fontDes1">Germany</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -100, end: 0, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 75, radius: '60%', color: '#777777', animation: { enable: false, duration: 900 }, pointerWidth: 5, cap: {
                                                            radius: 6, color: '#777777',
                                                            border: { width: 0 }
                                                        }, needleTail: {
                                                            length: '25%', color: '#777777'
                                                        } })))))),
                                React.createElement("div", { className: "col-sm-4" },
                                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, background: 'transparent', ref: function (gauge) { return _this.sampleGaugeTwo = gauge; }, id: 'sample2-container' },
                                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: -100, maximum: 100, lineStyle: {
                                                    width: 0,
                                                    color: 'transparent'
                                                }, majorTicks: {
                                                    width: 0,
                                                    height: 0
                                                }, minorTicks: {
                                                    width: 0,
                                                    height: 0
                                                }, labelStyle: {
                                                    format: 'positive {value} ',
                                                    position: 'Outside',
                                                    font: { size: '0', color: 'transprent' }
                                                } },
                                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: ' Positive arrow ', content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for USA" /><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'USA', content: '<div class="fontDes1">USA</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -100, end: 0, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 60, radius: '60%', color: '#777777', animation: { enable: false, duration: 900 }, pointerWidth: 5, cap: {
                                                            radius: 6, color: '#777777',
                                                            border: { width: 0 }
                                                        }, needleTail: {
                                                            length: '25%', color: '#777777'
                                                        } })))))),
                                React.createElement("div", { className: "col-sm-4" },
                                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, background: 'transparent', ref: function (gauge) { return _this.sampleGaugeThree = gauge; }, loaded: this.onChartLoad.bind(this), id: 'sample3-container' },
                                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: -100, maximum: 100, lineStyle: {
                                                    width: 0,
                                                    color: 'transparent'
                                                }, majorTicks: {
                                                    width: 0,
                                                    height: 0
                                                }, minorTicks: {
                                                    width: 0,
                                                    height: 0
                                                }, labelStyle: {
                                                    format: 'negative {value}',
                                                    position: 'Outside',
                                                    font: { size: '0', color: 'transparent' }
                                                } },
                                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Negative arrow', content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/negative.png" alt="Negative value for UK" /><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'UK', content: '<div class="fontDes1">UK</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -100, end: 0, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 25, radius: '60%', color: '#777777', animation: { enable: false, duration: 900 }, pointerWidth: 5, cap: {
                                                            radius: 6, color: '#777777',
                                                            border: { width: 0 }
                                                        }, needleTail: {
                                                            length: '25%', color: '#777777'
                                                        } }))))))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-12" },
                            React.createElement("div", { className: "row" },
                                React.createElement(ej2_react_grids_1.GridComponent, { dataBound: this.onGridLoad.bind(this), ref: function (grid) { return _this.dataGrid = grid; }, dataSource: this.orderData.slice(0, 30) },
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
    return SampleData;
}(sample_base_1.SampleBase));
exports.SampleData = SampleData;
