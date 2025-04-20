"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Liveupdate sample for sparkline
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     .spark {\n         float: left;\n         width: 95%;\n         margin-left: 3%;\n     }\n     .index {\n         z-index: 1000;\n     }";
function LiveUpdate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var sparkInstance;
    var sparkInstance1;
    var sparkInstance2;
    var sparkInstance3;
    var temp1;
    var temp3;
    var temp2;
    var temp4;
    var timer1;
    var timer2;
    var timer3;
    var timer4;
    function load(args) {
        (0, theme_color_1.loadSparkLineTheme)(args);
    }
    function updateSparkline1(args) {
        setTimeout(function () {
            if (sparkInstance == null)
                sparkInstance = args.sparkline;
            if (temp1 == null)
                temp1 = sparkInstance.dataSource.length - 1;
            if (timer1 != null)
                clearInterval(timer1);
            timer1 = setInterval(function () { return update(); }, 500);
        }, 500);
    }
    function updateSparkline2(args) {
        setTimeout(function () {
            if (sparkInstance1 == null)
                sparkInstance1 = args.sparkline;
            if (temp3 == null)
                temp3 = sparkInstance1.dataSource.length - 1;
            if (timer2 != null)
                clearInterval(timer2);
            timer2 = setInterval(function () { return update2(); }, 500);
        }, 500);
    }
    function updateSparkline3(args) {
        setTimeout(function () {
            if (sparkInstance2 == null)
                sparkInstance2 = args.sparkline;
            if (temp2 == null)
                temp2 = sparkInstance2.dataSource.length - 1;
            if (timer3 != null)
                clearInterval(timer3);
            timer3 = setInterval(function () { return update1(); }, 500);
        }, 500);
    }
    function updateSparkline4(args) {
        setTimeout(function () {
            if (sparkInstance3 == null)
                sparkInstance3 = args.sparkline;
            if (temp4 == null)
                temp4 = sparkInstance3.dataSource.length - 1;
            if (timer4 != null)
                clearInterval(timer4);
            timer4 = setInterval(function () { return update4(); }, 500);
        }, 500);
    }
    function update() {
        if (sparkInstance && sparkInstance.element.className.indexOf('e-sparkline') > -1) {
            var value = ((Math.random() * 100) + 5) % 50;
            sparkInstance.dataSource.push({ x: ++temp1, yval: value });
            sparkInstance.dataSource.shift();
            sparkInstance.refresh();
            var cpu = document.getElementById('cpu');
            cpu.innerHTML = ((value / 150) * 100).toFixed(0) + '% ' + ((value * 3) / 100).toFixed(2) + 'GHz';
        }
    }
    function update2() {
        if (sparkInstance1 && sparkInstance1.element.className.indexOf('e-sparkline') > -1) {
            var value = ((Math.random() * 100) + 5) % 80;
            sparkInstance1.dataSource.push({ x: ++temp3, yval: value });
            sparkInstance1.dataSource.shift();
            sparkInstance1.refresh();
            var disk = document.getElementById('disk');
            disk.innerHTML = value.toFixed(0) + '%';
        }
    }
    function update1() {
        if (sparkInstance2 && sparkInstance2.element.className.indexOf('e-sparkline') > -1) {
            var value = Math.random();
            if (value > 0.6) {
                value = 6 + (value / 10);
            }
            else {
                value = 6 - (value / 10);
            }
            sparkInstance2.dataSource.push({ x: ++temp2, yval: value });
            sparkInstance2.dataSource.shift();
            sparkInstance2.refresh();
            var memory = document.getElementById('memory');
            var gb = parseFloat(value.toString().replace('0', '')).toFixed(1);
            memory.innerHTML = gb + '/15.8 GB (' + ((value / 15.8) * 100).toFixed(0) + '%)';
        }
    }
    function update4() {
        if (sparkInstance3 && sparkInstance3.element.className.indexOf('e-sparkline') > -1) {
            var value = ((Math.random() * 100) + 5) % 80;
            sparkInstance3.dataSource.push({ x: ++temp3, yval: value });
            sparkInstance3.dataSource.shift();
            sparkInstance3.refresh();
            var net = document.getElementById('net');
            net.innerHTML = 'R: ' + value.toFixed(0) + 'Kbps';
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'spark-container', className: "row" },
                React.createElement("div", { className: "cols-sample-area", style: { "marginTop": "8%" } },
                    React.createElement("div", { className: "col-lg-3 col-m-3 col-sm-6" },
                        React.createElement("div", { className: "spark", id: "spark-container1" },
                            React.createElement("div", { className: "index", style: { "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" } },
                                React.createElement("b", null, "CPU")),
                            React.createElement("div", { id: "cpu", className: "index", style: { "color": "#0877d6", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" } }, "26% 1.2GHz"),
                            React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: updateSparkline1.bind(this), load: load.bind(this), ref: function (m) { return sparkInstance = m; }, id: 'spark1-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#e8f2fc', axisSettings: {
                                    minY: 0,
                                    maxY: 150
                                }, containerArea: {
                                    background: 'white',
                                    border: {
                                        color: '#dcdfe0',
                                        width: 2
                                    }
                                }, border: {
                                    color: '#0358a0',
                                    width: 1
                                }, dataSource: [
                                    { x: 0, yval: 50 },
                                    { x: 1, yval: 30 },
                                    { x: 2, yval: 20 },
                                    { x: 3, yval: 30 },
                                    { x: 4, yval: 50 },
                                    { x: 5, yval: 40 },
                                    { x: 6, yval: 20 },
                                    { x: 7, yval: 10 },
                                    { x: 8, yval: 30 },
                                    { x: 9, yval: 10 },
                                    { x: 10, yval: 40 },
                                    { x: 11, yval: 50 },
                                    { x: 12, yval: 10 },
                                    { x: 13, yval: 30 },
                                    { x: 14, yval: 50 },
                                    { x: 15, yval: 20 },
                                    { x: 16, yval: 10 },
                                    { x: 17, yval: 40 },
                                    { x: 18, yval: 30 },
                                    { x: 19, yval: 40 }
                                ], xName: 'x', yName: 'yval' }))),
                    React.createElement("div", { className: "col-lg-3 col-m-3 col-sm-6" },
                        React.createElement("div", { className: "spark", id: "spark-container2" },
                            React.createElement("div", { className: 'index', style: { "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" } },
                                React.createElement("b", null, "Disk")),
                            React.createElement("div", { id: "disk", className: "index", style: { "color": "#b247c6", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" } }, "50%"),
                            React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: updateSparkline2.bind(this), load: load.bind(this), ref: function (m) { return sparkInstance2 = m; }, id: 'spark2-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#f5e8fc', axisSettings: {
                                    minY: 4,
                                    maxY: 8
                                }, containerArea: {
                                    background: 'white',
                                    border: {
                                        color: '#dcdfe0',
                                        width: 2
                                    }
                                }, border: {
                                    color: '#b247c6',
                                    width: 1
                                }, dataSource: [
                                    { x: 0, yval: 6.05 },
                                    { x: 1, yval: 6.03 },
                                    { x: 2, yval: 6.02 },
                                    { x: 3, yval: 6.07 },
                                    { x: 4, yval: 6.05 },
                                    { x: 5, yval: 6.09 },
                                    { x: 6, yval: 6.08 },
                                    { x: 7, yval: 6.01 },
                                    { x: 8, yval: 6.03 },
                                    { x: 9, yval: 6.01 },
                                    { x: 10, yval: 6.07 },
                                    { x: 11, yval: 6.05 },
                                    { x: 12, yval: 6.01 },
                                    { x: 13, yval: 6.06 },
                                    { x: 14, yval: 6.05 },
                                    { x: 15, yval: 6.03 },
                                    { x: 16, yval: 6.01 },
                                    { x: 17, yval: 6.09 },
                                    { x: 18, yval: 6.06 },
                                    { x: 19, yval: 6.05 }
                                ], xName: 'x', yName: 'yval' }))),
                    React.createElement("div", { className: "col-lg-3 col-m-3 col-sm-6" },
                        React.createElement("div", { className: "spark", id: "spark-container3" },
                            React.createElement("div", { className: "index", style: { "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" } },
                                React.createElement("b", null, "Memory")),
                            React.createElement("div", { id: "memory", className: "index", style: { "color": "#5bcc8f", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" } }, "6.5/15.8 GB (41%)"),
                            React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: updateSparkline3.bind(this), load: load.bind(this), ref: function (m) { return sparkInstance1 = m; }, id: 'spark3-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#e0f9d1', axisSettings: {
                                    minY: 0,
                                    maxY: 130
                                }, containerArea: {
                                    background: 'white',
                                    border: {
                                        color: '#dcdfe0',
                                        width: 2
                                    }
                                }, border: {
                                    color: '#27ad66',
                                    width: 1
                                }, dataSource: [
                                    { x: 0, yval: 50 },
                                    { x: 1, yval: 30 },
                                    { x: 2, yval: 20 },
                                    { x: 3, yval: 70 },
                                    { x: 4, yval: 50 },
                                    { x: 5, yval: 20 },
                                    { x: 6, yval: 80 },
                                    { x: 7, yval: 10 },
                                    { x: 8, yval: 30 },
                                    { x: 9, yval: 10 },
                                    { x: 10, yval: 70 },
                                    { x: 11, yval: 50 },
                                    { x: 12, yval: 10 },
                                    { x: 13, yval: 60 },
                                    { x: 14, yval: 50 },
                                    { x: 15, yval: 30 },
                                    { x: 16, yval: 10 },
                                    { x: 17, yval: 20 },
                                    { x: 18, yval: 60 },
                                    { x: 19, yval: 50 }
                                ], xName: 'x', yName: 'yval' }))),
                    React.createElement("div", { className: "col-lg-3 col-m-3 col-sm-6" },
                        React.createElement("div", { className: "spark", id: "spark-container4" },
                            React.createElement("div", { className: "index", style: { "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" } },
                                React.createElement("b", null, "Ethernet")),
                            React.createElement("div", { id: "net", className: "index", style: { "color": "#d1a990", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" } }, "6.5/15.8 GB (41%)"),
                            React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: updateSparkline4.bind(this), load: load.bind(this), ref: function (m) { return sparkInstance3 = m; }, id: 'spark4-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#F2D8C7', axisSettings: {
                                    minY: 0,
                                    maxY: 120
                                }, containerArea: {
                                    background: 'white',
                                    border: {
                                        color: '#dcdfe0',
                                        width: 2
                                    }
                                }, border: {
                                    color: '#AA907A',
                                    width: 1
                                }, dataSource: [
                                    { x: 0, yval: 50 },
                                    { x: 1, yval: 30 },
                                    { x: 2, yval: 20 },
                                    { x: 3, yval: 70 },
                                    { x: 4, yval: 50 },
                                    { x: 5, yval: 20 },
                                    { x: 6, yval: 80 },
                                    { x: 7, yval: 10 },
                                    { x: 8, yval: 30 },
                                    { x: 9, yval: 10 },
                                    { x: 10, yval: 70 },
                                    { x: 11, yval: 50 },
                                    { x: 12, yval: 10 },
                                    { x: 13, yval: 60 },
                                    { x: 14, yval: 50 },
                                    { x: 15, yval: 30 },
                                    { x: 16, yval: 10 },
                                    { x: 17, yval: 20 },
                                    { x: 18, yval: 60 },
                                    { x: 19, yval: 50 }
                                ], xName: 'x', yName: 'yval' })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample depicts the various customization options available in sparklines.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices."))));
}
exports.default = LiveUpdate;
