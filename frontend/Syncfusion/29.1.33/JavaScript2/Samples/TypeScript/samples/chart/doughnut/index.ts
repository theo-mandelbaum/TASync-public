import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel);
/**
 * Sample for Doughnut chart
 */

    
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [{ x: 'Labour', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' },
                { x: 'Production', y: 15, text: '15%' }, { x: 'License', y: 11, text: '11%' },
                { x: 'Facilities', y: 18, text: '18%' }, { x: 'Taxes', y: 14, text: '14%' },
                { x: 'Insurance', y: 16, text: '16%' }],
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Inside',
                    font: {
                        fontWeight: '600',
                        color: '#ffffff'
                    }
                },
                radius: '70%', xName: 'x',
                yName: 'y', startAngle: 0,
                endAngle: 360, innerRadius: '40%', name: 'Project',
                explode: true, explodeOffset: '10%', explodeIndex: 3
            }
        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: true, position: 'Top'
        },
        // Initialize the tooltip
        tooltip: { enable: false },
        title: 'Project Cost Breakdown',
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
