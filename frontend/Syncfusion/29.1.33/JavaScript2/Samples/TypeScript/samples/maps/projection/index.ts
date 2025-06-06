import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
/**
 * Changing projection sample
 */
import { Maps, Zoom, Legend, ProjectionType, MapsTooltip, ILoadEventArgs, MapsTheme } from '@syncfusion/ej2-maps';
import { worldMap } from './map-data/world-map';
import { projectionData } from './map-data/projection-datasource';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Maps.Inject(Zoom, Legend, MapsTooltip);
// custom code start

// custom code end
/**
 * code for maps
 */

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
            text: 'Members of the UN Security Council',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            },
            subtitleSettings: {
                text: '- In 2017',
                alignment: 'Far',
                textStyle: {
                    fontFamily: 'Segoe UI'
                }
            }
        },
        legendSettings: {
            visible: true,
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                shapeData: worldMap,
                shapeDataPath: 'Country',
                shapePropertyPath: 'name',
                dataSource: projectionData,
                tooltipSettings: {
                    visible: true,
                    valuePath: 'Country',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                    }    
                },
                shapeSettings: {
                    fill: '#E5E5E5',
                    colorMapping: [
                        {
                            value: 'Permanent',
                            color: '#EDB46F'
                        },
                        {
                            color: '#F1931B',
                            value: 'Non-Permanent'
                        }
                    ],
                    colorValuePath: 'Membership'
                }
            }
        ]
    });
    maps.appendTo('#container');
    // code for property panel 
    let projection: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select projection type',
        width: '100%',
        change: () => {
            maps.projectionType = <ProjectionType>projection.value;
            maps.refresh();
        }
    });
    projection.appendTo('#projectiontype');
