import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, Selection, SelectionMode, ColumnSeries, ChartTheme } from '@syncfusion/ej2-charts';
import { Legend, Category, ScatterSeries, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(Selection, Legend, ColumnSeries, Category, ScatterSeries);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Range Selection in Chart
 */

    
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            minimum: 1970,
            maximum: 2016,
            majorGridLines: { width: 0 },
            majorTickLines: {width : 0},
            minorTickLines: {width: 0}
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            title: 'Sales',
            labelFormat: '{value}%',
            interval: 25,
            minimum: 0,
            maximum: 100,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
        },
        chartArea: { border: { width: 0 } },
        //Initializing Chart Series
        series: [
            {
                type: 'Scatter',
                dataSource: [{ x: 1971, y: 50 }, { x: 1972, y: 20 }, { x: 1973, y: 63 }, { x: 1974, y: 81 }, { x: 1975, y: 64 },
                    { x: 1976, y: 36 }, { x: 1977, y: 22 }, { x: 1978, y: 78 }, { x: 1979, y: 60 }, { x: 1980, y: 41 },
                    { x: 1981, y: 62 }, { x: 1982, y: 56 }, { x: 1983, y: 96 }, { x: 1984, y: 48 }, { x: 1985, y: 23 },
                    { x: 1986, y: 54 }, { x: 1987, y: 73 }, { x: 1988, y: 56 }, { x: 1989, y: 67 }, { x: 1990, y: 79 },
                    { x: 1991, y: 18 }, { x: 1992, y: 78 }, { x: 1993, y: 92 }, { x: 1994, y: 43 }, { x: 1995, y: 29 },
                    { x: 1996, y: 14 }, { x: 1997, y: 85 }, { x: 1998, y: 24 }, { x: 1999, y: 61 }, { x: 2000, y: 80 },
                    { x: 2001, y: 14 }, { x: 2002, y: 34 }, { x: 2003, y: 81 }, { x: 2004, y: 70 }, { x: 2005, y: 21 },
                    { x: 2006, y: 70 }, { x: 2007, y: 32 }, { x: 2008, y: 43 }, { x: 2009, y: 21 }, { x: 2010, y: 63 },
                    { x: 2011, y: 9 }, { x: 2012, y: 51 }, { x: 2013, y: 25 }, { x: 2014, y: 96 }, { x: 2015, y: 32 }
                ],
                xName: 'x',
                yName: 'y', name: 'Product A',
                marker: {
                    shape: 'Triangle',
                    width: 10, height: 10
                }
            },
            {
                type: 'Scatter',
                    dataSource: [{ x: 1971, y: 23 }, { x: 1972, y: 67 }, { x: 1973, y: 83 }, { x: 1974, y: 43 }, { x: 1975, y: 8 },
                        { x: 1976, y: 41 }, { x: 1977, y: 56 }, { x: 1978, y: 31 }, { x: 1979, y: 29 }, { x: 1980, y: 87 },
                        { x: 1981, y: 43 }, { x: 1982, y: 12 }, { x: 1983, y: 38 }, { x: 1984, y: 67 }, { x: 1985, y: 49 },
                        { x: 1986, y: 67 }, { x: 1987, y: 83 }, { x: 1988, y: 16 }, { x: 1989, y: 89 }, { x: 1990, y: 18 },
                        { x: 1991, y: 46 }, { x: 1992, y: 39 }, { x: 1993, y: 68 }, { x: 1994, y: 87 }, { x: 1995, y: 45 },
                        { x: 1996, y: 42 }, { x: 1997, y: 28 }, { x: 1998, y: 82 }, { x: 1999, y: 13 }, { x: 2000, y: 83 },
                        { x: 2001, y: 26 }, { x: 2002, y: 57 }, { x: 2003, y: 48 }, { x: 2004, y: 84 }, { x: 2005, y: 64 },
                        { x: 2006, y: 24 }, { x: 2007, y: 82 }, { x: 2008, y: 37 }, { x: 2009, y: 68 }, { x: 2010, y: 37 },
                        { x: 2011, y: 35 }, { x: 2012, y: 81 }, { x: 2013, y: 38 }, { x: 2014, y: 51 }, { x: 2015, y: 58 }
                ],
                xName: 'x',
                yName: 'y', name: 'Product B',
                marker: {
                    shape: 'Pentagon',
                    width: 10, height: 10
                }
            },
        ],
        //Initializing Chart title
        title: 'Profit Comparision of A and B', legendSettings: { visible: true, toggleVisibility: false },
        //Initializing Selection Mode
        allowMultiSelection: false,
        selectionMode: 'DragXY',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.selectionMode = <SelectionMode>mode.value;
            chart.series[0].animation.enable = false;
            chart.series[1].animation.enable = false;
            chart.refresh();
        }
    });
    mode.appendTo('#selmode');
    document.getElementById('select').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
        chart.allowMultiSelection = element.checked;
        chart.series[0].animation.enable = false;
        chart.series[1].animation.enable = false;
        chart.refresh();
    };

