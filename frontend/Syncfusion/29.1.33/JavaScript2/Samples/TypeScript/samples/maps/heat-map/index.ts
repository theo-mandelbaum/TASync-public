import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start

// custom code end
/**
 * Heat Map sample
 */
import { Maps, Marker, MapsTooltip, Legend, ILoadEventArgs, MapsTheme } from '@syncfusion/ej2-maps';
import { india } from './map-data/india';
import { heatmapData } from './map-data/heatmap-datasource';
Maps.Inject(Marker, MapsTooltip, Legend);
// custom code start
//tslint:disable
// custom code end

    // custom code start
    
    // custom code end
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i,  'Contrast').replace(/5.3/i, '5');
        },
        // custom code end
        format: 'n',
        useGroupingSeparator: true,
        titleSettings: {
            text: "State wise India's population - 2011",
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        legendSettings: {
            visible: true,
            mode: 'Interactive',
            position: 'Bottom',
            height: '10',
            width: '350',
            labelDisplayMode: 'Trim',
            alignment: 'Center',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                shapeData: india,
                shapePropertyPath: 'NAME_1',
                shapeDataPath: 'Name',
                dataSource: heatmapData,
                tooltipSettings: {
                    visible: true,
                    valuePath: 'population',
                    format: 'State: ${Name} <br> Population: ${population}',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                    }
                },
                shapeSettings: {
                    border: {
                        width: 0.2,
                        color: 'white'
                    },
                    colorValuePath: 'population',
                    colorMapping: [{
                        from: 60000, to: 400000, color: '#9fdfdf', label: '<0.4M'
                    },
                    {
                        from: 400000, to: 10000000, color: '#79d2d2', label: '0.4-10M'
                    },
                    {
                        from: 10000000, to: 20000000, color: '#53C6C6', label: '10-20M'
                    },
                    {
                        from: 20000000, to: 70000000, color: '#39acac', label: '20-70M'
                    },
                    {
                        from: 70000000, to: 100000000, color: '#339999', label: '70-100M'
                    },
                    {
                        from: 100000000, to: 200000000, color: '#2d8686', label: '>100M'
                    }
                    ]
                }
            }
        ]
    });
    maps.appendTo('#container');

