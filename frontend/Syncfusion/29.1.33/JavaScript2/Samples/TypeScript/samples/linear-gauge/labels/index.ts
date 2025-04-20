import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import { LinearGauge, ILoadEventArgs, LinearGaugeTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-lineargauge';
// custom code start


// custom code end

    document.getElementById('horizontal').onclick = (e: Event) => {
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = document.getElementById('container4').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        gauge1.width = gauge2.width = gauge3.width = gauge4.width = '450px';
        gauge1.height = gauge2.height = gauge3.height = gauge4.height = '150px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = gauge4.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
        }
    };
    document.getElementById('vertical').onclick = (e: Event) => {
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = document.getElementById('container4').className = "col-xs-5 col-sm-5 col-lg-3 col-md-3";
        gauge1.width = gauge2.width = gauge3.width = gauge4.width = '200px';
        gauge1.height = gauge2.height = gauge3.height = gauge4.height = '350px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = gauge4.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
        }
    };

    let gauge1: LinearGauge = new LinearGauge({
        title: 'Custom labels',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        width:'150px',
        height:'350px',
        background:'transparent',
        animationDuration: 1500,
        axes: [{
            line: {
                width: 5
            },
            pointers: [{
                width: 0,
            }],
            majorTicks: {
                interval: 5, height: 7, width: 1
            },
            minorTicks: {
                interval: 2.5, height: 3
            },
            minimum: 5,
            maximum: 20,
            opposedPosition: true,
            labelStyle: { format: '${value}', font: { fontFamily: 'inherit' } }
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
        axisLabelRender(args: IAxisLabelRenderEventArgs): void {
            if (args.text == "20")
                args.text = "Ordered";
            else if (args.text == "15")
                args.text = "Packed";
            else if (args.text == "10")
                args.text = "Shipped";
            else if (args.text == "5")
                args.text = "Delivered";
            else
                args.text = " ";
        },
        title: 'Text labels',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 5
            },
            pointers: [{
                width: 15,
                height: 15,
                value: 20,
                color: '#0DC9AB',
                placement: 'Near',
                markerType: 'Circle',
                offset: 7
            }, {
                width: 15,
                height: 15,
                value: 15,
                color: '#0DC9AB',
                placement: 'Near',
                markerType: 'Circle',
                offset: 7
            },
            {
                width: 15,
                height: 15,
                value: 10,
                color: '#0DC9AB',
                placement: 'Near',
                markerType: 'Circle',
                offset: 7
            },
            {
                width: 15,
                height: 15,
                value: 5,
                color: '#E5E7EB',
                placement: 'Near',
                markerType: 'Circle',
                offset: 7
            }
            ],
            ranges: [{
                start: 10,
                end: 15,
                startWidth: 5,
                endWidth: 5,
                color: '#0DC9AB'
            },
            {
                start: 15,
                end: 20,
                startWidth: 5,
                endWidth: 5,
                color: '#0DC9AB'
            }
            ],
            majorTicks: {
                interval: 5, height: 0
            },
            minorTicks: {
                interval: 2.5, height: 0
            },
            minimum: 5,
            maximum: 20,
            opposedPosition: true,
            labelStyle: { offset: 10, font: { fontFamily: 'inherit' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            if (args.gauge.theme === "Fluent2Dark" || args.gauge.theme === 'Fluent2HighContrast') {
                (args.gauge.axes[0].pointers as any)[3].color = "#292827"; 
            } else if (args.gauge.theme === 'Bootstrap5Dark') {
                args.gauge.axes[0].pointers[3].color = '#343A40';
            } else if (args.gauge.theme === 'Tailwind3Dark') {
                args.gauge.axes[0].pointers[3].color = '#282F3C';
            } else if (args.gauge.theme === 'Material3') {
                args.gauge.axes[0].pointers[3].color = '#C4C7C5';
            } else if (args.gauge.theme === 'Material3Dark') {
                args.gauge.axes[0].pointers[3].color = '#938F99';
            }
            // custom code end
        }
    });
    gauge2.appendTo('#gauge2');

    let gauge3: LinearGauge = new LinearGauge({
        title: 'Label offset',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        animationDuration: 1500,
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 5
            },
            pointers: [
                {
                    width: 0,
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
            labelStyle: { offset: 5, font: { fontFamily: 'inherit' } }
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

    let gauge4: LinearGauge = new LinearGauge({
        title: 'Label customization',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        animationDuration: 1500,
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 5
            },
            majorTicks: {
                interval: 20,
                height: 7,
                width: 1
            },
            minorTicks: {
                interval: 10,
                height: 3
            },
            labelStyle: {
                font: { fontFamily: 'inherit', color: '#F93106' }
            },
            pointers: [
                {
                    width: 0
                }
            ],
            minimum: 0,
            maximum: 100,
            opposedPosition: true
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
    gauge4.appendTo('#gauge4');
