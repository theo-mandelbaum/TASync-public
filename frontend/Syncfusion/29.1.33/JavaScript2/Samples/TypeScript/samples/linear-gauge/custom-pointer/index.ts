import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
// custom code start


// custom code end

    document.getElementById('horizontal').onclick = (e: Event) => {
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        gauge1.width = gauge2.width = gauge3.width = '450px';
        gauge1.height = gauge2.height = gauge3.height = '150px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = "Horizontal";
        gauge1.axes[0].pointers[0].offset = 2;
        gauge3.axes[0].pointers[0].offset = 2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
        }
    };
    document.getElementById('vertical').onclick = (e: Event) => {
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = "col-xs-5 col-sm-5 col-lg-4 col-md-4";
        gauge1.width = gauge2.width = gauge3.width = '170px';
        gauge1.height = gauge2.height = gauge3.height = '350px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = "Vertical";
        gauge1.axes[0].pointers[0].offset = -2;
        gauge3.axes[0].pointers[0].offset = -2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
        }
    };
    let gauge1: LinearGauge = new LinearGauge({
        title: 'Text widget',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        animationDuration: 2000,
        width:'150px',
        height:'350px',
        annotations: [{
            axisIndex: 0,
            axisValue: 55,
            x: 0,
            y: 0,
            zIndex: '1',
            content: '<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px;"> 55 </div>'
        }],
        axes: [{
            line: {
                width: 20
            },
            pointers: [{
                width: 30,
                value: 55,
                offset: -2,
                color: '#173BBB',
                position: 'Cross',
                placement: 'Center',
                markerType: 'Circle',
            }
            ],
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            labelStyle: { font: { fontFamily: 'inherit' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    gauge1.appendTo('#gauge1');

    let gauge2: LinearGauge = new LinearGauge({ 
        title: 'Icon widget',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        animationDuration: 2000,
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 20
            },
            pointers: [{
                width: 45,
                value: 90,
                height: 30,
                placement: 'Near',
                markerType: 'Image',
                imageUrl: '//npmci.syncfusion.com/development/demos/src/linear-gauge/images/thumb-icon.png'
            }
            ],
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            labelStyle: { font: { fontFamily: 'inherit' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    gauge2.appendTo('#gauge2');

    let gauge3: LinearGauge = new LinearGauge({
        title: 'Multiple widget pointers',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        animationDuration: 2000,
        width:'170px',
        height:'350px',
        annotations: [{
            axisIndex: 0,
            axisValue: 60,
            x: 0,
            y: 0,
            zIndex: '1',
            content: '<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px;"> 60 </div>'
        }],
        axes: [{
            line: {
                width: 20
            },
            pointers: [{
                width: 30,
                value: 60,
                offset: -2,
                placement: 'Center',
                position: 'Cross',
                markerType: 'Circle',
                color: '#173BBB'
            }, {
                width: 45,
                height: 30,
                value: 30,
                placement: 'Near',
                markerType: 'Image',
                color: '#173BBB',
                imageUrl: '//npmci.syncfusion.com/development/demos/src/linear-gauge/images/thumb-icon.png'
            }
            ],
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            labelStyle: { font: { fontFamily: 'inherit', fontWeight: 'normal' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    gauge3.appendTo('#gauge3');
