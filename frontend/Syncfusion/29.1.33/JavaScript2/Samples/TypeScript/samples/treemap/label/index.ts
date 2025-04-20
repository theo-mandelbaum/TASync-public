import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
/**
 * Label sample
 */
// custom code start
//tslint:disable

// custom code end
import { TreeMap, LabelAlignment, TreeMapTooltip, TreeMapLegend, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { countryPopulation } from './treemap-data/country-population';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';

    // custom code start
    
    // custom code end
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        titleSettings: {
            text: 'Countries ordered based on Population - 2017',
            textStyle: { size: '15px', fontFamily: 'Segoe UI'  }
        },
        dataSource: countryPopulation,
        tooltipSettings: {
            visible: true,
            format: '${Country} : ${Population}',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        legendSettings: {
            visible: true,
            mode: 'Interactive',
            width: '300px',
            height: '10',
            position: 'Top',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        format: 'n',
        useGroupingSeparator: true,
        rangeColorValuePath: 'Population',
        weightValuePath: 'Population',
        leafItemSettings: {
            showLabels: true,
            labelPath: 'Country',
            fill: 'red',
            labelStyle: {
                fontFamily: 'Segoe UI'
            },
            colorMapping: [
                {
                    to: 10000000000,
                    from: 100000000,
                    label: '200M - 1.3M',
                    color: '#4B134F'
                }, { to: 100000000, from: 20000000, label: '20M - 200M', color: '#8C304D' },
                { to: 20000000, from: 100000, label: '0.1M - 20M', color: '#C84B4B' }
            ]
        },
    });
    treemap.appendTo('#container');
    // Treemap label position
    let labelMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Label Action',
        width: '100%',
        change: () => {
            treemap.leafItemSettings.interSectAction = <LabelAlignment>labelMode.value;
            treemap.refresh();
        }
    });
    labelMode.appendTo('#labels');



