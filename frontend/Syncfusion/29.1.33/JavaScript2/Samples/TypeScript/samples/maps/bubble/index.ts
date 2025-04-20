import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start

// custom code end
/**
 * Bubble sample
 */
import { internetUsers } from './map-data/population-data';
import { worldMap } from './map-data/world-map';
import { Maps, Bubble, IBubbleRenderingEventArgs, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom } from '@syncfusion/ej2-maps';
Maps.Inject(Bubble, MapsTooltip, Zoom);
export interface Data {
    value?: number;
}

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
        bubbleRendering: (args: IBubbleRenderingEventArgs) => {
            args.radius = (args.data as Data).value;
        },
        format: 'n',
        useGroupingSeparator: true,
        zoomSettings: {
            enable: true,
            toolbarSettings: {
                orientation:'Vertical',
                horizontalAlignment: 'Near',
            },
            pinchZooming: true
        },
        titleSettings: {
            text: 'Top 30 countries with highest Internet users',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        layers: [
            {
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                shapeData: worldMap,
                shapeSettings: {
                    fill: '#E5E5E5'
                },
                bubbleSettings: [
                    {
                        visible: true,
                        valuePath: 'value',
                        colorValuePath: 'color',
                        minRadius: 3,
                        maxRadius: 70,
                        opacity: 0.8,
                        dataSource: internetUsers,
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'population',
                            template: '#template'
                        },
                    }
                ]
            }
        ]
    });
    maps.appendTo('#container');
