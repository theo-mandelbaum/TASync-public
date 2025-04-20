import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start

// custom code end
/**
 * Osm with sublayer sample
 */
import { Maps, Bubble, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom } from '@syncfusion/ej2-maps';
import { africa } from './map-data/africa';
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
        titleSettings: {
            text: 'Location of Africa continent in the World map',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        zoomSettings: {
            enable: true
        },
        layers: [{
            urlTemplate:'https://tile.openstreetmap.org/level/tileX/tileY.png',
        },
        {
            type: 'SubLayer',
            animationDuration: 0,
            shapeData: africa,
            shapeSettings: {
                fill: '#5100a3',
                opacity: 0.4
            }
        }]
    });
    maps.appendTo('#container');
