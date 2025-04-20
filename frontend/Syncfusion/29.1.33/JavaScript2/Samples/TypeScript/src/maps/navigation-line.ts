// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Linea penusular sample
 */
import { Maps, Marker, Zoom, NavigationLine, ILoadEventArgs, MapsTheme } from '@syncfusion/ej2-maps';
import { worldMap } from './map-data/world-map';
import { peninsularLocationData, peninsularMarkerData } from './map-data/map-location';
Maps.Inject(Marker, Zoom, NavigationLine);
// custom code start
//tslint:disable:max-func-body-length
// custom code end
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
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
            text: 'Shipping sea route between various cities',
            textStyle: {
                size: '18px',
                fontFamily: 'Segoe UI'
            }
        },
        zoomSettings: {
            enable: false,
            mouseWheelZoom: false,
            zoomFactor: 13
        },
        mapsArea: {
            background: '#4863A0'
        },
        centerPosition: {
            latitude: 25.54244147012483,
            longitude: -89.62646484375
        },
        layers: [
            {
                shapeData: worldMap,
                shapeSettings: {
                    fill: '#789071',
                },
                navigationLineSettings: peninsularLocationData,
                markerSettings: [
                    {
                        visible: true,
                        shape: 'Circle',
                        fill: 'white',
                        width: 10,
                        height: 10,
                        animationDuration: 0,
                        dataSource: peninsularMarkerData
                    },
                    {
                        visible: true,
                        template: '<div id="marker1" style="font-size: 12px;color:white; font-family:Segoe UI;">ALTAMIRA' +
                            '</div>',
                        dataSource: [
                            { latitude: 22.403410892712124, longitude: -97.8717041015625, }
                        ],
                        animationDuration: 0,
                        offset: {
                            x: -35,
                            y: 0
                        }
                    },
                    {
                        visible: true,
                        template: '<div id="marker2" style="font-size: 12px;color:white; font-family:Segoe UI;">HOUSTON' +
                            '</div>',
                        dataSource: [
                            { latitude: 29.756032197482973, longitude: -95.36270141601562 }
                        ],
                        animationDuration: 0,
                        offset: {
                            x: 0,
                            y: -15
                        }
                    },
                    {
                        visible: true,
                        template: '<div id="marker3" style="font-size: 12px;color:white; font-family:Segoe UI;">PANAMA CITY' +
                            '</div>',
                        dataSource: [
                            { latitude: 30.180747605060766, longitude: -85.81283569335938 }
                        ],
                        animationDuration: 0,
                        offset: {
                            x: 0,
                            y: -14
                        }
                    },
                    {
                        visible: true,
                        template: '<div id="marker4" style="font-size: 12px;color:white; font-family:Segoe UI;">TAMPA' +
                            '</div>',
                        dataSource: [
                            { latitude: 27.9337540167772, longitude: -82.49908447265625 }
                        ],
                        animationDuration: 0,
                        offset: {
                            x: 0,
                            y: -15
                        }
                    },
                    {
                        visible: true,
                        template: '<div id="marker5" style="font-size: 12px;color:white; font-family:Segoe UI;">PROGRESO' +
                            '</div>',
                        dataSource: [
                            { latitude: 21.282336521195344, longitude: -89.6649169921875 }
                        ],
                        animationDuration: 0,
                        offset: {
                            x: 0,
                            y: 15
                        }
                    }
                ]
            }
        ]
    });
    maps.appendTo('#container');
};