import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { RangeNavigator, AreaSeries, DateTime, IChangedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(AreaSeries, DateTime);
import { Browser, Fetch } from '@syncfusion/ej2-base';
import { Grid } from '@syncfusion/ej2-grids';
import { loadRangeNavigatorTheme } from './theme-colors';

/**
 * Sample range navigator with filter functionalities
 */

let theme: ChartTheme = loadRangeNavigatorTheme();


    
    let datasrc: Object[];
    let fetchApi: Fetch = new Fetch('./src/range-navigator/data-source/grid-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on FETCH success
    fetchApi.onSuccess = (data: Object[]): void => {
        datasrc = data;
        datasrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['HireDate'] = new Date(data['HireDate']);
        });
        let grid: Grid = new Grid({
            height: '350',
            width: Browser.isDevice ? '100%' : '80%',
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Center' },
                { field: 'FirstName', headerText: 'Name', textAlign: 'Center' },
                { field: 'Title', headerText: 'Title', textAlign: 'Center' },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'Center',
                    format: { skeleton: 'yMd', type: 'date' }
                }
            ],
        });
        grid.appendTo('#grid');
        let range: RangeNavigator = new RangeNavigator(
            {
                animationDuration: 500,
                width: Browser.isDevice ? '100%' : '80%',
                value: [new Date(1992, 5, 1), new Date(1993, 4, 1)],
                valueType: 'DateTime',
                allowSnapping: true,
                intervalType: 'Quarter',
                enableGrouping: true,
                groupBy: 'Years',
                enableDeferredUpdate: true,
                dataSource: datasrc, xName: 'HireDate', yName: 'yValue',
                changed: (args: IChangedEventArgs) => {
                    grid.dataSource = datasrc.filter((data: { [key: string]: Object }): Boolean => {
                        return (data.HireDate >= new Date(+args.start) && data.HireDate <= new Date(+args.end));
                    });
                    grid.refresh();
                },
                theme: theme
            }
        );
        range.appendTo('#container');
    };
