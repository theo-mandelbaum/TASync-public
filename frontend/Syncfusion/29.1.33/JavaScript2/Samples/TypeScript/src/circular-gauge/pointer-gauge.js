define(["require", "exports", "@syncfusion/ej2-circulargauge"], function (require, exports, ej2_circulargauge_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gauge5 = exports.gauge6 = exports.gauge3 = exports.gauge4 = exports.gauge2 = exports.gauge1 = void 0;
    ej2_circulargauge_1.CircularGauge.Inject(ej2_circulargauge_1.Annotations);
    function gauge1() {
        var gauge1 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            centerY: '40%',
            axes: [{
                    startAngle: 270,
                    endAngle: 90,
                    lineStyle: { width: 3, color: '#ff5985' },
                    labelStyle: {
                        format: '$ {value}',
                        position: 'Outside',
                        font: { size: '0px', color: '#ff5985' }
                    }, majorTicks: {
                        width: 1,
                        height: 0,
                        interval: 100
                    }, minorTicks: {
                        height: 0,
                        width: 0,
                    },
                    radius: '90%',
                    minimum: 0,
                    maximum: 100,
                    pointers: [{
                            type: 'RangeBar',
                            value: 66,
                            radius: '90%',
                            color: '#ff5985',
                            pointerWidth: 10,
                            animation: { enable: true, duration: 1000 }
                        }],
                    annotations: [
                        {
                            description: 'Range bar pointer',
                            angle: 180, zIndex: '1',
                            radius: '28%',
                            content: '<div style="font-size:14px;margin-top:11px;">Range bar pointer</div>'
                        }
                    ]
                }],
            load: function (args) {
                var selectTheme = location.hash.split('/')[1];
                selectTheme = selectTheme ? selectTheme : 'Material';
                args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                    selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            }
        });
        return gauge1;
    }
    exports.gauge1 = gauge1;
    function gauge2() {
        var gauge2 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            centerY: '40%',
            axes: [{
                    startAngle: 270,
                    endAngle: 90,
                    lineStyle: { width: 3, color: '#01aebe' },
                    labelStyle: {
                        format: '{value}%',
                        position: 'Outside',
                        font: { size: '0px', color: '#01aebe' }
                    }, majorTicks: {
                        width: 1,
                        height: 0,
                        interval: 100
                    }, minorTicks: {
                        height: 0,
                        width: 0,
                    },
                    radius: '90%',
                    minimum: 0,
                    maximum: 100,
                    pointers: [{
                            description: 'Marker pointer value: 80',
                            radius: '100%',
                            value: 80,
                            type: 'Marker',
                            markerShape: 'InvertedTriangle',
                            markerWidth: 15,
                            markerHeight: 15,
                            color: 'rgb(0,171,169)'
                        }],
                    annotations: [
                        {
                            description: 'Marker pointer',
                            angle: 180, zIndex: '1',
                            radius: '28%',
                            content: '<div style="font-size:14px;margin-top:10px;">Marker pointer</div>'
                        }
                    ]
                }],
            load: function (args) {
                var selectTheme = location.hash.split('/')[1];
                selectTheme = selectTheme ? selectTheme : 'Material';
                args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                    selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            }
        });
        return gauge2;
    }
    exports.gauge2 = gauge2;
    function gauge4() {
        var gauge4 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            centerY: '40%',
            axes: [{
                    startAngle: 270,
                    endAngle: 90,
                    lineStyle: { width: 3, color: '#1E7145' },
                    labelStyle: {
                        format: '${value}',
                        position: 'Outside',
                        font: { size: '0px', color: '#1E7145' }
                    }, majorTicks: {
                        width: 1,
                        height: 0,
                        interval: 100
                    }, minorTicks: {
                        height: 0,
                        width: 0,
                    },
                    radius: '90%',
                    minimum: 0,
                    maximum: 100,
                    pointers: [{
                            animation: { enable: true, duration: 1000 },
                            description: 'Needle pointer: 80',
                            value: 80,
                            radius: '80%',
                            color: 'green',
                            pointerWidth: 2,
                            needleStartWidth: 4,
                            needleEndWidth: 4,
                            cap: {
                                radius: 8,
                                color: 'green'
                            },
                            needleTail: {
                                length: '0%'
                            }
                        }],
                    annotations: [
                        {
                            description: 'Customized pointer',
                            angle: 180, zIndex: '1',
                            radius: '28%',
                            content: '<div style="font-size:14px; padding-top: 29px">Customized pointer</div>'
                        }
                    ]
                }],
            load: function (args) {
                var selectTheme = location.hash.split('/')[1];
                selectTheme = selectTheme ? selectTheme : 'Material';
                args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                    selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            }
        });
        return gauge4;
    }
    exports.gauge4 = gauge4;
    function gauge3() {
        var gauge3 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            centerY: '40%',
            axes: [{
                    startAngle: 270,
                    endAngle: 90,
                    lineStyle: { width: 3, color: '#9250e6' },
                    labelStyle: {
                        format: '{value} s',
                        position: 'Outside',
                        font: { size: '0px', color: '#9250e6' }
                    }, majorTicks: {
                        width: 1,
                        height: 0,
                        interval: 100
                    }, minorTicks: {
                        height: 0,
                        width: 0,
                    },
                    radius: '90%',
                    minimum: 0,
                    maximum: 100,
                    pointers: [{
                            description: 'Needle pointer value : 70',
                            radius: '100%',
                            animation: { enable: true, duration: 900 },
                            value: 70,
                            color: '#923C99',
                            pointerWidth: 6,
                            cap: { radius: 0 },
                            needleTail: { length: '4%', color: '#923C99' }
                        }],
                    annotations: [
                        {
                            description: 'Needle pointer',
                            angle: 180, zIndex: '1',
                            radius: '28%',
                            content: '<div style="font-size:14px;margin-top:11px;">Needle pointer</div>'
                        }
                    ]
                }],
            load: function (args) {
                var selectTheme = location.hash.split('/')[1];
                selectTheme = selectTheme ? selectTheme : 'Material';
                args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                    selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            }
        });
        return gauge3;
    }
    exports.gauge3 = gauge3;
    function gauge6() {
        var gauge6 = new ej2_circulargauge_1.CircularGauge({
            title: 'Speedometer',
            background: 'transparent',
            titleStyle: { size: '18px', fontFamily: 'inherit' },
            centerY: '75%',
            axes: [{
                    radius: '120%',
                    minimum: 0,
                    maximum: 120,
                    lineStyle: { width: 0 },
                    majorTicks: { width: 0, },
                    minorTicks: { width: 0 },
                    labelStyle: {
                        useRangeColor: false, position: 'Outside', autoAngle: true,
                        font: { size: '13px', fontFamily: 'inherit' }
                    },
                    startAngle: 270, endAngle: 90,
                    pointers: [{
                            animation: { enable: true, duration: 900 },
                            value: 40,
                            radius: '80%',
                            color: '#757575',
                            pointerWidth: 7,
                            cap: {
                                radius: 8,
                                color: '#757575',
                                border: { width: 0 }
                            },
                            needleTail: {
                                color: '#757575',
                                length: '15%'
                            },
                        }],
                    annotations: [
                        {
                            content: '#pointerValue',
                            angle: 0, zIndex: '1',
                            radius: '30%'
                        }
                    ],
                    ranges: [
                        {
                            start: 0,
                            end: 20,
                            startWidth: 5, endWidth: 10,
                            radius: '102%',
                            color: '#82b944',
                        },
                        {
                            start: 20,
                            end: 40,
                            startWidth: 10, endWidth: 15,
                            radius: '102%',
                            color: '#a1cb43',
                        }, {
                            start: 40,
                            end: 60,
                            startWidth: 15, endWidth: 20,
                            radius: '102%',
                            color: '#ddec12',
                        },
                        {
                            start: 60,
                            end: 80,
                            startWidth: 20, endWidth: 25,
                            radius: '102%',
                            color: '#ffbc00',
                        },
                        {
                            start: 80,
                            end: 100,
                            startWidth: 25, endWidth: 30,
                            radius: '102%',
                            color: '#ff6000',
                        },
                        {
                            start: 100,
                            end: 120,
                            startWidth: 30, endWidth: 35,
                            radius: '102%',
                            color: 'red',
                        }
                    ]
                }],
            load: function (args) {
                var selectTheme = location.hash.split('/')[1];
                selectTheme = selectTheme ? selectTheme : 'Material';
                args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                    selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            }
        });
        return gauge6;
    }
    exports.gauge6 = gauge6;
    function gauge5() {
        var gauge5 = new ej2_circulargauge_1.CircularGauge({
            centerY: '40%',
            background: 'transparent',
            axes: [{
                    startAngle: 270,
                    endAngle: 90,
                    lineStyle: { width: 0 },
                    labelStyle: {
                        format: '{value} seconds',
                        position: 'Outside',
                        font: { size: '0px', color: '#067bc2' }
                    }, majorTicks: {
                        width: 1,
                        height: 0,
                        interval: 100
                    }, minorTicks: {
                        height: 0,
                        width: 0,
                    },
                    radius: '90%',
                    minimum: 0,
                    maximum: 100,
                    pointers: [{
                            radius: '100%',
                            description: 'Needle pointer :40',
                            animation: { enable: false, duration: 100 },
                            value: 40,
                            color: '#067bc2',
                            pointerWidth: 6,
                            cap: { radius: 0 },
                            needleTail: { length: '4%', color: '#067bc2' }
                        }, {
                            description: 'RangeBar pointer value : 40',
                            radius: '100%',
                            type: 'RangeBar',
                            animation: { enable: false, duration: 100 },
                            value: 40,
                            color: '#067bc2',
                            pointerWidth: 5
                        }],
                    annotations: [
                        {
                            description: 'Live update',
                            angle: 180, zIndex: '1',
                            radius: '32%',
                            content: '<div style="font-size:14px; margin-top:22px">Live update</div>'
                        }
                    ]
                }],
            load: function (args) {
                var selectTheme = location.hash.split('/')[1];
                selectTheme = selectTheme ? selectTheme : 'Material';
                args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                    selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            }
        });
        return gauge5;
    }
    exports.gauge5 = gauge5;
});
