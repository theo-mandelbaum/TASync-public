define(["require", "exports", "@syncfusion/ej2-lineargauge"], function (require, exports, ej2_lineargauge_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.linear = void 0;
    ej2_lineargauge_1.LinearGauge.Inject(ej2_lineargauge_1.Annotations);
    function linear() {
        var gauge = new ej2_lineargauge_1.LinearGauge({
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            },
            allowMargin: false,
            orientation: 'Horizontal',
            axes: [{
                    labelStyle: {
                        format: '{value}%',
                        offset: 30,
                        font: {
                            fontFamily: 'Segoe UI'
                        }
                    },
                    line: {
                        width: 0
                    },
                    pointers: [
                        {
                            value: 35,
                            height: 10,
                            width: 10,
                            markerType: 'Triangle',
                            placement: 'Near',
                            offset: -40,
                        }
                    ],
                    majorTicks: {
                        height: 0
                    },
                    minorTicks: {
                        height: 0
                    },
                    ranges: [{
                            start: 0,
                            end: 32,
                            color: '#30B32D',
                            startWidth: 15,
                            endWidth: 15
                        },
                        {
                            start: 32,
                            end: 68,
                            startWidth: 15,
                            endWidth: 15,
                            color: '#FFDF00'
                        },
                        {
                            start: 68,
                            end: 100,
                            startWidth: 15,
                            endWidth: 15,
                            color: '#F03E3E'
                        }]
                }],
            annotations: [{
                    content: '<div id="pointer" style="width:20px"><h1 style="font-size:18px; font-family: Segoe UI;">35</h1></div>',
                    axisIndex: 0, zIndex: '1',
                    axisValue: 35,
                    y: -50
                }]
        });
        return gauge;
    }
    exports.linear = linear;
});
