import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import { HeatMap, Legend, Tooltip, Adaptor, BubbleTooltipData, ITooltipEventArgs, ILoadedEventArgs, HeatMapTheme} from '@syncfusion/ej2-heatmap';
HeatMap.Inject(Tooltip, Legend, Adaptor);
// custom code start


// custom code end

    let jsonCellBubbleData: Object = [
            { Year: '2017', Months: 'Jan-Feb', Accidents: 4, Fatalities: 39 },
            { Year: '2017', Months: 'Mar-Apr', Accidents: 3, Fatalities: 8 },
            { Year: '2017', Months: 'May-Jun', Accidents: 1, Fatalities: 3 },
            { Year: '2017', Months: 'Jul-Aug', Accidents: 1, Fatalities: 0 },
            { Year: '2017', Months: 'Sep-Oct', Accidents: 4, Fatalities: 4 },
            { Year: '2017', Months: 'Nov-Dec', Accidents: 2, Fatalities: 15 },
            { Year: '2016', Months: 'Jan-Feb', Accidents: 4, Fatalities: 28 },
            { Year: '2016', Months: 'Mar-Apr', Accidents: 5, Fatalities: 92 },
            { Year: '2016', Months: 'May-Jun', Accidents: 5, Fatalities: 73 },
            { Year: '2016', Months: 'Jul-Aug', Accidents: 3, Fatalities: 1 },
            { Year: '2016', Months: 'Sep-Oct', Accidents: 3, Fatalities: 4 },
            { Year: '2016', Months: 'Nov-Dec', Accidents: 4, Fatalities: 126 },
            { Year: '2015', Months: 'Jan-Feb', Accidents: 1, Fatalities: 45 },
            { Year: '2015', Months: 'Mar-Apr', Accidents: 5, Fatalities: 152 },
            { Year: '2015', Months: 'May-Jun', Accidents: 0, Fatalities: 0 },
            { Year: '2015', Months: 'Jul-Aug', Accidents: 4, Fatalities: 54 },
            { Year: '2015', Months: 'Sep-Oct', Accidents: 5, Fatalities: 243 },
            { Year: '2015', Months: 'Nov-Dec', Accidents: 2, Fatalities: 45 },
            { Year: '2014', Months: 'Jan-Feb', Accidents: 2, Fatalities: 18 },
            { Year: '2014', Months: 'Mar-Apr', Accidents: 3, Fatalities: 239 },
            { Year: '2014', Months: 'May-Jun', Accidents: 0, Fatalities: 0 },
            { Year: '2014', Months: 'Jul-Aug', Accidents: 4, Fatalities: 501 },
            { Year: '2014', Months: 'Sep-Oct', Accidents: 1, Fatalities: 2 },
            { Year: '2014', Months: 'Nov-Dec', Accidents: 4, Fatalities: 162 },
            { Year: '2013', Months: 'Jan-Feb', Accidents: 2, Fatalities: 68 },
            { Year: '2013', Months: 'Mar-Apr', Accidents: 3, Fatalities: 7 },
            { Year: '2013', Months: 'May-Jun', Accidents: 2, Fatalities: 12 },
            { Year: '2013', Months: 'Jul-Aug', Accidents: 4, Fatalities: 15 },
            { Year: '2013', Months: 'Sep-Oct', Accidents: 2, Fatalities: 64 },
            { Year: '2013', Months: 'Nov-Dec', Accidents: 3, Fatalities: 83 },
            { Year: '2012', Months: 'Jan-Feb', Accidents: 0, Fatalities: 0 },
            { Year: '2012', Months: 'Mar-Apr', Accidents: 2, Fatalities: 158 },
            { Year: '2012', Months: 'May-Jun', Accidents: 5, Fatalities: 90 },
            { Year: '2012', Months: 'Jul-Aug', Accidents: 0, Fatalities: 0 },
            { Year: '2012', Months: 'Sep-Oct', Accidents: 3, Fatalities: 33 },
            { Year: '2012', Months: 'Nov-Dec', Accidents: 4, Fatalities: 42 }
        ];
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Commercial Aviation Accidents and Fatalities by year 2012 - 2017',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        xAxis: {
            labels: ['2017', '2016', '2015', '2014', '2013', '2012'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels:  ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sep-Oct', 'Nov-Dec'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        dataSource: jsonCellBubbleData,
        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Year',
            yDataMapping: 'Months',
            bubbleDataMapping: { size: 'Accidents', color: 'Fatalities' }
        },
        cellSettings: {
            border: {
                width: 0
            },
            showLabel: false,
            tileType: 'Bubble',
            bubbleType: 'SizeAndColor',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        paletteSettings: {
            palette: [{ color: '#C06C84' },
            { color: '#355C7D' }
            ],
            type: 'Gradient'
        },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = ['Year ' + ' : ' + args.xLabel + '<br/>' + 'Months ' + ' : ' + args.yLabel + '<br/>'
                + 'Accidents ' + ' : ' + (args.value as BubbleTooltipData[])[0].bubbleData + '<br/>' + 'Fatalities ' + ' : '
                + (args.value as BubbleTooltipData[])[1].bubbleData];
        },
        legendSettings: {
            visible: true,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    heatmap.appendTo('#container');
