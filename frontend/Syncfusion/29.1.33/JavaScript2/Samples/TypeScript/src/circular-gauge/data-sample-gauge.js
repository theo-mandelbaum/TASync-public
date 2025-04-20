define(["require", "exports", "@syncfusion/ej2-circulargauge", "@syncfusion/ej2-circulargauge"], function (require, exports, ej2_circulargauge_1, ej2_circulargauge_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gauge3 = exports.gauge2 = exports.gauge1 = void 0;
    ej2_circulargauge_1.CircularGauge.Inject(ej2_circulargauge_2.Annotations);
    function gauge1() {
        var gauge1 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            axes: [{
                    annotations: [{
                            description: 'Positive arrow',
                            content: '#germany',
                            angle: 180, zIndex: '1',
                            radius: '30%'
                        }, {
                            description: 'Germany',
                            content: '<div style="color:#9E9E9E;font-size:16px;font-family:inherit">Germany</div>',
                            angle: 180, zIndex: '1',
                            radius: '65%'
                        }],
                    startAngle: 230,
                    endAngle: 130,
                    majorTicks: { width: 0 },
                    lineStyle: { width: 0 },
                    minorTicks: { width: 0 },
                    labelStyle: { format: 'positive {value}', font: { size: '0' } },
                    ranges: [{
                            start: 0, end: 50,
                            startWidth: 15, endWidth: 15,
                            color: '#EC121C'
                        }, {
                            start: 50, end: 100,
                            startWidth: 15, endWidth: 15,
                            color: '#45EA0C'
                        }],
                    pointers: [{
                            value: 75, radius: '60%',
                            animation: { enable: false },
                            color: '#777777', pointerWidth: 5,
                            cap: {
                                radius: 6,
                                border: { width: 0 },
                                color: '#777777'
                            },
                            needleTail: {
                                length: '25%',
                                color: '#777777'
                            }
                        }]
                }],
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            }
        });
        return gauge1;
    }
    exports.gauge1 = gauge1;
    function gauge2() {
        var gauge2 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            axes: [{
                    annotations: [{
                            description: ' Positive arrow ',
                            content: '#usa',
                            angle: 180, zIndex: '1',
                            radius: '30%'
                        }, {
                            description: 'USA',
                            content: '<div style="color:#9E9E9E;font-size:16px;font-family:inherit">USA</div>',
                            angle: 180, zIndex: '1',
                            radius: '65%'
                        }],
                    startAngle: 230,
                    endAngle: 130,
                    majorTicks: { width: 0 },
                    lineStyle: { width: 0 },
                    minorTicks: { width: 0 },
                    labelStyle: { format: 'positive {value} ', font: { size: '0' } },
                    ranges: [{
                            start: 0, end: 50,
                            startWidth: 15, endWidth: 15,
                            color: '#EC121C'
                        }, {
                            start: 50, end: 100,
                            startWidth: 15, endWidth: 15,
                            color: '#45EA0C'
                        }],
                    pointers: [{
                            value: 60, radius: '60%',
                            animation: { enable: false },
                            color: '#777777', pointerWidth: 5,
                            cap: {
                                radius: 6,
                                border: { width: 0 },
                                color: '#777777'
                            },
                            needleTail: {
                                length: '25%',
                                color: '#777777'
                            }
                        }]
                }],
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            }
        });
        return gauge2;
    }
    exports.gauge2 = gauge2;
    function gauge3() {
        var gauge3 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            axes: [{
                    annotations: [{
                            description: 'Negative arrow',
                            content: '#uk',
                            angle: 180, zIndex: '1',
                            radius: '30%'
                        }, {
                            description: 'UK',
                            content: '<div style="color:#9E9E9E;font-size:16px;font-family:inherit">UK</div>',
                            angle: 180, zIndex: '1',
                            radius: '65%'
                        }],
                    startAngle: 230,
                    endAngle: 130,
                    majorTicks: { width: 0 },
                    lineStyle: { width: 0 },
                    minorTicks: { width: 0 },
                    labelStyle: { format: 'negative {value}', font: { size: '0' } },
                    ranges: [{
                            start: 0, end: 50,
                            startWidth: 15, endWidth: 15,
                            color: '#EC121C'
                        }, {
                            start: 50, end: 100,
                            startWidth: 15, endWidth: 15,
                            color: '#45EA0C'
                        }],
                    pointers: [{
                            value: 25, radius: '60%',
                            animation: { enable: false },
                            color: '#777777', pointerWidth: 5,
                            cap: {
                                radius: 6,
                                border: { width: 0 },
                                color: '#777777'
                            },
                            needleTail: {
                                length: '25%',
                                color: '#777777'
                            }
                        }]
                }],
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            }
        });
        return gauge3;
    }
    exports.gauge3 = gauge3;
});
