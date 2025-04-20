import { LinearGauge, GaugeTooltip, Annotations, ITooltipRenderEventArgs, IResizeEventArgs, LinearGaugeTheme, IAxisLabelRenderEventArgs, ILoadedEventArgs, ILoadEventArgs  } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations, GaugeTooltip);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
   let gauge = new LinearGauge({
        container: {
            width: 140,
            border: {
                width: 2,
                color: '#a6a6a6'
            }
        },
        tooltip: {
            enable: true,
            showAtMousePosition: true,
            textStyle: { fontFamily: "inherit" },
        },
        background:'transparent',  
        orientation: 'Horizontal',
        axes: [
            {
                minimum: 0,
                maximum: 10,
                line: {
                    offset: 140,
                    color:"#a6a6a6"
                },
                majorTicks: {
                    interval: 1,
                    height: 20,
                    color: "#9E9E9E",
                },
                minorTicks: {
                    interval: 0.2,
                    height: 10,
                    color: "#9E9E9E",
                },
                labelStyle: {
                    font: {
                        fontFamily: "inherit",
                    }
                },
                pointers: [{
                    type: 'Bar',
                    value: 5.4,
                    offset: 15,
                    color: '#ff66b3'
                }],
            },
            {
                opposedPosition: true,
                minimum: 0,
                maximum: 25,
                line: {
                    offset: -140,
                    color:"#a6a6a6"
                },
                majorTicks: {
                    interval: 1,
                    height: 20,
                    color: '#9E9E9E',
                },
                minorTicks: {
                    interval: 0.2,
                    height: 10,
                    color: '#9E9E9E',
                },
                pointers: [{
                    type: 'Bar',
                    offset: -15,
                    value: 16.5,
                    color: '#4d94ff',
                }],
                labelStyle: {
                    font: {
                        fontFamily: "inherit",
                    },
                }
            }
        ],
        annotations: [
            {
                content: '<div id="first"><h1 style="font-size:15px;color:#686868;">Inches</h1></div>',
                axisIndex: 0,
                axisValue: 5.4,
                x: 35,
                y: -58,
                zIndex: '1'
            },
            {
                content: '<div id="second"><h1 style="font-size:15px;color:#686868;">Centimeters</h1></div>',
                axisIndex: 1,
                axisValue: 16.5,
                x: 50,
                y: 52,
                zIndex: '1'
            }
        ],
        axisLabelRender: labelRender,
        tooltipRender: renderTooltip,
        load: gaugeLoad,
        loaded: gaugeLoaded
    });
    gauge.appendTo('#tooltipContainer');

function renderTooltip(args: ITooltipRenderEventArgs): void {
    args.content = (args.axis.visibleRange.max === 25) ? args.content + ' cm' : args.content + ' in';
}

function labelRender(args: IAxisLabelRenderEventArgs): void {
    if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
        args.text = '';
    }
}

function gaugeLoad(args: ILoadEventArgs): void {
    // custom code start
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
    // custom code end
    if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast' || args.gauge.theme.toLowerCase() === 'fluent2highcontrast') {
        args.gauge.annotations[0].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
        args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
    }    
}

function gaugeLoaded(args: ILoadedEventArgs): void {
    let width: number = parseInt(((this.width, this.element.offsetWidth) || this.element.offsetWidth || 600), 10);
    if (width < 500) {
        gauge.axes[1].majorTicks.interval = 2;
        gauge.axes[1].minorTicks.interval = 1;
        gauge.orientation = 'Vertical';
        gauge.annotations[0].x = -57;
        gauge.annotations[0].y = -30;
        gauge.annotations[1].x = 50;
        gauge.annotations[1].y = -45;
    } else {
        gauge.axes[1].majorTicks.interval = 1;
        gauge.axes[1].minorTicks.interval = 0.2;
        gauge.orientation = 'Horizontal';
        gauge.annotations[0].x = 35;
        gauge.annotations[0].y = -58;
        gauge.annotations[1].x = 50;
        gauge.annotations[1].y = 52;
    }
    if (document.getElementById('tooltipContainer')) {
        if (gauge.availableSize.width < 500) {
            document.getElementById('tooltipContainer_Annotation_0').style.transform = 'rotate(270deg)';
            document.getElementById('tooltipContainer_Annotation_1').style.transform = 'rotate(270deg)';
        } else {
            document.getElementById('tooltipContainer_Annotation_0').style.transform = '';
            document.getElementById('tooltipContainer_Annotation_1').style.transform = '';
        }
    }
 }
};