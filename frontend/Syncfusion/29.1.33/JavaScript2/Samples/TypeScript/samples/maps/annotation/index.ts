import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start
//tslint:disable

// custom code end
/**
 * Maps Annotation
 */
import { Maps, Annotations, Marker, MapsTheme, ILoadEventArgs } from '@syncfusion/ej2-maps';
import { africaContinent } from './map-data/africa-continent';
Maps.Inject(Annotations, Marker);

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
        zoomSettings: {
            enable: false
        },
        annotations: [
            {
                content: '#maps-annotation',
                x: '0%', y: '70%'
            }, {
                content: '#compass-maps',
                x: '80%', y: '5%'
            }
        ],
        layers: [
            {
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                shapeData: africaContinent,
                shapeSettings: {
                    fill: 'url(#grad1)'
                },
                markerSettings: [
                    {
                        visible: true,
                        template: '<h3 style="color:white; font-family: Segoe UI;">{{:name}}</h3>',
                        animationDuration: 1,
                        dataSource: [{
                            name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
                        }]
                    }
                ]
            }
        ]
    });
    maps.appendTo('#maps');
