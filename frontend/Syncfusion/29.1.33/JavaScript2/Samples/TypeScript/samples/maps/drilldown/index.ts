import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start

// custom code end
/**
 * Maps drilldown sample
 */
import {
    Maps, shapeSelected, IShapeSelectedEventArgs, Highlight, MapsTooltip, Marker, ILoadEventArgs,
    MapsTheme
} from '@syncfusion/ej2-maps';
import { worldMap } from './map-data/world-map';
import { defaultData } from './map-data/default-datasource';
import { africa } from './map-data/africa';
import { europe } from './map-data/europe';
import { asia } from './map-data/asia';
import { northAmerica } from './map-data/north-america';
import { southAmerica } from './map-data/south-america';
import { oceania } from './map-data/oceania';
Maps.Inject(Highlight, MapsTooltip, Marker);
export interface ShapeData {
    continent?: string;
}
// custom code start
//tslint:disable:max-func-body-length
// custom code end

    // custom code start
    
    // custom code end
    let touchmove: boolean = false;
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i,  'Contrast').replace(/5.3/i, '5');
        },
        // custom code end
        loaded: (args: ILoadEventArgs) => {
            let mapsSVG: HTMLElement = document.getElementById('mapdrilldown_svg') as HTMLElement;
            if (mapsSVG) {
                mapsSVG.addEventListener('touchmove', (e: MouseEvent) => { touchmove = true; }, false);
            }
        },
        // code for shape selection 
        shapeSelected: (args: IShapeSelectedEventArgs): void => {
            let shape: string = (args.shapeData as ShapeData).continent;
            if (maps.baseLayerIndex === 0 && !touchmove) {
                if (shape === 'Africa') {
                    maps.baseLayerIndex = 1;
                    maps.refresh();
                } else if (shape === 'Europe') {
                    maps.baseLayerIndex = 2;
                    maps.refresh();
                } else if (shape === 'Asia') {
                    maps.baseLayerIndex = 3;
                    maps.refresh();
                } else if (shape === 'North America') {
                    maps.baseLayerIndex = 4;
                    maps.refresh();
                } else if (shape === 'South America') {
                    maps.baseLayerIndex = 5;
                    maps.refresh();
                } else if (shape === 'Australia') {
                    maps.baseLayerIndex = 6;
                    maps.refresh();
                }
                let button: HTMLElement = document.getElementById('button');
                button.style.display = 'block';
                document.getElementById('content').innerHTML = '';
                (<HTMLElement>document.getElementById('category')).style.visibility = 'visible';
                (<HTMLElement>document.getElementById('text')).innerHTML = shape;
                (<HTMLElement>document.getElementById('symbol')).style.visibility = 'visible';
            }
            touchmove = false;
        },
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                shapePropertyPath: 'continent',
                shapeDataPath: 'continent',
                dataSource: defaultData,
                shapeData: worldMap,
                shapeSettings: {
                    colorValuePath: 'drillColor'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'continent',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                },
                markerSettings: [
                    {
                        visible: true,
                        template: '<div id="marker1" class="markerTemplate">Asia' +
                            '</div>',
                        dataSource: [
                            { latitude: 50.32087157990324, longitude: 90.015625 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="marker2" class="markerTemplate">Australia' +
                            '</div>',
                        dataSource: [
                            { latitude: -28.88583769986199, longitude: 130.296875 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="marker3" class="markerTemplate">Africa' +
                            '</div>',
                        dataSource: [
                            { latitude: 10.97274101999902, longitude: 16.390625 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="marker4" class="markerTemplate">Europe' +
                            '</div>',
                        dataSource: [
                            { latitude: 47.95121990866204, longitude: 18.468749999999998 }
                        ],
                        animationDuration: 0,
                    },
                    {
                        visible: true,
                        template: '<div id="marker5" class="markerTemplate" style="width:50px">North America' +
                            '</div>',
                        dataSource: [
                            { latitude: 59.88893689676585, longitude: -109.3359375 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="marker6" class="markerTemplate" style="width:50px">South America' +
                            '</div>',
                        dataSource: [
                            { latitude: -6.64607562172573, longitude: -55.54687499999999 }
                        ],
                        animationDuration: 0
                    },
                ]
            },
            {
                shapeData: africa,
                shapeSettings: {
                    fill: '#80306A'
                },
                highlightSettings: {
                    enable: true,
                    fill: '#80306A'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                }
            },
            {
                shapeData: europe,
                shapeSettings: {
                    fill: '#622D6C'
                },
                highlightSettings: {
                    enable: true,
                    fill: '#622D6C'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                }
            },
            {
                shapeData: asia,
                shapeSettings: {
                    fill: '#462A6D'
                },
                highlightSettings: {
                    enable: true,
                    fill: '#462A6D'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                }
            },
            {
                shapeData: northAmerica,
                shapeSettings: {
                    fill: '#C13664'
                },
                highlightSettings: {
                    enable: true,
                    fill: '#C13664'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                }
            },
            {
                shapeData: southAmerica,
                shapeSettings: {
                    fill: '#9C3367'
                },
                highlightSettings: {
                    enable: true,
                    fill: '#9C3367'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                }
            },
            {
                shapeData: oceania,
                shapeSettings: {
                    fill: '#2A2870'
                },
                highlightSettings: {
                    enable: true,
                    fill: '#2A2870'
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                   }
                }
            }
        ]
    });
    maps.appendTo('#mapdrilldown');
    // code for onclick event
    document.getElementById('category').onclick = () => {
        maps.baseLayerIndex = 0;
        maps.refresh();
        let button: HTMLElement = document.getElementById('button');
        button.style.display = 'none';
        document.getElementById('content').innerHTML = 'Click on a shape to drill';
        (<HTMLElement>document.getElementById('category')).style.visibility = 'hidden';
        (<HTMLElement>document.getElementById('text')).innerHTML = '';
        (<HTMLElement>document.getElementById('symbol')).style.visibility = 'hidden';
    };

